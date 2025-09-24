import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import SignUpForm from '../../components/auth/SignUpForm';
import './AuthPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Prepare payload without confirmPassword (defensive)
      const payload = { ...formData };
      if ('confirmPassword' in payload) delete payload.confirmPassword;

      // Call backend signup endpoint (send raw password; ensure HTTPS in prod)
      let base = process.env.REACT_APP_API_URL || '';
      // If no env var and we're running on localhost, default to 127.0.0.1:8000
      try {
        if (!base && typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.includes('localhost')) {
          base = 'http://127.0.0.1:8000';
        }
      } catch (e) {
        // ignore
      }
      const url = base + '/api/auth/signup';
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Registration failed');
      }

  // success — redirect to original page (if present) or to protected homepage
  const returnTo = (location && location.state && location.state.from && location.state.from.pathname) ? location.state.from.pathname : '/home';
  navigate(returnTo);
      
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container">
          <SignUpForm 
            onSubmit={handleSignUp} 
            isLoading={loading}
            formError={error}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;