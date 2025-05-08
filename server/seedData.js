const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for database operations'))
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
      {
        question: 'Which CSS property controls the spacing between lines of text?',
        options: ['line-height', 'text-spacing', 'letter-spacing', 'paragraph-spacing'],
        correctAnswer: 0
      },
      {
        question: 'What does "CSS" stand for?',
        options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Content Styling Syntax'],
        correctAnswer: 0
      },
      {
        question: 'Which CSS property is used to add shadow to text?',
        options: ['text-shadow', 'font-shadow', 'text-effect', 'font-effect'],
        correctAnswer: 0
      },
      {
        question: 'Which CSS property changes the background color of an element?',
        options: ['background-color', 'color', 'bgcolor', 'background'],
        correctAnswer: 0
      }
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
      {
        question: 'What is JSX in React?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JSON XML'],
        correctAnswer: 0
      },
      {
        question: 'Which hook is used for side effects in React?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 0
      },
      {
        question: 'What is the correct way to render a list in React?',
        options: ['Using map() function', 'Using for loop', 'Using while loop', 'Using forEach()'],
        correctAnswer: 0
      },
      {
        question: 'What is a "key" prop used for in React lists?',
        options: ['To identify elements in a list uniquely', 'To apply styles', 'To encrypt data', 'To sort the list'],
        correctAnswer: 0
      }
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
      {
        question: 'What is a document in MongoDB?',
        options: ['A record in a collection', 'A table in a database', 'A binary file', 'A connection to the database'],
        correctAnswer: 0
      },
      {
        question: 'Which of the following is NOT a valid MongoDB data type?',
        options: ['Table', 'String', 'Number', 'Boolean'],
        correctAnswer: 0
      },
      {
        question: 'What is the MongoDB equivalent of a table in relational databases?',
        options: ['Collection', 'Document', 'Field', 'Index'],
        correctAnswer: 0
      },
      {
        question: 'Which method is used to insert a document in MongoDB?',
        options: ['insertOne()', 'add()', 'insert()', 'create()'],
        correctAnswer: 0
      }
    ]
  }
];

// Additional questions to add to quizzes with less than minimum questions
const additionalQuestions = {
  // Generic questions that can be used for any quiz
  generic: [
    {
      question: 'What is the primary purpose of this technology?',
      options: ['Data storage', 'User interface', 'Server-side processing', 'Network communication'],
      correctAnswer: Math.floor(Math.random() * 4)
    },
    {
      question: 'When was this technology first introduced?',
      options: ['1990s', '2000s', '2010s', '2020s'],
      correctAnswer: Math.floor(Math.random() * 4)
    },
    {
      question: 'Which company is most associated with this technology?',
      options: ['Google', 'Microsoft', 'Facebook', 'Apple'],
      correctAnswer: Math.floor(Math.random() * 4)
    },
    {
      question: 'What is a key feature of this technology?',
      options: ['Speed', 'Security', 'Ease of use', 'Flexibility'],
      correctAnswer: Math.floor(Math.random() * 4)
    }
  ]
};

// Function to ensure all quizzes have a minimum number of questions
const ensureMinimumQuestions = async (minQuestions = 2) => {
  try {
    // Find quizzes with less than minimum questions
    const quizzesToUpdate = await Quiz.find({ $where: `this.questions.length < ${minQuestions}` });
    
    if (quizzesToUpdate.length === 0) {
      console.log(`No quizzes with less than ${minQuestions} questions found.`);
      return;
    }
    
    console.log(`Found ${quizzesToUpdate.length} quizzes to update.`);
    
    for (const quiz of quizzesToUpdate) {
      console.log(`Updating quiz: ${quiz.title}`);
      
      // Add generic questions as needed to reach minimum
      const questionsNeeded = minQuestions - quiz.questions.length;
      
      if (questionsNeeded > 0) {
        // Use a slice of generic questions
        const genericQuestionsToAdd = additionalQuestions.generic.slice(0, questionsNeeded);
        quiz.questions.push(...genericQuestionsToAdd);
        await quiz.save();
        console.log(`Added ${genericQuestionsToAdd.length} questions to ${quiz.title}`);
      }
    }
    
    console.log('All quizzes updated to have minimum questions!');
  } catch (error) {
    console.error('Error updating quizzes:', error);
  }
};

// Seed the database with initial data
const seedDatabase = async () => {
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    
    // Insert sample quizzes
    await Quiz.insertMany(quizzes);
    
    console.log('Database seeded successfully!');
    
    // Ensure all quizzes have minimum required questions
    await ensureMinimumQuestions(2);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Check command line arguments to determine what operation to perform
const args = process.argv.slice(2);

if (args.includes('--update-only')) {
  // Just update quizzes with minimum questions
  ensureMinimumQuestions(2)
    .then(() => {
      console.log('Update operation completed.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Update operation failed:', err);
      process.exit(1);
    });
} else {
  // Perform full seed operation
  seedDatabase();
}