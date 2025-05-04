import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../api/quiz';
import './Quiz.css';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await getQuiz(id);
        setQuiz(response.data);
        // Initialize answers array with nulls (no answer selected)
        setAnswers(new Array(response.data.questions.length).fill(null));
      } catch (err) {
        setError('Failed to load quiz. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitQuiz(id, answers);
      navigate(`/results/${id}`, { state: { result: response } });
    } catch (err) {
      setError('Failed to submit quiz. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quiz) return <div className="error">Quiz not found</div>;

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1>{quiz.title}</h1>
      <div className="quiz-progress">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </div>
      
      <div className="question-container">
        <h2>{currentQuestionData.question}</h2>
        
        <div className="options-list">
          {currentQuestionData.options.map((option, index) => (
            <div 
              key={index} 
              className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      
      <div className="quiz-navigation">
        <button 
          onClick={goToPreviousQuestion} 
          disabled={currentQuestion === 0}
          className="nav-button"
        >
          Previous
        </button>
        
        {currentQuestion < quiz.questions.length - 1 ? (
          <button 
            onClick={goToNextQuestion} 
            className="nav-button"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="submit-button"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;