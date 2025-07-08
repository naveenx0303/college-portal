// 3. routes/announcements.js
const express = require('express');
const Announcement = require('../models/Announcement');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['teacher']), async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:courseId', authMiddleware, async (req, res) => {
  const announcements = await Announcement.find({ course_id: req.params.courseId });
  res.json({ success: true, data: announcements });
});

module.exports = router;
