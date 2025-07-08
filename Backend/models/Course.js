// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_code: {
    type: String,
    required: true,
    unique: true
  },
  course_name: {
    type: String,
    required: true
  },
  description: String,
  credits: Number,
  semester: String,
  department: String,
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Course', courseSchema);
