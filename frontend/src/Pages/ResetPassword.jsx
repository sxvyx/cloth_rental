import React, { useState } from 'react';
import API_URL from '../config';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const response = await fetch(`${API_URL}/reset-password`, {
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
      console.error("Error in reset request:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="feature" style={{ padding: '100px 0', minHeight: '60vh' }}>
      <div className="feature__container" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="header-block__title" style={{ marginBottom: '30px', textTransform: 'uppercase' }}>Reset Password</h2>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px' }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          <button 
            className="button"
            style={{ width: '100%', marginTop: '10px' }}
            onClick={handleReset}
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
