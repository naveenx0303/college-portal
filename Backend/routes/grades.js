// 2. routes/grades.js
const express = require('express');
const Grade = require('../models/Grade');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.status(201).json({ success: true, data: grade });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:studentId/:courseId', authMiddleware, async (req, res) => {
  const grade = await Grade.findOne({
    student_id: req.params.studentId,
    course_id: req.params.courseId
  });
  res.json({ success: true, data: grade });
});

module.exports = router;
