import React, { useState } from 'react';
import './CSS/ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Track error message

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) && // at least one uppercase
      /[a-z]/.test(password) && // at least one lowercase
      /\d/.test(password) &&    // at least one number
      /[@$!%*?&]/.test(password) && // at least one special character
      password.length >= 6
    );
  };

  const handleReset = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(newPassword)) {
      alert("Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long.");
      return;
    }

    console.log("Email:", email);
    console.log("New Password:", newPassword);

    try {
      const response = await fetch('http://localhost:4000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password reset successful!");
        window.location.replace("/login");
      } else {
        alert(data.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Error in reset request:", error); // Log any errors
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='reset-password'>
      <div className='reset-password-container'>
        <h2>Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type='email'
          placeholder='Enter your registered email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='password-input-wrapper'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button onClick={handleReset}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
