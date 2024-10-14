import React, { useState } from 'react';
import InputBox from '../components/input.component'; // Ensure this is the correct path

export default function UserAuthForm({ type }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <>
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

          {/* Password input */}
          <InputBox
            label="Password"
            type="password"
            id="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm password field (only for sign-up) */}
          {type !== 'sign-in' && (
            <InputBox
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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
