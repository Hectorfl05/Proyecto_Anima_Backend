import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import SignInForm from '../../components/auth/SignInForm';
import './AuthPage.css';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      // Call backend signin endpoint
      const res = await fetch('/api/auth/signin', {
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
      alert('Sign in successful!');
      
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