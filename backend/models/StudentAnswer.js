// models/StudentAnswer.js
const mongoose = require('mongoose');

const studentAnswerSchema = new mongoose.Schema({
  submission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentAssessment',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssessmentQuestion',
    required: true
  },
  student_answer: {
    type: String,
    required: true
  },
  marks_obtained: {
    type: Number,
    default: 0
  },
  is_correct: {
    type: Boolean,
    default: false
  },
  graded_at: Date
});

studentAnswerSchema.index({ submission_id: 1, question_id: 1 }, { unique: true });

module.exports = mongoose.model('StudentAnswer', studentAnswerSchema);
