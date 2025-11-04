import React from 'react';
import './WhiteLabelPreviewPages.css';

// Import icons from existing inbox
import ThumbsUpIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/thumbsComponent/icons/Thumbs_Up_Icon.svg';
import ThumbsDownIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/thumbsComponent/icons/Thumbs_Down_Icon.svg';
import HelpCircleIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/thumbsComponent/icons/help_circle.svg';
import HostBuddyIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/thumbsComponent/icons/hostBuddy_icon.svg';
import AiMessageIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/ai_messsage_icon.svg';
import SendTemplateIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/sendTemplate_icon.svg';
import ChevDownIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/chevDown.svg';
import SendIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/send_icon.svg';
import PmsIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/pms_icon.svg';
import WhatsAppIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/whatsapp_icon.svg';
import NotesIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/notes_icon.svg';
import OpenIssueIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/openIssue_icon.svg';
import DefaultPinIcon from '../../../inbox/inboxSection/inbox/mildeSection/message/icons/default_pin.svg';

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
                    backgroundColor: brandColors.chartBarFill 
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
            style={{ color: brandColors.actionLink }}
          >
            Welcome, Sam
          </p>
          <button 
            className="welcome-cta"
            style={{ color: brandColors.actionLink }}
          >
            New? Get Started →
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
          <button className="chart-footer-link" style={{ color: brandColors.actionLink }}>
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
          <button className="table-see-all" style={{ color: brandColors.actionLink }}>
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
                style={{ borderColor: brandColors.outlineButtonBorder, boxShadow: brandColors.primaryGlow }}
              >
                <CheckIcon size={16} strokeWidth={2.5} color={brandColors.outlineButtonText} />
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
          style={{ color: brandColors.primaryText }}
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
              backgroundColor: brandColors.primaryButtonBg,
              color: brandColors.primaryButtonText,
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
          <h3 className="action-card-title" style={{ color: brandColors.actionLink }}>
            Import Properties
          </h3>
          <p className="action-card-text" style={{ color: brandColors.tertiaryText }}>
            Connected to Beds24. Click to import your properties.
          </p>
        </div>
        <div className="action-card" style={{ borderColor: brandColors.activeBorder, backgroundColor: brandColors.secondaryBg }}>
          <h3 className="action-card-title" style={{ color: brandColors.actionLink }}>
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
            className="wl-preview-property-card"
            style={{ 
              backgroundColor: brandColors.secondaryBg, 
              borderColor: brandColors.primaryBorder,
              boxShadow: brandColors.cardShadow 
            }}
          >
            <div className="wl-preview-property-card-content">
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
                      backgroundColor: brandColors.primaryButtonBg,
                      color: brandColors.primaryButtonText
                    }}
                  >
                    STOP
                  </button>
                  <button className="property-schedule-button" style={{ color: brandColors.actionLink }}>
                    <ClockIcon className="schedule-icon" size={14} />
                    Schedule
                  </button>
                </div>
                <p className="property-status" style={{ color: property.status === 'RESPONDING' ? brandColors.successGreen : brandColors.errorRed }}>
                  {property.statusText}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="wl-preview-property-actions">
                <div className="property-action-buttons">
                  <button 
                    className="property-setup-button"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: brandColors.outlineButtonBorder,
                      color: brandColors.outlineButtonText
                    }}
                  >
                    Property Setup
                  </button>
                  <button 
                    className="property-test-button"
                    style={{ 
                      backgroundColor: brandColors.primaryButtonBg,
                      color: brandColors.primaryButtonText,
                      boxShadow: brandColors.buttonGlow
                    }}
                  >
                    Test Property
                  </button>
                </div>
                <button className="property-more-button">
                  <MoreVerticalIcon className="more-icon" size={16} style={{ color: brandColors.tertiaryText }} />
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
  // Sample conversation data matching design reference
  const conversations = [
    {
      name: 'Brooklyn Simmons',
      message: 'Hi, I would like to know if there is parking available?',
      timestamp: '2/12 10:00 AM',
      dateRange: 'Feb 12-15',
      property: '4517 Washington Ave. Manchester, Kentucky 39495',
      status: 'Guest',
      checkIn: 'Check-out today',
      platform: 'Airbnb',
      starred: true,
      unread: 4,
      urgent: true,
      image: 'https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?w=160&h=160&fit=crop'
    },
    {
      name: 'Floyd Miles',
      message: 'Hi, I would like to know if there is parking available?',
      timestamp: '2/12 10:00 AM',
      dateRange: 'Feb 12-15',
      property: '4517 Washington Ave. Manchester, Kentucky 39495',
      status: 'Guest',
      checkIn: 'Check-in today',
      platform: 'Vrbo',
      unread: 1,
      selected: true,
      badges: ['pinned', 'same-day-booking', 'same-day-turnover'],
      image: 'https://images.unsplash.com/photo-1742039953129-e4edcc82d319?w=160&h=160&fit=crop'
    },
    {
      name: 'Cody Fisher',
      message: 'Hi, I would like to know if there is parking available?',
      timestamp: '2/12 10:00 AM',
      dateRange: 'External Contact',
      property: '',
      status: 'External contact',
      platform: 'SMS',
      urgent: true,
      image: 'https://images.unsplash.com/photo-1623300025008-ccbe3e8501aa?w=160&h=160&fit=crop'
    },
  ];

  // Sample messages matching design reference structure
  const messages = [
    { type: 'divider', text: 'Feb 12' },
    { 
      sender: 'host', 
      text: "Hi Floyd, here's your lock box code is 721539205🔓", 
      time: '11:30 AM',
      showFeedback: true
    },
    { 
      sender: 'guest', 
      text: 'Ok thank you', 
      time: '11:30 AM',
      guestName: 'Floyd Miles'
    },
    { type: 'divider', text: 'Today' },
    { 
      sender: 'host', 
      text: 'Hi Floyd, we hope you were able to get settled in okay and found the parking spaces near the laundry room without any trouble. Please let us know if there is anything we can do to make your stay more comfortable!', 
      time: '11:30 AM',
      smartTemplate: true,
      showFeedback: true
    },
    { 
      sender: 'guest', 
      text: 'Hello Sam we were interested in extending our stay I notice that tomorrow Saturday only is booked? Is it possible to extend through the weekend', 
      time: '11:30 AM',
      guestName: 'Floyd Miles'
    },
  ];

  return (
    <>
      {/* Dynamic color styles - these use brandColors variables so must stay inline */}
      <style>{`
        #messaging-preview-root {
          background-color: ${brandColors.primaryBg};
        }
        #messaging-preview-root .msg-chat-header {
          background-color: ${brandColors.secondaryBg};
          border-bottom-color: ${brandColors.primaryBorder};
        }
        #messaging-preview-root .msg-guest-name {
          color: ${brandColors.primaryText};
        }
        #messaging-preview-root .msg-details-button {
          background-color: ${brandColors.hoverBg};
          color: ${brandColors.lightBlue};
        }
        #messaging-preview-root .msg-pin-button:hover {
          background-color: ${brandColors.hoverBg};
        }
        #messaging-preview-root .msg-tab {
          color: ${brandColors.primaryText};
        }
        #messaging-preview-root .msg-tab.active::after {
          background-color: ${brandColors.primaryButtonBg};
        }
        #messaging-preview-root .msg-tab-inactive {
          color: ${brandColors.secondaryText};
        }
        #messaging-preview-root .msg-tab-menu {
          border-bottom-color: ${brandColors.primaryBorder};
        }
        #messaging-preview-root .msg-chat-box {
          background-color: ${brandColors.primaryBg};
          border-left-color: ${brandColors.primaryBorder};
          border-right-color: ${brandColors.primaryBorder};
        }
        #messaging-preview-root .msg-divider-text {
          color: ${brandColors.tertiaryText};
        }
        #messaging-preview-root .msg-author-name {
          color: ${brandColors.tertiaryText};
        }
        #messaging-preview-root .msg-timestamp {
          color: ${brandColors.tertiaryText};
        }
        #messaging-preview-root .msg-divider-dot {
          background-color: ${brandColors.quaternaryText};
        }
        #messaging-preview-root .msg-bubble-host {
          background-color: ${brandColors.secondaryBg};
        }
        #messaging-preview-root .msg-bubble-guest {
          background-color: ${brandColors.cardBg};
        }
        #messaging-preview-root .msg-bubble-text {
          color: ${brandColors.primaryText};
        }
        #messaging-preview-root .msg-feedback-btn {
          color: ${brandColors.quaternaryText};
        }
        #messaging-preview-root .msg-text-area {
          background-color: ${brandColors.secondaryBg};
          border-top-color: ${brandColors.primaryBorder};
          border-left-color: ${brandColors.primaryBorder};
        }
        #messaging-preview-root .msg-placeholder {
          color: ${brandColors.quaternaryText};
        }
        #messaging-preview-root .msg-dropdown-btn {
          color: ${brandColors.secondaryText};
        }
        #messaging-preview-root .msg-template-btn {
          color: ${brandColors.secondaryText};
        }
        #messaging-preview-root .msg-send-btn {
          background-color: ${brandColors.primaryButtonBg};
          color: ${brandColors.primaryButtonText};
        }
        #messaging-preview-root .msg-send-dropdown {
          background-color: ${brandColors.primaryButtonBg};
          color: ${brandColors.primaryButtonText};
        }
      `}</style>
      
      <div id="messaging-preview-root">
        {/* Chat Header (top) */}
        <div className="msg-chat-header">
          <div className="msg-header-content">
            <div className="msg-name-buttons">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop"
                alt="Floyd Miles"
                className="msg-guest-avatar"
              />
              <h2 className="msg-guest-name">Floyd Miles</h2>
              <button className="msg-pin-button" title="Pin conversation">
                <img src={DefaultPinIcon} alt="Pin" style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="msg-details-button">
                <span>Details</span>
              </button>
            </div>
            
            <div className="msg-tab-menu">
              <button className="msg-tab active">
                <img src={PmsIcon} alt="PMS" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                <span>PMS</span>
              </button>
              <button className="msg-tab msg-tab-inactive">
                <img src={WhatsAppIcon} alt="WhatsApp" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                <span>WhatsApp</span>
              </button>
              <button className="msg-tab msg-tab-inactive">
                <img src={OpenIssueIcon} alt="Open issues" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                <span>Open issues</span>
                <span style={{ 
                  backgroundColor: 'rgba(189,193,201,0.08)', 
                  color: brandColors.tertiaryText,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>3</span>
              </button>
              <button className="msg-tab msg-tab-inactive">
                <img src={NotesIcon} alt="Notes" style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                <span>Notes</span>
                <span style={{ 
                  backgroundColor: 'rgba(189,193,201,0.08)', 
                  color: brandColors.tertiaryText,
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>2</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Chat Box (middle - scrollable) */}
        <div className="msg-chat-box">
          <div className="msg-content">
            {messages.map((msg, idx) => {
              if (msg.type === 'divider') {
                return (
                  <div key={idx} className="msg-day-divider">
                    <div className="msg-divider-line"></div>
                    <span className="msg-divider-text">{msg.text}</span>
                    <div className="msg-divider-line"></div>
                  </div>
                );
              }
              
              return (
                <div key={idx} className={`msg-message ${msg.sender === 'host' ? 'msg-message-host' : 'msg-message-guest'}`}>
                  {/* Author + Timestamp */}
                  <div className="msg-author-timestamp">
                    {msg.sender === 'host' ? (
                      <>
                        <img 
                          src={HostBuddyIcon} 
                          alt="HostBuddy"
                          className="msg-logo"
                        />
                        <span className="msg-timestamp">{msg.time}</span>
                        {msg.smartTemplate && (
                          <span className="msg-smart-template-badge">Smart template</span>
                        )}
                      </>
                    ) : (
                      <>
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                          alt={msg.guestName}
                          className="msg-guest-avatar-small"
                        />
                        <span className="msg-author-name">{msg.guestName}</span>
                        <div className="msg-divider-dot"></div>
                        <span className="msg-timestamp">{msg.time}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`msg-bubble ${msg.sender === 'host' ? 'msg-bubble-host' : 'msg-bubble-guest'}`}>
                    <p className="msg-bubble-text">{msg.text}</p>
                  </div>
                  
                  {/* Feedback (only for host messages) */}
                  {msg.showFeedback && (
                    <div className="msg-feedback-info">
                      <button className="msg-feedback-btn" title="Thumbs up">
                        <img src={ThumbsUpIcon} alt="Thumbs up" style={{ width: '16px', height: '16px' }} />
                      </button>
                      <button className="msg-feedback-btn" title="Thumbs down">
                        <img src={ThumbsDownIcon} alt="Thumbs down" style={{ width: '16px', height: '16px' }} />
                      </button>
                      <button className="msg-feedback-btn" title="Help">
                        <img src={HelpCircleIcon} alt="Help" style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Text Area (bottom) */}
        <div className="msg-text-area">
          <div className="msg-textarea-content">
            <div className="msg-placeholder">Message...</div>
            
            <div className="msg-actions">
              <div className="msg-ai-templates">
                <button className="msg-dropdown-btn">
                  <img src={AiMessageIcon} alt="AI" style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                  <span>AI response</span>
                  <img src={ChevDownIcon} alt="Dropdown" style={{ width: '20px', height: '20px', marginLeft: '0px' }} />
                </button>
                
                <div className="msg-divider-vertical"></div>
                
                <button className="msg-template-btn">
                  <img src={SendTemplateIcon} alt="Template" style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                  <span>Send template</span>
                </button>
              </div>
              
              <div className="msg-send-button-group">
                <button className="msg-send-btn">
                  <span>Send</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: '2px' }}
                  >
                    <path
                      d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="msg-send-dropdown">
                  <img src={ChevDownIcon} alt="Dropdown" style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
                style={{ borderColor: brandColors.outlineButtonBorder, boxShadow: brandColors.primaryGlow }}
              >
                <CheckIcon size={16} strokeWidth={2.5} color={brandColors.outlineButtonText} />
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
                  style={{ color: brandColors.actionLink }}
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
                  style={{ backgroundColor: idx === 0 ? brandColors.primaryButtonBg : brandColors.toggleBgOff, boxShadow: idx === 0 ? brandColors.toggleGlow : 'none' }}
                >
                  <div 
                    className="toggle-knob"
                    style={{ 
                      backgroundColor: brandColors.primaryButtonText,
                      transform: idx === 0 ? 'translateX(30px)' : 'translateX(2px)'
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
