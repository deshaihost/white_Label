import React, {  useEffect } from 'react'
import './schedulingWalkthrough.css';
import { Helmet } from 'react-helmet';
const SchedulingWalkthrough = () => {
  // const [activeLink, setActiveLink] = useState("");
  // const handleClickScroll = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     setActiveLink(id);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".step-box.section");
      sections.forEach((section) => {
        const bounding = section.getBoundingClientRect();
        if (bounding.top <= 20 && bounding.bottom >= 50) {
          // setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="account-main">
        <Helmet>
          <title>Calendar Guide - HostBuddy AI</title>
          <link rel="canonical" href="https://www.hostbuddy.ai/scheduling-walkthrough" />
        </Helmet>
        <div className="container">
          <div className="banner-heading">
            <h2>Hostbuddy Calendar Guide</h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="account-container blur-background-top-right">
                <div className="account_heading">
                  <h3>Hostbuddy Calendar Guide</h3>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="guide-steps">
                        <div className="step-box">
                          <h4>Welcome to Hostbuddy AI!</h4>
                          <p><em>Our calendar features two distinct tools for scheduling Hostbuddy across your properties. Below are detailed explanations of each feature.</em></p>
                        </div>
                        <div className="step-box section" id="step1">
                          <h4>Schedule View</h4>
                          <p>
                            This view is the primary tool for scheduling Hostbuddy. Use it to set a recurring weekly schedule that Hostbuddy will consistently follow to support your properties. Please follow these steps to add a recurring schedule:
                          </p>
                          <ol>
                            <li>
                              Click the calendar icon below your property name.
                            </li>
                            <li>
                              Navigate to “Schedule” in the top right corner.
                            </li>
                            <li>
                              Select “Add.”
                            </li>
                            <li>
                              Choose which reservation phases you would like the scheduled times to apply to.
                            </li>
                            <li>
                              Select the day(s) of the week you want to schedule Hostbuddy for.
                            </li>
                            <li>
                              Set your Start and End times for each selected day (Note: If you need Hostbuddy to cover communications overnight, create two separate shifts: one from the start of a day to 11:59 PM, and another from 12 AM the following day to your desired end time).
                            </li>
                            <li>
                              Click “Apply.”
                            </li>
                            <li>
                              To apply this schedule to all of your properties, select “Copy to All Properties.”
                            </li>
                            <li>
                              Repeat these steps for any other schedules you wish to create.
                            </li>
                          </ol>
                        </div>
                        <div className="step-box section" id="step2">
                        <h4>Month View</h4>
                          <p>
                            This view is ideal for scheduling one-off shifts or downtime for Hostbuddy. Follow these steps to add a single scheduled shift:
                          </p>
                          <ol>
                            <li>
                              Click the calendar icon and navigate to the “Month” selection in the top right corner.
                            </li>
                            <li>
                              Select “Add.”
                            </li>
                            <li>
                              Choose which reservation phases the scheduled times should apply to.
                            </li>
                            <li>
                              Set your desired status for Hostbuddy (setting to 'Off' will override any recurring schedules if you decide to cover communication during a previously scheduled Hostbuddy shift).
                            </li>
                            <li>
                              Choose your start and end dates, along with your desired start and end times (Note: For overnight communications, create two separate shifts: one from the start of a day to 11:59 PM, and another from 12 AM the following day to your desired end time).
                            </li>
                            <li>
                              Click “Apply.”
                            </li>
                            <li>
                              To extend this schedule to all of your properties, select “Copy to All Properties.”
                            </li>
                            <li>
                              Repeat these steps for any other unique schedules you wish to set up.
                            </li>
                          </ol>
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

export default SchedulingWalkthrough;
