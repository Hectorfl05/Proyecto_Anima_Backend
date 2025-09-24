import React, { useState } from 'react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import AuthForm from './AuthForm';
import './SignInForm.css';

/**
 * Sign In form component
 * 
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Form submission handler
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {string} [props.formError] - Form-level error message
 */
const SignInForm = ({ 
  onSubmit, 
  isLoading = false,
  formError,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    setTriedSubmit(true);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <AuthForm
      title="Sign In"
      subtitle="Welcome back! Please sign in to your account"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      formError={formError}
      submitLabel="Sign In"
      alternateText="Don't have an account?"
      alternateLinkTo="/signup"
      alternateLinkText="Sign Up"
      className="signin-form"
    >
      <Input
        id="email"
        type="email"
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={triedSubmit ? errors.email : ''}
        required
      />
      
      <PasswordInput
        id="password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        error={triedSubmit ? errors.password : ''}
        required
      />
    </AuthForm>
  );
};

export default SignInForm;