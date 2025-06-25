import React, { useState } from 'react';
import './FrequentlyAskedComponent.css';

const FrequentlyAskedComponent = () => {
  // State to track which FAQ item is currently expanded
  const [expandedItem, setExpandedItem] = useState(null);

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "What is HostBuddy and how does it work?",
      answer: "HostBuddy is a platform designed to help property hosts manage their listings efficiently. It streamlines communication, booking management, and guest experience across multiple rental platforms."
    },
    {
      id: 2,
      question: "Can HostBuddy handle multiple properties?",
      answer: "Yes, HostBuddy is specifically designed to manage multiple properties. You can add unlimited properties to your account and manage them all from a single dashboard."
    },
    {
      id: 3,
      question: "How does HostBuddy save time for hosts?",
      answer: "HostBuddy automates routine tasks like messaging guests, scheduling cleanings, and managing calendars across platforms. This automation can save hosts several hours each week."
    },
    {
      id: 4,
      question: "How quickly can I set up HostBuddy?",
      answer: "Setting up HostBuddy is quick and easy. Most users can complete the initial setup within 15-30 minutes, and our support team is available to help if you need assistance."
    },
  ];

  // Toggle FAQ item expansion
  const toggleItem = (id) => {
    if (expandedItem === id) {
      setExpandedItem(null); // collapse if already expanded
    } else {
      setExpandedItem(id); // expand this item
    }
  };  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked <br/><span>Questions</span></h1>
      </div>
      <div className="faq-content">
        {faqItems.map((item) => (
          <div key={item.id} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggleItem(item.id)}
            >
              <span>{item.question}</span>
              <button className={`expand-button ${expandedItem === item.id ? 'expanded' : ''}`}>
                {expandedItem === item.id ? '-' : '+'}
              </button>
            </div>
            {expandedItem === item.id && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
            <div className="faq-divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedComponent;
