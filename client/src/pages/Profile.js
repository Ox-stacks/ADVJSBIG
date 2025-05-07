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
        setResults(response.data);
      } catch (err) {
        setError('Failed to load your quiz history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserResults();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'high-score';
    if (score >= 60) return 'medium-score';
    return 'low-score';
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <div className="results-section">
        <h2>Your Quiz History</h2>
        {results.length === 0 ? (
          <p>You haven't taken any quizzes yet.</p>
        ) : (
          <div className="results-list">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.quizId.title}</td>
                    <td className={getScoreClass(result.score)}>{result.score}%</td>
                    <td>{formatDate(result.dateTaken)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;