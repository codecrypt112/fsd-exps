const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [{
      type: String,
      required: true,
    }],
    userAnswer: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  }],
  score: {
    type: Number,
    default: 0,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Survey', surveySchema);
