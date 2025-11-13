const express = require('express');
const Question = require('../models/Question');
const Survey = require('../models/Survey');

const router = express.Router();

// Get random 5 questions
router.get('/questions/random', async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 5 } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all questions (for admin purposes)
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit survey answers
router.post('/submit', async (req, res) => {
  try {
    const { questions, answers } = req.body;

    let score = 0;
    const surveyQuestions = questions.map((q, index) => {
      const isCorrect = answers[index] === q.correctAnswer;
      if (isCorrect) score++;

      return {
        questionId: q._id,
        question: q.question,
        options: q.options,
        userAnswer: answers[index],
        correctAnswer: q.correctAnswer,
      };
    });

    const survey = new Survey({
      questions: surveyQuestions,
      score,
      totalQuestions: questions.length,
    });

    const savedSurvey = await survey.save();
    res.status(201).json({
      message: 'Survey submitted successfully',
      surveyId: savedSurvey._id,
      score,
      totalQuestions: questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get survey results by ID
router.get('/result/:id', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id).populate('questions.questionId');
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new question (for admin purposes)
router.post('/questions', async (req, res) => {
  try {
    const { question, options, correctAnswer, category } = req.body;

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      category,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
