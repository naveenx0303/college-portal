// models/Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  description: String,
  assessment_type: {
    type: String,
    enum: ['objective', 'subjective', 'mixed'],
    required: true
  },
  total_marks: {
    type: Number,
    required: true
  },
  duration_minutes: {
    type: Number,
    required: true
  },
  start_time: Date,
  end_time: Date,
  instructions: String,
  is_published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
