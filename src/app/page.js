'use client';

import React, { useState, useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      window.location.href = '/dashboard'; // this is for testing purposes, 
      //should redirect after the username and the password are confirmed through the db
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-800">
      <div className="w-full max-w-md p-8 bg-opacity-30 backdrop-blur-md shadow-xl rounded-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-6 py-3 mt-2 text-lg rounded-md bg-white bg-opacity-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-6 py-3 mt-2 text-lg rounded-md bg-white bg-opacity-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
