import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quiz App</h3>
          <p>Test your knowledge with our interactive quizzes on various topics.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quizzes">All Quizzes</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li><a href="mailto:support@quizapp.com">support@quizapp.com</a></li>
            <li><a href="https://github.com/yourusername/quiz-app" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Quiz App. All rights reserved.</p>
        <p>
          <Link to="/privacy">Privacy Policy</Link> | 
          <Link to="/terms">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;