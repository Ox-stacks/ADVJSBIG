import React, { useState, useEffect } from 'react';
import { getUserResults } from '../api/quiz';
import './Profile.css';

const Profile = ({ user }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        setLoading(true);
        const response = await getUserResults();
        setResults(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch quiz results');
        setLoading(false);
      }
    };

    fetchUserResults();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'high-score';
    if (score >= 60) return 'medium-score';
    return 'low-score';
  };

  if (loading) {
    return <div className="loading">Loading your profile data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <div className="user-info">
          <p><strong>Username:</strong> {user?.username || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Quizzes Taken:</strong> {results.length}</p>
        </div>
      </div>

      <div className="results-section">
        <h2>Your Quiz Results</h2>
        {results.length === 0 ? (
          <p>You haven't taken any quizzes yet.</p>
        ) : (
          <table className="results-table">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Score</th>
                <th>Date Taken</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.quiz?.title || 'Deleted Quiz'}</td>
                  <td className={getScoreClass(result.score)}>
                    {result.score}%
                  </td>
                  <td>{formatDate(result.dateTaken)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;