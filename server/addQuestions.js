const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// New questions to add
const newQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'J.K. Rowling', 'Ernest Hemingway'],
    correctAnswer: 0
  }
];

// Add questions to quizzes with only one question
const addQuestionsToQuizzes = async () => {
  try {
    const quizzes = await Quiz.find({ 'questions.1': { $exists: false } }); // Find quizzes with only one question
    for (const quiz of quizzes) {
      quiz.questions.push(...newQuestions); // Add new questions
      await quiz.save();
      console.log(`Added questions to quiz: ${quiz.title}`);
    }
    console.log('Questions added successfully!');
  } catch (error) {
    console.error('Error adding questions:', error);
  } finally {
    mongoose.connection.close();
  }
};

addQuestionsToQuizzes();