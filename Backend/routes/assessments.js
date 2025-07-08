// 6. routes/assessments.js
const express = require('express');
const Assessment = require('../models/Assessment');
const AssessmentQuestion = require('../models/AssessmentQuestion');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

// Create a new assessment
router.post('/', authMiddleware, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const assessment = new Assessment({
      ...req.body,
      teacher_id: req.user._id,
    });
    await assessment.save();
    res.status(201).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add a question to assessment
router.post('/:assessmentId/questions', authMiddleware, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const { question_text, question_type, options, correct_answer, marks, order_number } = req.body;
    const question = new AssessmentQuestion({
      assessment_id: req.params.assessmentId,
      question_text,
      question_type,
      options,
      correct_answer,
      marks,
      order_number,
    });
    await question.save();
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all assessments for a course
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const assessments = await Assessment.find({ course_id: req.params.courseId });
    res.json({ success: true, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all questions of an assessment
router.get('/:assessmentId/questions', authMiddleware, async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find({ assessment_id: req.params.assessmentId });
    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
