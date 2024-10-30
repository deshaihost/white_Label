import React, { useEffect } from 'react';
import './bestPractices.css';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

const ScheduleHostBuddy = () => {
  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Schedule HostBuddy - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/schedule-hostbuddy" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Schedule HostBuddy</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Schedule HostBuddy's coverage to fit your exact needs</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        
                        <div className="step-box">
                          <h4>Ready for HostBuddy to take the wheel? Learn how to schedule HostBuddy so you can sit back and relax.</h4>
                          <p>Think of HostBuddy as your most dedicated employee, available 24/7, 365 days a year! On the properties page, you’ll find a calendar button next to each listing—click this to start scheduling.</p>
                          <p>To offer flexibility, we provide two scheduling options:</p>
                          <ul>
                            <li>Weekly Schedule: A recurring schedule that repeats weekly.</li>
                            <li>One-off Shifts: Custom shifts outside of the weekly schedule.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="weekly-schedule">
                          <h4>Weekly Schedule</h4>
                          <p>Select the “Schedule” view of your calendar.</p>
                          <p>Tap “Add” at the bottom right of your screen.</p>
                          <p>Select the reservation stage(s) for HostBuddy to respond to (default is all stages).</p>
                          <p>Choose the day(s) of the week for this schedule. Create multiple schedules for different days if needed.</p>
                          <p>Set your start and end times.</p>
                          <p>Click “Apply.”</p>
                          <p>Add any additional days and coverage hours to this schedule if desired.</p>
                          <h5>Special Notes:</h5>
                          <ul>
                            <li>For 24/7 coverage, select all days of the week and set HostBuddy from 12:00 am - 11:59 pm.</li>
                            <li>HostBuddy remains offline until scheduled to be on.</li>
                            <li>If HostBuddy is offline, you will still receive action items and notifications.</li>
                            <li>Even when HostBuddy is offline, you can use the messaging inbox and Smart Templates/Upsells. This is great for testing responses in the inbox using our AI assist tool before scheduling.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="one-off-shifts">
                          <h4>One-Off Shifts (Calendar View)</h4>
                          <p>The Calendar View allows for single-instance schedule adjustments:</p>
                          <p>Navigate to the calendar by clicking “Calendar” at the top right.</p>
                          <p>Click “Add.”</p>
                          <p>Select applicable reservation phases.</p>
                          <p>Choose your status (On to activate coverage, Off to temporarily disable).</p>
                          <p>Set your start and end dates and times.</p>
                          <p>Click “Apply.”</p>
                          <h5>Special Notes:</h5>
                          <ul>
                            <li>Calendar schedules override the weekly schedule.</li>
                            <li>The start time corresponds to the start date and end time corresponds to the end date.</li>
                          </ul>
                        </div>

                        <div className="step-box section" id="copy-schedule">
                          <h4>Copy Schedule to Other Properties</h4>
                          <p>To copy the schedule to other properties, click ‘Copy to Other Properties.’</p>
                          <p>Choose specific properties or “Select All.”</p>
                          <p>Set time zone behavior (with explanations provided when you click each option). Time zones are based on property location or the Location/Region settings in your Account Settings.</p>
                        </div>

                        <div className="step-box section" id="manual-override">
                          <h4>Manual Override</h4>
                          <p>To turn HostBuddy off for a specific property, click “Stop” next to that property.</p>
                          <p>To turn HostBuddy off for all properties, click “Stop All” at the top right of the properties page.</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHostBuddy;