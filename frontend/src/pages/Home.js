import React from "react";
import "../App.css"; // นำเข้า CSS ที่ใช้ในหน้า Home
import { Link } from 'react-router-dom';
import Homeimage from "../images/homeimage copy.jpg"; // นำเข้าภาพที่ใช้ในหน้า Home



function Home() {
  return (
    <div className="home-container">
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


      {/* เนื้อหาหลักอยู่ทางซ้าย */}
  <div className="home-content">
        <p className="estd">ESTD ⏰ 2025</p>
        <h1>Harmonize<br/>Meeting club</h1>
        <p>Find Your Perfect Time !!</p>
        <Link to="/login" className="custom-button">LOGIN</Link>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="custom-button">SIGN UP here</Link>
        </p>
      </div>


      {/* รูปภาพทางขวา */}
      <div className="home-image-container">
        <img src={Homeimage} className="home-image" alt="Meeting Club" />
      </div>
    </div>
  );
}

export default Home;