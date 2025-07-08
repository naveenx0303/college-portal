// models/StudentAssessment.js
const mongoose = require('mongoose');

const studentAssessmentSchema = new mongoose.Schema({
  assessment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  start_time: Date,
  end_time: Date,
  submission_time: Date,
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'submitted', 'graded'],
    default: 'not_started'
  },
  total_marks_obtained: {
    type: Number,
    default: 0
  },
  auto_graded: {
    type: Boolean,
    default: false
  },
  teacher_feedback: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

studentAssessmentSchema.index({ assessment_id: 1, student_id: 1 }, { unique: true });

module.exports = mongoose.model('StudentAssessment', studentAssessmentSchema);
