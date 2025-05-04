const express = require('express');
const router = express.Router();
const { 
  getQuizzes, 
  getQuiz, 
  submitQuiz, 
  getUserResults 
} = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/submit', protect, submitQuiz);
router.get('/user/results', protect, getUserResults);

module.exports = router;