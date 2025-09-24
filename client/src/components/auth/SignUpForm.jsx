import React, { useState } from 'react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import PasswordRequirements from '../ui/PasswordRequirements';
import AuthForm from './AuthForm';
import usePasswordValidation from '../../hooks/usePasswordValidation';
import './SignUpForm.css';

/**
 * Sign Up form component
 * 
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Form submission handler
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {string} [props.formError] - Form-level error message
 */
const SignUpForm = ({ 
  onSubmit, 
  isLoading = false,
  formError,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [triedSubmit, setTriedSubmit] = useState(false);
  
  // Use password validation hook
  const { validations, isValid: passwordValid } = usePasswordValidation({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });
  
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
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValid) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    setTriedSubmit(true);
    
    if (validateForm()) {
      const { name, email, password } = formData;
      const payload = { name, email, password };
      onSubmit(payload);
    }
  };
  
  return (
    <AuthForm
      title="Create an Account"
      subtitle="Sign up to get started"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      formError={formError}
      submitDisabled={
        !formData.name.trim() || !formData.email || !formData.password || !formData.confirmPassword
      }
      submitLabel="Sign Up"
      alternateText="Already have an account?"
      alternateLinkTo="/signin"
      alternateLinkText="Sign In"
      className="signup-form"
    >
      <Input
        id="name"
        name="name"
        label="Username"
        value={formData.name}
        onChange={handleChange}
        error={triedSubmit ? errors.name : ''}
        required
      />
      
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
      
      <div className="password-fields-container">
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={triedSubmit ? errors.password : ''}
          required
          showingRequirements={formData.password || triedSubmit}
        />
        
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={triedSubmit ? errors.confirmPassword : ''}
          required
        />
        
        {/* Only show requirements after user starts typing or tries submitting */}
        {(formData.password || triedSubmit) && (
          <PasswordRequirements 
            validations={validations} 
            visible={true}
          />
        )}
      </div>
    </AuthForm>
  );
};

export default SignUpForm;