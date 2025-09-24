import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import SignInForm from '../../components/auth/SignInForm';
import './AuthPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Call backend signin endpoint (send raw password; ensure transport is HTTPS in prod)
      let base = process.env.REACT_APP_API_URL || '';
      try {
        if (!base && typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.includes('localhost')) {
          base = 'http://127.0.0.1:8000';
        }
      } catch (e) {
        // ignore
      }
      const url = base + '/api/auth/signin';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Invalid email or password');
      }

  const data = await res.json();
  // store token (in memory/localStorage) — simple demo
  localStorage.setItem('access_token', data.access_token);
  // redirect to original page (if any) or protected homepage
  const returnTo = (location && location.state && location.state.from && location.state.from.pathname) ? location.state.from.pathname : '/home';
  navigate(returnTo);
      
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container">
          <SignInForm 
            onSubmit={handleSignIn} 
            isLoading={loading}
            formError={error}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;