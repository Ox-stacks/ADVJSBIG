# ADVJSBIG

This is the Quiz app!
It is an interactive quiz game application with 5 different full stack questions games to choose from.
fully equipped with a register, profile, home screen, and it stores the user results in the MongoDB database.

## Get the Program
1. switch to master branch
2. click the green "Code" button for the drop down menu and click "Open with GitHub Desktop"
3. When redirected to the GitHub Desktop click "Clone"
4. make sure youre in the mastery branch on the GitHub Desktop
5. Once cloned go to the top left where it says "current repository" and right click it and choose "Open in Visual Studio Code"

## Setup MongoDB
Once you have the files establish the MongoDB connection:
1. Open mongoDB compass and click + icon labeled "add new connection"
2. Input this MONGODB_URI=  mongodb://localhost:27017/quizApp
3. It will connect to the "Quiz App" on the local server you should see it in the drop down folder.

  ## Installation
Now in to visual studio code and open a new terminal.
Inside the terminal input these command lines:
1. npm install
2. cd client
3. npm install
4. then you can close that terminal or hit cd..
5. then run these two commands:
6. npm run seed
7. npm run dev

## Interacting with MongoDB database
To interact more with MongoDB database:
The seed file should automatically insert 2 folders into the mongoDB database named "users' and "quizzes" after you fully interact with the app.
Hit refresh on MongoDB.
In the event the folders are not automatically added you can help MongoDB out:
In the QuizApp folder on mongoDB compass click the + icon to "create a collection" type in lowercase "quizzes".
Do this a second time and type in "users" in lowercase. 
This should automatically update the MongoDB database.

## Backend
- A Node.js/Express server that handles API requests
- MongoDB database for data storage using Mongoose ODM
- JWT authentication with cookie-based sessions
- RESTful API endpoints for users, quizzes, and results
- Middleware for route protection and error handling

## Frontend
- React application with React Router for navigation
- Axios for API requests with cookie support
- Responsive UI components for quizzes, results, and user profiles
- Authentication flow with login/register functionality


## Extras
- run server only: npm run server
- run client only: npm run client

## Important file locations for easy look up
The backend is built with Express.js and provides RESTful API endpoints:
- `server.js`: Main server entry point
- `config/`: Configuration files including database connection
- `controllers/`: 
  - `authController.js`: Handles user authentication 
  - `quizController.js`: Manages quiz operations
- `middleware/`: 
  - `authMiddleware.js`: Protects routes requiring authentication
- `models/`: 
  - `User.js`: User schema with password hashing
  - `Quiz.js`: Quiz schema with questions and answers
- `routes/`: 
  - `authRoutes.js`: User authentication endpoints
  - `quizRoutes.js`: Quiz management endpoints
- `seedData.js`: Database seeding script for initial quiz data

The React frontend is organized as follows:

- `src/api/`: API service modules for backend communication
- `src/components/`: Reusable UI components
- `src/pages/`: Main application views/screens
- `src/App.js`: Main component with routing configuration

## API endpoints
### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/logout`: Logout user
- `GET /api/auth/me`: Get current user
### Quizzes
- `GET /api/quizzes`: Get all quizzes
- `GET /api/quizzes/:id`: Get specific quiz
- `POST /api/quizzes/submit`: Submit quiz answers
- `GET /api/quizzes/user/results`: Get user quiz results

Enjoy the QuizApp!


