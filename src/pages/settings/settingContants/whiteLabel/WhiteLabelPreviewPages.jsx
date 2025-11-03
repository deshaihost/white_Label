import React from 'react';
import './WhiteLabelPreviewPages.css';

// Custom SVG Icons
const CheckIcon = ({ size = 16, strokeWidth = 2.5, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ClockIcon = ({ className, size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const MoreVerticalIcon = ({ className, size = 20 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

const MessageSquareIcon = ({ className, size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Simple Bar Chart Component (no external dependencies)
const SimpleBarChart = ({ data, brandColors, height = 240 }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 100 / data.length;

  return (
    <div className="simple-bar-chart" style={{ height: `${height}px` }}>
      <div className="chart-bars">
        {data.map((item, idx) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={idx} className="chart-bar-container" style={{ width: `${barWidth}%` }}>
              <div className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${barHeight}%`,
                    backgroundColor: brandColors.primaryBlue 
                  }}
                  title={`${item.hour}: ${item.value}`}
                />
              </div>
              <div className="chart-label" style={{ color: brandColors.tertiaryText }}>
                {item.hour}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Dashboard Preview Component
export function DashboardPreview({ brandColors }) {
  const chartData = [
    { hour: '12am', value: 2 }, { hour: '1am', value: 1 }, { hour: '2am', value: 1 }, { hour: '3am', value: 1 },
    { hour: '4am', value: 1 }, { hour: '5am', value: 3 }, { hour: '6am', value: 4 }, { hour: '7am', value: 8 },
    { hour: '8am', value: 12 }, { hour: '9am', value: 10 }, { hour: '10am', value: 9 }, { hour: '11am', value: 10 },
    { hour: '12pm', value: 8 }, { hour: '1pm', value: 7 }, { hour: '2pm', value: 15 }, { hour: '3pm', value: 11 },
    { hour: '4pm', value: 9 }, { hour: '5pm', value: 8 }, { hour: '6pm', value: 10 }, { hour: '7pm', value: 9 },
    { hour: '8pm', value: 7 }, { hour: '9pm', value: 6 }, { hour: '10pm', value: 4 }, { hour: '11pm', value: 3 },
  ];

  return (
    <>
      <h1 
        className="preview-page-title"
        style={{ color: brandColors.primaryText }}
      >
        Dashboard
      </h1>

      {/* Welcome Banner */}
      <div className="welcome-banner" style={{ backgroundColor: brandColors.hoverBg, borderColor: brandColors.primaryBorder }}>
        <div className="welcome-banner-content">
          <p 
            className="welcome-text"
            style={{ color: brandColors.primaryBlue }}
          >
            Welcome to HostBuddy, Sam
          </p>
          <button 
            className="welcome-cta"
            style={{ color: brandColors.primaryBlue }}
          >
            New to HostBuddy? Get Started →
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        {[
          { title: 'Guest Messages Responded (Total)', value: '513', stats: [['By Host:', '513'], ['By HostBuddy:', '2042']] },
          { title: 'Average Response Times (Minutes)', value: '0.5', stats: [['By HostBuddy:', '0.5'], ['By Host:', '18.1']] },
          { title: 'Guest Sentiment (Percent)', value: '33.2%', stats: [['Positive:', '33.2%'], ['Neutral:', '58.6%'], ['Negative:', '7.0%']] }
        ].map((card, idx) => (
          <div 
            key={idx}
            className="metric-card"
            style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
          >
            <h3 
              className="metric-card-title"
              style={{ color: brandColors.tertiaryText }}
            >
              {card.title}
            </h3>
            <p 
              className="metric-card-value"
              style={{ color: brandColors.primaryText }}
            >
              {card.value}
            </p>
            <div className="metric-card-stats">
              {card.stats.map((stat, i) => (
                <div key={i} className="metric-stat-row">
                  <span className="metric-stat-label" style={{ color: brandColors.tertiaryText }}>{stat[0]}</span>
                  <span className="metric-stat-value" style={{ color: brandColors.primaryText }}>{stat[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="chart-card" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}>
        <h3 className="chart-title" style={{ color: brandColors.primaryText }}>
          Timing of messages received (by hour of day - average)
        </h3>
        <SimpleBarChart data={chartData} brandColors={brandColors} />
        <div className="chart-footer">
          <p className="chart-footer-text" style={{ color: brandColors.tertiaryText }}>
            Above data from Sep 11, 2025 to Oct 13, 2025
          </p>
          <button className="chart-footer-link" style={{ color: brandColors.primaryBlue }}>
            See more statistics
          </button>
        </div>
      </div>

      {/* Action Items Table */}
      <div className="action-items-table" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}>
        <div className="table-header-section" style={{ borderColor: brandColors.primaryBorder }}>
          <h3 className="table-title" style={{ color: brandColors.primaryText }}>
            Incomplete Action Items <span className="table-subtitle" style={{ color: brandColors.tertiaryText }}>(Most Recent)</span>
          </h3>
          <button className="table-see-all" style={{ color: brandColors.primaryBlue }}>
            See All
          </button>
        </div>

        {/* Table Header */}
        <div className="table-header-row" style={{ backgroundColor: brandColors.primaryBg, borderColor: brandColors.primaryBorder }}>
          <p className="table-header-cell" style={{ color: brandColors.tertiaryText }}>Date/Time</p>
          <p className="table-header-cell" style={{ color: brandColors.tertiaryText }}>Property/Guest</p>
          <p className="table-header-cell" style={{ color: brandColors.tertiaryText }}>Action Item</p>
          <p className="table-header-cell table-header-center" style={{ color: brandColors.tertiaryText }}>Complete</p>
        </div>

        {/* Table Rows */}
        {[
          { date: '10/17', time: '4:32 PM', property: 'Boho Villa', guest: 'Brolin Cox', action: 'HostBuddy suggested to send check-out time', completed: false },
          { date: '10/17', time: '3:47 PM', property: 'Modern Villa', guest: 'Sophia Lee', action: 'Guest asked about early check-in', completed: false },
          { date: '10/17', time: '2:15 PM', property: 'OASIS VILLA', guest: 'Marcus Johnson', action: 'Follow up on parking inquiry', completed: false }
        ].map((item, idx) => (
          <div
            key={idx}
            className="table-row"
            style={{ borderColor: brandColors.primaryBorder }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="table-cell">
              <p className="cell-primary" style={{ color: brandColors.primaryText }}>{item.date}</p>
              <p className="cell-secondary" style={{ color: brandColors.tertiaryText }}>{item.time}</p>
            </div>
            <div className="table-cell">
              <p className="cell-primary" style={{ color: brandColors.primaryText }}>{item.property}</p>
              <p className="cell-secondary" style={{ color: brandColors.tertiaryText }}>{item.guest}</p>
            </div>
            <p className="table-cell cell-action" style={{ color: brandColors.primaryText }}>{item.action}</p>
            <div className="table-cell table-cell-center">
              <button 
                className="complete-button"
                style={{ borderColor: brandColors.primaryBlue, boxShadow: brandColors.primaryGlow }}
              >
                <CheckIcon size={16} strokeWidth={2.5} color={brandColors.primaryBlue} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Properties Preview Component
export function PropertiesPreview({ brandColors }) {
  const properties = [
    { 
      name: 'Boho Villa | Best Location | Full Staff', 
      status: 'RESPONDING',
      statusText: 'Currently RESPONDING to all guests',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'
    },
    { 
      name: 'Modern Villa | Best Location | Full Staff | Cinema', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    },
    { 
      name: 'OASIS VILLA • PRIME Location • FULL STAFF • Cinema', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=400&h=300&fit=crop'
    },
    { 
      name: 'PRIME Location FREE Parking Secured Residence', 
      status: 'OFF',
      statusText: 'Currently Off (until scheduled ON)',
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400&h=300&fit=crop'
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="properties-header">
        <h1 
          className="properties-title"
          style={{ color: brandColors.primaryBlue }}
        >
          Properties
        </h1>
        <div className="properties-header-actions">
          {/* Status dot and text
          <div className="status-indicator" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
            <div className="status-dot" style={{ backgroundColor: brandColors.successGreen, boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)' }} />
            <span className="status-text" style={{ color: brandColors.secondaryText }}>
              AI Status
            </span>
          </div>
          */}
          <button 
            className="stop-all-button"
            style={{ 
              backgroundColor: brandColors.primaryBlue,
              color: brandColors.primaryText,
              boxShadow: brandColors.buttonGlow
            }}
          >
            STOP ALL
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <div className="action-cards-grid">
        <div className="action-card" style={{ borderColor: brandColors.activeBorder, backgroundColor: brandColors.secondaryBg }}>
          <h3 className="action-card-title" style={{ color: brandColors.primaryBlue }}>
            Import Properties
          </h3>
          <p className="action-card-text" style={{ color: brandColors.tertiaryText }}>
            Connected to Beds24. Click to import your properties.
          </p>
        </div>
        <div className="action-card" style={{ borderColor: brandColors.activeBorder, backgroundColor: brandColors.secondaryBg }}>
          <h3 className="action-card-title" style={{ color: brandColors.primaryBlue }}>
            Subscribe
          </h3>
          <p className="action-card-text" style={{ color: brandColors.tertiaryText }}>
            Get HostBuddy plugged in to your guest communication.
          </p>
        </div>
      </div>

      {/* Property List */}
      <div className="property-list">
        {properties.map((property, idx) => (
          <div 
            key={idx}
            className="property-card"
            style={{ 
              backgroundColor: brandColors.secondaryBg, 
              borderColor: brandColors.primaryBorder,
              boxShadow: brandColors.cardShadow 
            }}
          >
            <div className="property-card-content">
              {/* Property Image */}
              <img 
                src={property.image} 
                alt={property.name}
                className="property-image"
              />
              
              {/* Property Info */}
              <div className="property-info">
                <h3 className="property-name" style={{ color: brandColors.primaryText }}>
                  {property.name}
                </h3>
                <div className="property-controls">
                  <button 
                    className="property-stop-button"
                    style={{ 
                      backgroundColor: brandColors.primaryBlue,
                      color: brandColors.primaryText
                    }}
                  >
                    STOP
                  </button>
                  <button className="property-schedule-button" style={{ color: brandColors.primaryBlue }}>
                    <ClockIcon className="schedule-icon" size={14} />
                    Schedule
                  </button>
                </div>
                <p className="property-status" style={{ color: property.status === 'RESPONDING' ? brandColors.successGreen : brandColors.errorRed }}>
                  {property.statusText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="property-actions">
                <button 
                  className="property-setup-button"
                  style={{ 
                    backgroundColor: 'transparent',
                    borderColor: brandColors.primaryBlue,
                    color: brandColors.primaryBlue
                  }}
                >
                  Property Setup
                </button>
                <button 
                  className="property-test-button"
                  style={{ 
                    backgroundColor: brandColors.primaryBlue,
                    color: brandColors.primaryText,
                    boxShadow: brandColors.buttonGlow
                  }}
                >
                  Test Property
                </button>
                <button className="property-more-button">
                  <MoreVerticalIcon className="more-icon" size={20} style={{ color: brandColors.tertiaryText }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Messaging Preview Component
export function MessagingPreview({ brandColors }) {
  const conversations = [
    {
      name: 'Brolin Cox',
      message: 'Hi Brolin, welcome to Hidden Haven...',
      timestamp: '10/17 4:32 PM',
      dateRange: 'Oct 17 - 19',
      property: 'Chalcedony',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🟠',
      starred: true,
      unread: 0,
      urgent: true,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?w=200&h=150&fit=crop'
    },
    {
      name: 'Hallie Swartzbaeker',
      message: 'Of course! The entrance to th...',
      timestamp: '10/17 4:59 PM',
      dateRange: 'Oct 17 - 20',
      property: '831 A',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: '🔵',
      unread: 18,
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?w=200&h=150&fit=crop'
    },
    {
      name: 'Unknown Contact...',
      message: 'Kindly return the key in the lo...',
      timestamp: '10/17 4:47 PM',
      dateRange: 'External Contact',
      property: '',
      status: 'Guest',
      platform: '🟠',
      starred: true,
      unread: 1,
      image: 'https://images.unsplash.com/photo-1623300025008-ccbe3e8501aa?w=200&h=150&fit=crop'
    },
  ];

  const messages = [
    { sender: 'host', text: 'Hi Brolin, Have you access Code to location UUUUUUL', time: 'Host 3:12 PM' },
    { sender: 'host', text: 'You can check in now unit is ready. Thank you!', time: 'Host 3:12 PM' },
    { sender: 'guest', text: 'Awesome. Thank you we are about 15 minutes away! I appreciate it', time: 'Brolin Cox 3:20 PM' },
    { sender: 'host', text: "That's great to hear! Safe travels for the last stretch of your drive. We hope you have a fantastic stay!", time: 'HostBuddy 3:23 PM', hostBuddy: true },
    { sender: 'host', text: 'Hi Brolin, welcome to Hidden Haven! I hope you and your group are settling in comfortably after your early arrival. If you need anything at all during your stay, just let us know. Enjoy your time in San Diego!', time: 'HostBuddy 4:32 PM', hostBuddy: true }
  ];

  return (
    <div className="messaging-preview">
      {/* Conversations List */}
      <div className="conversations-sidebar" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
        {/* Header */}
        <div className="conversations-header" style={{ borderColor: brandColors.primaryBorder }}>
          <h2 className="conversations-title" style={{ color: brandColors.primaryText }}>
            Inbox
          </h2>
          <div className="conversations-search">
            <div className="search-input-wrapper">
              <MessageSquareIcon className="search-icon" size={16} style={{ color: brandColors.tertiaryText }} />
              <input
                type="text"
                placeholder="Search by guest name or p..."
                className="search-input"
                style={{ 
                  backgroundColor: brandColors.inputBg,
                  borderColor: brandColors.primaryBorder,
                  color: brandColors.primaryText
                }}
              />
            </div>
            <button 
              className="filters-button"
              style={{ 
                backgroundColor: brandColors.primaryBlue,
                color: '#FFFFFF'
              }}
            >
              Filters
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="conversations-list">
          {conversations.map((conv, idx) => (
            <div
              key={idx}
              className="conversation-item"
              style={{ 
                borderColor: brandColors.primaryBorder,
                backgroundColor: idx === 0 ? brandColors.hoverBg : 'transparent'
              }}
            >
              <div className="conversation-content">
                {/* Property Image */}
                <img 
                  src={conv.image} 
                  alt={conv.property}
                  className="conversation-image"
                />
                
                {/* Content */}
                <div className="conversation-details">
                  <div className="conversation-header-line">
                    <div className="conversation-name-section">
                      <p className="conversation-name" style={{ color: brandColors.primaryText }}>
                        {conv.name}
                      </p>
                      {conv.urgent && (
                        <span className="urgent-badge" style={{ backgroundColor: brandColors.errorRed, color: '#FFFFFF' }}>
                          🔥 Urgent
                        </span>
                      )}
                    </div>
                    <span className="conversation-timestamp" style={{ color: brandColors.tertiaryText }}>
                      {conv.timestamp}
                    </span>
                  </div>
                  
                  <p className="conversation-message" style={{ color: brandColors.tertiaryText }}>
                    {conv.message}
                  </p>
                  
                  <div className="conversation-meta" style={{ color: brandColors.quaternaryText }}>
                    <span>{conv.dateRange}</span>
                    {conv.property && <span>{conv.property}</span>}
                  </div>
                  
                  <div className="conversation-footer">
                    <div className="conversation-badges">
                      <span className="status-badge" style={{ backgroundColor: brandColors.hoverBg, color: brandColors.primaryText }}>
                        {conv.status}
                      </span>
                      {conv.checkIn && (
                        <span className="checkin-badge" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                          {conv.checkIn}
                        </span>
                      )}
                      <span>{conv.platform}</span>
                    </div>
                    {conv.unread > 0 && (
                      <span className="unread-count" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className="conversation-view" style={{ backgroundColor: brandColors.primaryBg }}>
        {/* Header */}
        <div className="conversation-view-header" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
          <div className="conversation-view-header-left">
            <div className="conversation-avatar" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
              B
            </div>
            <div className="conversation-view-info">
              <h3 className="conversation-view-name" style={{ color: brandColors.primaryText }}>
                Brolin Cox
              </h3>
              <span className="conversation-view-urgent" style={{ backgroundColor: brandColors.errorRed, color: '#FFFFFF' }}>
                🔥 Urgent
              </span>
            </div>
          </div>
          
          <div className="conversation-view-actions">
            {['PMS', 'WhatsApp', 'OpenPhone'].map((btn) => (
              <button key={btn} className="action-pill" style={{ borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
                {btn}
              </button>
            ))}
            <button className="action-pill" style={{ borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
              Open Issue
              <span className="issue-count" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>1</span>
            </button>
            <button className="action-pill" style={{ borderColor: brandColors.primaryBorder, backgroundColor: 'transparent', color: brandColors.tertiaryText }}>
              Notes
            </button>
            <button className="action-pill-primary" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
              Details
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'host' ? 'message-host' : 'message-guest'}`}>
              {msg.sender === 'guest' ? (
                <>
                  <div className="message-bubble message-bubble-guest" style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder }}>
                    <p className="message-text" style={{ color: brandColors.primaryText }}>
                      {msg.text}
                    </p>
                  </div>
                  <span className="message-time" style={{ color: brandColors.tertiaryText }}>
                    {msg.time}
                  </span>
                </>
              ) : (
                <>
                  <div className="message-bubble message-bubble-host" style={{ backgroundColor: brandColors.hoverBg, border: `1px solid ${brandColors.primaryBorder}` }}>
                    <p className="message-text" style={{ color: brandColors.primaryText }}>
                      {msg.text}
                    </p>
                  </div>
                  <div className="message-time-section">
                    {msg.hostBuddy && (
                      <div className="hostbuddy-indicator">
                        <div className="hostbuddy-badge" style={{ backgroundColor: brandColors.primaryBlue, color: '#FFFFFF' }}>
                          H
                        </div>
                      </div>
                    )}
                    <span className="message-time" style={{ color: brandColors.tertiaryText }}>
                      {msg.time}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="message-input-area" style={{ borderColor: brandColors.primaryBorder, backgroundColor: brandColors.secondaryBg }}>
          <div className="message-input-row">
            <input 
              type="text"
              placeholder="Message..."
              className="message-input"
              style={{ 
                backgroundColor: brandColors.inputBg,
                borderColor: brandColors.primaryBorder,
                color: brandColors.primaryText
              }}
            />
            <button 
              className="send-button"
              style={{ 
                backgroundColor: brandColors.primaryBlue,
                color: '#FFFFFF'
              }}
            >
              Send
            </button>
          </div>
          <button className="ai-response-button" style={{ color: brandColors.tertiaryText }}>
            🤖 AI Response
          </button>
        </div>
      </div>
    </div>
  );
}

// Action Items Preview Component
export function ActionItemsPreview({ brandColors }) {
  return (
    <>
      <h1 
        className="preview-page-title"
        style={{ color: brandColors.primaryText }}
      >
        Action Items
      </h1>

      <div 
        className="action-items-table"
        style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
      >
        {/* Table Header */}
        <div className="action-items-header-row" style={{ backgroundColor: brandColors.tableHeaderBg, borderColor: brandColors.primaryBorder }}>
          <p className="action-items-header-cell" style={{ color: brandColors.tertiaryText }}>Date/Time</p>
          <p className="action-items-header-cell" style={{ color: brandColors.tertiaryText }}>Property/Guest</p>
          <p className="action-items-header-cell" style={{ color: brandColors.tertiaryText }}>Action Item</p>
          <p className="action-items-header-cell action-items-header-center" style={{ color: brandColors.tertiaryText }}>Complete</p>
        </div>

        {/* Sample Rows */}
        {[
          { date: 'Oct 17', time: '2:30 PM', property: 'Beach House', guest: 'John Doe', action: 'Send check-in instructions' },
          { date: 'Oct 17', time: '11:15 AM', property: 'Mountain Cabin', guest: 'Jane Smith', action: 'Respond to guest inquiry' },
          { date: 'Oct 16', time: '4:45 PM', property: 'City Loft', guest: 'Bob Wilson', action: 'Confirm booking details' },
          { date: 'Oct 16', time: '9:30 AM', property: 'Lake Cottage', guest: 'Alice Brown', action: 'Update house rules' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="action-items-row"
            style={{ borderColor: brandColors.primaryBorder }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandColors.tableRowHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="action-items-cell">
              <p className="cell-primary" style={{ color: brandColors.primaryText }}>{item.date}</p>
              <p className="cell-secondary" style={{ color: brandColors.tertiaryText }}>{item.time}</p>
            </div>
            <div className="action-items-cell">
              <p className="cell-primary" style={{ color: brandColors.primaryText }}>{item.property}</p>
              <p className="cell-secondary" style={{ color: brandColors.tertiaryText }}>{item.guest}</p>
            </div>
            <p className="action-items-cell cell-action" style={{ color: brandColors.primaryText }}>{item.action}</p>
            <div className="action-items-cell action-items-cell-center">
              <button 
                className="complete-button"
                style={{ borderColor: brandColors.primaryBlue, boxShadow: brandColors.primaryGlow }}
              >
                <CheckIcon size={16} strokeWidth={2.5} color={brandColors.primaryBlue} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Insights Preview Component
export function InsightsPreview({ brandColors }) {
  const chartData = [
    { hour: '12am', value: 2 }, { hour: '6am', value: 4 }, { hour: '12pm', value: 8 },
    { hour: '2pm', value: 15 }, { hour: '6pm', value: 10 }, { hour: '9pm', value: 6 }
  ];

  return (
    <>
      <h1 
        className="preview-page-title"
        style={{ color: brandColors.primaryText }}
      >
        Insights
      </h1>

      {/* Chart */}
      <div 
        className="chart-card insights-chart"
        style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
      >
        <h3 className="chart-title" style={{ color: brandColors.primaryText }}>
          Message Volume by Hour
        </h3>
        <SimpleBarChart data={chartData} brandColors={brandColors} height={280} />
      </div>

      {/* Stats Grid */}
      <div className="insights-stats-grid">
        {[
          { title: 'Response Rate', value: '98.5%', change: '+2.3%' },
          { title: 'Avg Response Time', value: '0.5 min', change: '-18 min' },
          { title: 'Guest Satisfaction', value: '4.8/5', change: '+0.2' }
        ].map((stat, idx) => (
          <div 
            key={idx}
            className="metric-card"
            style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
          >
            <p className="insights-stat-label" style={{ color: brandColors.tertiaryText }}>{stat.title}</p>
            <p className="insights-stat-value" style={{ color: brandColors.primaryText }}>{stat.value}</p>
            <p className="insights-stat-change" style={{ color: brandColors.successGreen }}>{stat.change}</p>
          </div>
        ))}
      </div>
    </>
  );
}

// Settings Preview Component
export function SettingsPreview({ brandColors }) {
  return (
    <>
      <h1 
        className="preview-page-title"
        style={{ color: brandColors.primaryText }}
      >
        Settings
      </h1>

      <div className="settings-sections">
        {/* Account Section */}
        <div 
          className="settings-card"
          style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
        >
          <h3 className="settings-card-title" style={{ color: brandColors.primaryText }}>
            Account Settings
          </h3>
          <div className="settings-rows">
            {['Email', 'Password', 'Phone Number'].map((field, idx) => (
              <div key={idx} className="settings-row" style={{ borderColor: brandColors.primaryBorder }}>
                <span className="settings-row-label" style={{ color: brandColors.secondaryText }}>{field}</span>
                <button 
                  className="settings-row-edit"
                  style={{ color: brandColors.primaryBlue }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div 
          className="settings-card"
          style={{ backgroundColor: brandColors.secondaryBg, borderColor: brandColors.primaryBorder, boxShadow: brandColors.cardShadow }}
        >
          <h3 className="settings-card-title" style={{ color: brandColors.primaryText }}>
            Notifications
          </h3>
          <div className="settings-rows">
            {['Email Notifications', 'SMS Alerts', 'Push Notifications'].map((setting, idx) => (
              <div key={idx} className="settings-row-toggle">
                <span className="settings-row-label" style={{ color: brandColors.secondaryText }}>{setting}</span>
                <div 
                  className="toggle-switch"
                  style={{ backgroundColor: idx === 0 ? brandColors.primaryBlue : brandColors.toggleBgOff, boxShadow: idx === 0 ? brandColors.toggleGlow : 'none' }}
                >
                  <div 
                    className="toggle-knob"
                    style={{ 
                      backgroundColor: brandColors.primaryText,
                      transform: idx === 0 ? 'translateX(24px)' : 'translateX(0)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
