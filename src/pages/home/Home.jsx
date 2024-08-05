import React, { useState, useEffect, useRef } from "react";
import Banner from "./banner/Banner";
import Introduction from "./introduction/introduction";
import Features from "./features/Features";
import Works from "./works/Works";
import Plans from "./plans/Plans";
import DemoVideoSection from "./demoVideoSection/demoVideoSection";
import TryItOutCTA from "./tryItOut/tryItOut";
import WelcomeSection from "./welcomeSection/WelcomeSection";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loadDemoVideo, setLoadDemoVideo] = useState(false);
  const worksRef = useRef(null);
  const demoVideoRef = useRef(null);

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !loadDemoVideo) {
              setLoadDemoVideo(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      ); // Load the demo video when 25% of an observed section has been scrolled into view

      if (worksRef.current) {
        observer.observe(worksRef.current);
      } // Observe the "How It Works" section, so we can load the vid early when the user is scrolling down on their way to it
      if (demoVideoRef.current) {
        observer.observe(demoVideoRef.current);
      } // Also observe the demo video section itself, in case the user somehow jumps to it & skips "how it works" section
      return () => observer.disconnect();
    } else {
      setLoadDemoVideo(true); // if for some reason the browser doesn't support IntersectionObserver, just load the video right away
    }
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/" />
      </Helmet>
      <Banner />
      <Introduction />
      <div ref={worksRef}>
        <Works />
      </div>
      <TryItOutCTA />
      {/* <Features /> */}
      <div ref={demoVideoRef}>
        <DemoVideoSection load={loadDemoVideo} />
      </div>
      <Plans />
      <div>
        <WelcomeSection />
      </div>
    </div>
  );
};

export default Home;
