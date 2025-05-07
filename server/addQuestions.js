const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for updating quizzes'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Additional questions for each category
const additionalQuestions = {
  'CSS Mastery': [
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
  ],
  'React Fundamentals': [
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
  ],
  'MongoDB Basics': [
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
};

// Update quizzes with less than 2 questions
const updateQuizzes = async () => {
  try {
    // Find quizzes with less than 2 questions
    const quizzesToUpdate = await Quiz.find({ 'questions.1': { $exists: false } });
    
    if (quizzesToUpdate.length === 0) {
      console.log('No quizzes with less than 2 questions found.');
      process.exit(0);
    }
    
    console.log(`Found ${quizzesToUpdate.length} quizzes to update.`);
    
    for (const quiz of quizzesToUpdate) {
      console.log(`Updating quiz: ${quiz.title}`);
      
      // Get the additional questions for this quiz category or use generic ones
      const additionalQuestionsForQuiz = additionalQuestions[quiz.title] || [];
      
      if (additionalQuestionsForQuiz.length > 0) {
        quiz.questions.push(...additionalQuestionsForQuiz);
        await quiz.save();
        console.log(`Added ${additionalQuestionsForQuiz.length} questions to ${quiz.title}`);
      } else {
        console.log(`No additional questions found for ${quiz.title}, adding generic questions.`);
        
        // Add generic questions
        const genericQuestions = [
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
        ];
        
        quiz.questions.push(...genericQuestions);
        await quiz.save();
        console.log(`Added 4 generic questions to ${quiz.title}`);
      }
    }
    
    console.log('All quizzes updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating quizzes:', error);
    process.exit(1);
  }
};

updateQuizzes();