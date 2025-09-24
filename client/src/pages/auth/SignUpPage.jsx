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
      // Here you would normally make an API call to create a user
      console.log('Signing up with:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Placeholder for registration logic
      // For demo purposes, let's pretend any email with '@test.com' is already taken
      if (formData.email.includes('@test.com')) {
        throw new Error('Email is already registered');
      }
      
      // On success, redirect or update app state
      // Example: history.push('/signin')
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