import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const faqs = [
  {
    question: "Can I invite multiple people to the same meeting?",
    answer: "Yes! You can invite multiple participants by separating each email with a comma (,) in the invitation form.",
  },
  {
    question: "What happens after I invite someone to a meeting?",
    answer: 'They will receive a notification. If they click "Accept", they can select one or more available time slots from the options you provided. If they are not available, they can click "Decline".',
  },
  {
    question: 'What does "Success" or "Unsuccess" status mean for a meeting?',
    answer: 'If at least 50% of all participants (including the host) select the same time slot, the meeting will be marked as Success. If fewer than 50% overlap on any time slot, it will be marked as Unsuccess.',
  },
  {
    question: "Can I update or delete a meeting after creating it?",
    answer: "You can’t edit the meeting date, invited users, or the available time slots once it’s created. However, invited users can modify their selected time slots (within the ones you offered). To make other changes, delete and recreate the meeting.",
  },
  {
    question: "What if the person I invited does not have an account yet?",
    answer: "They will not be able to join the meeting. Please make sure the invited emails belong to users who have already signed up.",
  },
];

function QA() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = (index) => {
    setOpenIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="qa-container">
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

      <div className="qa-content-box">
        {faqs.map((faq, index) => (
          <div key={index} className="qa-item">
            <button className="qa-question" onClick={() => toggle(index)}>
              <span>{openIndexes.includes(index) ? '▾' : '▸'}</span>
              <strong> Q : </strong>{faq.question}
            </button>
            <div
              className={`qa-answer ${openIndexes.includes(index) ? 'visible' : ''}`}
            >
              <p><strong>A:</strong> {faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QA;