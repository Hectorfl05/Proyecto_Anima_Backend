import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import SignUpForm from '../../components/auth/SignUpForm';
import './AuthPage.css';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Registration failed');
      }

      // success
      alert('Account created successfully! Please sign in.');
      
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