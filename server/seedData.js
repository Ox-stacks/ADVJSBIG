const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Sample quiz data
const quizzes = [
  {
    title: 'JavaScript Basics',
    description: 'Test your knowledge of JavaScript fundamentals',
    category: 'Programming',
    difficulty: 'Easy',
    questions: [
      {
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['String', 'Number', 'Boolean', 'Float'],
        correctAnswer: 3
      },
      {
        question: 'Which operator is used for strict equality comparison?',
        options: ['==', '===', '=', '!='],
        correctAnswer: 1
      },
      {
        question: 'What will console.log(typeof []) output?',
        options: ['array', 'object', 'undefined', 'null'],
        correctAnswer: 1
      },
      {
        question: 'How do you declare a constant variable in JavaScript?',
        options: ['var', 'let', 'const', 'constant'],
        correctAnswer: 2
      },
      {
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      }
    ]
  },
  {
    title: 'Web Development Concepts',
    description: 'Test your knowledge of web development',
    category: 'Web Development',
    difficulty: 'Medium',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Machine Learning',
          'Hyper Transfer Markup Language',
          'Hybrid Text Manipulation Language'
        ],
        correctAnswer: 0
      },
      {
        question: 'Which of these is NOT a CSS positioning property?',
        options: ['static', 'relative', 'absolute', 'dynamic'],
        correctAnswer: 3
      },
      {
        question: 'What is the purpose of the alt attribute in an img tag?',
        options: [
          'To specify an alternative image',
          'To provide text description of the image',
          'To set the alignment of the image',
          'To link to another page when clicked'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which HTTP method is typically used to submit form data?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 1
      },
      {
        question: 'What is the purpose of a media query in CSS?',
        options: [
          'To query a database for media files',
          'To optimize images for the web',
          'To apply different styles for different devices/screen sizes',
          'To embed videos in a webpage'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    title: 'CSS Mastery',
    description: 'Advanced CSS techniques and concepts',
    category: 'Web Development',
    difficulty: 'Hard',
    questions: [
      {
        question: 'Which CSS property is used to create a flexbox layout?',
        options: ['display: flex', 'position: flex', 'float: flex', 'layout: flex'],
        correctAnswer: 0
      },
      // Add more questions...
    ]
  },
  {
    title: 'React Fundamentals',
    description: 'Essential concepts for React developers',
    category: 'Programming',
    difficulty: 'Medium',
    questions: [
      {
        question: 'What hook is used to manage state in functional components?',
        options: ['useStatus', 'useState', 'useEffect', 'useRef'],
        correctAnswer: 1
      },
      // Add more questions...
    ]
  },
  {
    title: 'MongoDB Basics',
    description: 'Learn the fundamentals of MongoDB',
    category: 'Database',
    difficulty: 'Medium',
    questions: [
      {
        question: 'What type of database is MongoDB?',
        options: ['Relational', 'NoSQL', 'Graph', 'SQL'],
        correctAnswer: 1
      },
      // Add more questions...
    ]
  }
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    
    // Insert sample quizzes
    await Quiz.insertMany(quizzes);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();