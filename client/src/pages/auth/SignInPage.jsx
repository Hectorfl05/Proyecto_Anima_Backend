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
      // Here you would normally make an API call to authenticate
      console.log('Signing in with:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Placeholder for authentication logic
      // For demo purposes, let's pretend any email with password 'password123' is valid
      if (formData.password !== 'password123') {
        throw new Error('Invalid email or password');
      }
      
      // On success, redirect or update app state
      // Example: history.push('/dashboard')
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