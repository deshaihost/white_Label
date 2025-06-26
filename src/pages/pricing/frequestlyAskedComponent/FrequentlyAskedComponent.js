import React, { useState } from 'react';
import './FrequentlyAskedComponent.css';

const FrequentlyAskedComponent = () => {
  // State to track which FAQ item is currently expanded
  const [expandedItem, setExpandedItem] = useState(null);

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "How does the free trial work?",
      answer: "All plans include a 14-day free trial with full access to all features. Your trial begins when you create your account, and subscribing during your trial period doesn't end your free days."
    },
    {
      id: 2,
      question: "Which property management systems does HostBuddy integrate with?",
      answer: "HostBuddy integrates with major platforms including Guesty, Hostaway, Hostfully, Lodgify, Hospitable, Lodgify, Beds24, OwnerRez, Resly, and more. We're continuously adding new integrations, so check our integrations page for the most up to date information."
    },
    {
      id: 3,
      question: "Can I customize when HostBuddy responds to guests?",
      answer: "Absolutely! You can create weekly schedules and one-off shifts to match your availability. Schedule HostBuddy for specific hours, days, or 24/7 coverage based on your needs."
    },
    {
      id: 4,
      question: "How does HostBuddy generate additional revenue?",
      answer: "HostBuddy includes Gap Night Upsells that automatically identify and offer unbookable nights between reservations to guests, helping maximize occupancy through extended stays, early check-ins, and late checkouts. Additionally, HostBuddy users report higher review ratings, bumping up their listings in the search results, and increasing occupancy and average daily rate."
    },
    {
      id: 5,
      question: "What happens if I need to add or remove properties?",
      answer: "You can easily adjust your subscription, whether your business is growing or slimming down."
    },
    {
      id: 6,
      question: "How do I control what information HostBuddy shares?",
      answer: "You have complete control over HostBuddy's knowledge base. Restrict specific information based on reservation phases to ensure sensitive data like property addresses is only shared with appropriate guests."
    }
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
