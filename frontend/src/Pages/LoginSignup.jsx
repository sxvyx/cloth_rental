import React, { useState } from 'react';
import API_URL from '../config';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidForm = () => {
    const { email, password, username } = formData;

    if (!email || !password) {
      alert("Email and password are required");
      return false;
    }

    if (state === "Sign Up") {
      if (!username) {
        alert("Username is required for signup");
        return false;
      }
    }

    return true;
  };

  const login = async () => {
    console.log("Login function called with:", formData.email);
    try {
      let responseData;
      await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => responseData = data);

      console.log("Login response:", responseData);

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('user-role', responseData.role); // Save role
        if (responseData.role === 'admin') {
          window.location.replace('/admin');
        } else {
          window.location.replace('/');
        }
      } else {
        alert(responseData.errors);
      }
    } catch (err) {
      console.error("Frontend Login Error:", err);
      alert("Could not connect to server");
    }
  };

  const signup = async () => {
    let responseData;
    await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('user-role', 'user'); // New signups are always users
      window.location.replace('/');
    } else {
      alert(responseData.errors || "Signup failed. Try another email.");
    }
  };

  return (
    <section className="feature" style={{ padding: '100px 0', minHeight: '60vh' }}>
      <div className="feature__container" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="header-block__title" style={{ marginBottom: '30px', textTransform: 'uppercase' }}>{state}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="input"
              required
              minLength={3}
            />
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Your Email"
            className="input"
            required
          />

          <div style={{ position: 'relative' }}>
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              required
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '20px' }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button 
            className="button"
            style={{ width: '100%', marginTop: '10px' }}
            onClick={() => {
              if (isValidForm()) {
                state === "Login" ? login() : signup();
              }
            }}
          >
            Continue
          </button>
        </div>

        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          {state === "Sign Up" ? (
            <p>
              Already have an account?{' '}
              <span style={{ color: '#000', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setState("Login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create an account?{' '}
              <span style={{ color: '#000', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setState("Sign Up")}>Click here</span>
            </p>
          )}

          {state === "Login" && (
            <p style={{ marginTop: '10px' }}>
              <span style={{ color: '#000', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => window.location.href = "/reset-password"}>Forgot password?</span>
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
            <input type="checkbox" required />
            <p style={{ margin: 0 }}>By continuing, I agree to the terms of use and privacy policy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;
