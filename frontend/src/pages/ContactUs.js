import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

function ContactUs() {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const contactData = {
      full_name,
      email,
      subject,
      message,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      console.log("📦 Server response:", result);

      if (response.ok) {
        alert('✅ Message sent successfully');
        // ล้างฟอร์ม
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        alert('❌ Error sending message: ' + (result.error || 'Unknown error occurred'));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
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

      <div className="contact-form-container">
        <h1>We’d Love to Hear From You!</h1>
        <p className="subtext">If you have any questions, feel free to reach out to us using the form below.</p>

        <form className="styled-contact-form" onSubmit={handleSubmit}>
          <label>FULL NAME :</label>
          <input type="text" value={full_name} onChange={(e) => setFullName(e.target.value)} required />

          <label>EMAIL :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>SUBJECT :</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />

          <label>YOUR MESSAGE :</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />

          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;