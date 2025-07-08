// 1. routes/notes.js
// Handles upload, listing and deletion of notes

const express = require('express');
const multer = require('multer');
const Note = require('../models/Note');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/notes',
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});
const upload = multer({ storage });

router.post('/', authMiddleware, roleMiddleware(['teacher']), upload.single('file'), async (req, res) => {
  try {
    const { course_id, title, description, file_type } = req.body;
    const note = new Note({
      course_id,
      teacher_id: req.user._id,
      title,
      description,
      file_name: req.file.filename,
      file_path: req.file.path,
      file_type,
      file_size: req.file.size
    });
    await note.save();
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:courseId', authMiddleware, async (req, res) => {
  const notes = await Note.find({ course_id: req.params.courseId });
  res.json({ success: true, data: notes });
});

module.exports = router;