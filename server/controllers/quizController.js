const Quiz = require('../models/Quiz');
const User = require('../models/User');

// Get all quizzes
exports.getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().select('title description questions'); // Include 'questions'
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quizzes' });
  }
};

// Get single quiz
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// Submit quiz answer and save result
exports.submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers } = req.body;
    
    // Find the quiz
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Calculate score
    let score = 0;
    answers.forEach((answer, index) => {
      if (quiz.questions[index] && answer === quiz.questions[index].correctAnswer) {
        score++;
      }
    });
    
    // Calculate percentage
    const percentage = (score / quiz.questions.length) * 100;
    
    // Save result to user
    const user = await User.findById(req.user.id);
    
    user.quizResults.push({
      quizId,
      score: percentage
    });
    
    await user.save();
    
    res.status(200).json({
      success: true,
      score,
      totalQuestions: quiz.questions.length,
      percentage
    });
  } catch (error) {
    next(error);
  }
};

// Get user quiz results
exports.getUserResults = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'quizResults.quizId',
        select: 'title'
      });
    
    res.status(200).json({
      success: true,
      data: user.quizResults
    });
  } catch (error) {
    next(error);
  }
};

// Create a new quiz
exports.createQuiz = async (req, res, next) => {
  try {
    const { title, description, category, difficulty, questions } = req.body;
    
    // Create new quiz with current user as creator
    const quiz = await Quiz.create({
      title,
      description,
      category,
      difficulty,
      questions,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// Update a quiz
exports.updateQuiz = async (req, res, next) => {
  try {
    let quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Update quiz
    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    await quiz.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};