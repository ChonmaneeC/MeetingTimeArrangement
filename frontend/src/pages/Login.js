import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import {api} from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };

    try {
      const response = await api.post('/api/login',
        loginData
      );

      const contentType = response.headers.get('content-type');
      if (response.status !== 200) {
        if (contentType && contentType.includes('application/json')) {
          const errorResult = await response.data;
          alert('❌ Login failed: ' + (errorResult.error || 'Unknown error'));
        } else {
          const text = await response.text();
          alert('❌ Login failed (non-JSON): ' + text);
        }
        return;
      }

      const result = await response.data;
      if (!result.user) {
        alert('❌ Login response invalid.');
        return;
      }

      localStorage.setItem('user', JSON.stringify(result.user));
      alert('✅ Login successful!');
      navigate('/calendar');
    } catch (err) {
      alert('❌ Network error: ' + err.message);
    }
  };

  return (
    <div className="contact-container">

      <header className="home-header">
        <div className="navbar-left">
          <Link to="/" className="home-link">Home</Link>
          <Link to="/qa" className="qa-link">Q&A</Link>
          <Link to="/contact" className="contact-link">Contact Us</Link>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </div>
      </header>

      <div className="login-wrapper">
      <div className="login-container">
  <h1>LOGIN</h1>
  <form onSubmit={handleLogin} className="login-form">
    <div className="login-row">
      <label>EMAIL :</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="login-row">
      <label>PASSWORD :</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <div className="login-row" style={{ justifyContent: 'space-between', width: '100%' }}>
      <label htmlFor="remember" style={{ width: 'auto' }}>
        <input type="checkbox" id="remember" />
        Remember me
      </label>
      <Link to="#" style={{ color: '#f9c2eb', fontWeight: 'bold' }}>Forgot Password?</Link>
    </div>
    <div className="button-group">
      <button type="submit" className="submit-button">LOGIN</button>
    </div>
    <p style={{ color: '#f9c2eb' }}>
      Don’t have an account ? <Link to="/signup" className="signup-link">SIGN UP here</Link>
    </p>
  </form>
</div>
</div>

    </div>
  );
}

export default Login;