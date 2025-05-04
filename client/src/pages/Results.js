import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getQuiz } from '../api/quiz';
import './Results.css';

const Results = () => {
  const { quizId } = useParams();
  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get result from location state or fetch it
  const result = location.state?.result;

  useEffect(() => {
    // If we don't have the result from navigation state, redirect to home
    if (!result) {
      setError('No result found. Please take the quiz first.');
      return;
    }

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await getQuiz(quizId);
        setQuiz(response.data);
      } catch (err) {
        setError('Failed to load quiz details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, result]);

  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quiz || !result) return <div className="error">Quiz or results not found</div>;

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <div className="quiz-title">{quiz.title}</div>
      
      <div className="score-card">
        <div className="score-header">Your Score</div>
        <div className="score-value">{result.score} / {result.totalQuestions}</div>
        <div className="score-percentage">{result.percentage}%</div>
        
        <div className="score-message">
          {result.percentage >= 80 ? (
            <span className="excellent">Excellent! Great job!</span>
          ) : result.percentage >= 60 ? (
            <span className="good">Good work!</span>
          ) : result.percentage >= 40 ? (
            <span className="average">Nice try!</span>
          ) : (
            <span className="needs-practice">Keep practicing!</span>
          )}
        </div>
      </div>
      
      <div className="results-actions">
        <Link to={`/quiz/${quizId}`} className="try-again-button">
          Try Again
        </Link>
        <Link to="/" className="home-button">
          Back to All Quizzes
        </Link>
      </div>
    </div>
  );
};

export default Results;