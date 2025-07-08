// models/AssessmentQuestion.js
const mongoose = require('mongoose');

const assessmentQuestionSchema = new mongoose.Schema({
  assessment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    enum: ['mcq', 'short_answer', 'essay'],
    required: true
  },
  options: [String], // For MCQ questions
  correct_answer: String,
  marks: {
    type: Number,
    required: true
  },
  order_number: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
