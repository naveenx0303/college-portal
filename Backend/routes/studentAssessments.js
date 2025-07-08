// 4. routes/studentAssessments.js (exam submission & auto-grading)
const express = require('express');
const StudentAssessment = require('../models/StudentAssessment');
const StudentAnswer = require('../models/StudentAnswer');
const AssessmentQuestion = require('../models/AssessmentQuestion');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/submit/:assessmentId', authMiddleware, roleMiddleware(['student']), async (req, res) => {
  try {
    const { answers } = req.body; // [{ question_id, student_answer }]
    const assessmentId = req.params.assessmentId;
    const studentId = req.user._id;

    let totalMarks = 0;

    for (const ans of answers) {
      const question = await AssessmentQuestion.findById(ans.question_id);
      const isCorrect = question.question_type === 'mcq' && question.correct_answer === ans.student_answer;
      const marksObtained = isCorrect ? question.marks : 0;
      totalMarks += marksObtained;

      await StudentAnswer.create({
        submission_id: null, // will update below
        question_id: question._id,
        student_answer: ans.student_answer,
        marks_obtained: marksObtained,
        is_correct: isCorrect
      });
    }

    const studentAssessment = new StudentAssessment({
      assessment_id: assessmentId,
      student_id: studentId,
      status: 'submitted',
      submission_time: new Date(),
      total_marks_obtained: totalMarks,
      auto_graded: true
    });

    await studentAssessment.save();

    // Update submission_id in StudentAnswer
    await StudentAnswer.updateMany({
      submission_id: null,
      question_id: { $in: answers.map(a => a.question_id) }
    }, {
      $set: { submission_id: studentAssessment._id }
    });

    res.status(200).json({ success: true, message: 'Assessment submitted and auto-graded', data: studentAssessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
