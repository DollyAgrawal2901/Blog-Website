import React, { useState, useRef } from 'react';
import InputBox from '../components/input.component'; // Ensure this is the correct path
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection

export default function UserAuthForm({ type }) {
  const authForm = useRef();
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  // State for form inputs, error messages, and password visibility
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  // Regex patterns for validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (type === 'sign-up' && fullName.length < 3) {
      toast.error("Full name must be at least 3 letters long");
      return false;
    }
    if (!email.length) {
      toast.error('Email is required.');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error('Password must be 6 to 20 characters long and contain at least one numeric digit, one uppercase, and one lowercase letter.');
      return false;
    }
    if (type === 'sign-in' && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate form before making a request
      if (!validateForm()) {
        return;
      }
  
      const url = type === 'sign-in' ? 'http://localhost:3000/signin' : 'http://localhost:3000/signup';
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(type === 'sign-in' ? 'Signed in successfully!' : 'Signed up successfully!');
  
            // Redirect after successful sign-up or sign-in
            if (type === 'sign-up') {
              navigate('/signin'); // Redirect to sign-in page after successful sign-up
            } else {
              navigate('/dashboard'); // Redirect to dashboard after successful sign-in
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again.');
        });
    };

  return (
    <>
      <ToastContainer />
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-purple-200">
        <form className="mt-8 bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg border-t-4 border-purple-500" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-700">
            {type === 'sign-in' ? 'Welcome Back' : 'Create an Account'}
          </h1>

          {/* Full Name input (only for sign-up) */}
          {type !== 'sign-in' && (
            <InputBox
              label="Full Name"
              type="text"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          )}

          {/* Email input */}
          <InputBox
            label="Email"
            type="email"
            id="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password input for both sign-in and sign-up */}
        <div className="relative">
          <InputBox
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

          {/* Confirm password field only for sign-up */}
        {type !== 'sign-in' && (
          <div className="relative">
            <InputBox
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Toggle link between sign-in and sign-up */}
          <div className="mt-4 text-center">
            {type === 'sign-in' ? (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-purple-500 hover:underline">
                  Sign up
                </a>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/signin" className="text-purple-500 hover:underline">
                  Log in
                </a>
              </p>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
