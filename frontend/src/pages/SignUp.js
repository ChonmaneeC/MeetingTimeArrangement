import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupData = {
      email: email.trim().toLowerCase(),
      full_name: fullName.trim(),
      phone_number: phoneNumber.trim(),
      password,
      confirm_password: confirmPassword,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Unexpected server response");
      }

      if (response.ok) {
        alert('✅ Signup successful! You can now log in.');
        navigate('/login');
      } else {
        alert('❌ Signup failed: ' + result.error);
      }
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

      <div className="signup-wrapper">
  <div className="signup-container">
    <h1>CREATE AN ACCOUNT</h1>
    <form onSubmit={handleSignup} className="signup-form">
      <div className="signup-row">
        <label>FULL NAME :</label>
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </div>
      <div className="signup-row">
        <label>EMAIL :</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="signup-row">
        <label>PHONE NUMBER :</label>
        <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="signup-row">
        <label>PASSWORD :</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <div className="signup-row">
        <label>CONFIRM PASSWORD :</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </div>

      <div className="button-group">
        <button type="submit" className="submit-button">SIGN UP</button>
      </div>

      <p>Already have an account? <Link to="/login" className="login-link">LOGIN here</Link></p>
    </form>
  </div>
</div>


    </div>
);
}

export default Signup;