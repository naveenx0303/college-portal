// models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grade_type: {
    type: String,
    enum: ['internal', 'external'],
    required: true
  },
  marks_obtained: {
    type: Number,
    required: true
  },
  total_marks: {
    type: Number,
    required: true
  },
  grade_letter: String,
  comments: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Grade', gradeSchema);
