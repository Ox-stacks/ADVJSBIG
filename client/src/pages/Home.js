import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../api/quiz';
import CategoryFilter from '../components/UI/CategoryFilter';
import './Home.css';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await getQuizzes();
        setQuizzes(data.data);
        
        // Extract unique categories (if you add category field to your quizzes)
        // const uniqueCategories = [...new Set(data.data.map(quiz => quiz.category))];
        // setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to fetch quizzes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <div className="loading">Loading quizzes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home-page">
      <h1>Available Quizzes</h1>
      
      {categories.length > 0 && (
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}

      {quizzes.length === 0 ? (
        <p>No quizzes available at the moment.</p>
      ) : (
        <div className="quiz-catalog">
          {quizzes
            .filter(quiz => activeCategory === 'all' || quiz.category === activeCategory)
            .map((quiz) => (
              <div className="quiz-card" key={quiz._id}>
                <div className="quiz-card-content">
                  <h2 className="quiz-title">{quiz.title}</h2>
                  <p className="quiz-description">{quiz.description || 'No description available'}</p>
                  <div className="quiz-meta">
                    <span className="question-count">{quiz.questions?.length || 0} Questions</span>
                  </div>
                </div>
                <Link to={`/quiz/${quiz._id}`} className="take-quiz-button">
                  Take Quiz
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;