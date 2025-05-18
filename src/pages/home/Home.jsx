import React, { useState, useEffect, useRef } from "react";
import Banner from "./banner/Banner";
import Introduction from "./introduction/introduction";
import Features from "./features/Features";
import Works from "./works/Works";
import Plans from "./plans/Plans";
//import DemoVideoSection from "./demoVideoSection/demoVideoSection";
import TryItOutCTA from "./tryItOut/tryItOut";
import WelcomeSection from "./welcomeSection/WelcomeSection";
import AccountNotifBanner from "../../component/accountNotifBanner/accountNotifBanner";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loadDemoVideo, setLoadDemoVideo] = useState(false);
  const worksRef = useRef(null);
  const demoVideoRef = useRef(null);

  {
    /* Removed demo video section for now
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
  */
  }

  return (
    <div className="home">
      <Helmet>
        <title>HostBuddy AI - Automate Short-Term Rental Messaging</title>
        <meta name="title" content="HostBuddy AI - Automate Short-Term Rental Messaging"/>
        <meta name="description" content="Industry-leading AI messaging for short-term rental hosts. Automate everything: messaging, upsells, operations & much more. Trusted by top property managers."/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.hostbuddy.ai/" />
        <meta property="og:title" content="HostBuddy AI - Automate Short-Term Rental Messaging"/>
        <meta property="og:description" content="Industry-leading AI messaging for short-term rental hosts. Automate everything: messaging, upsells, operations & much more. Trusted by top property managers."/>
        <meta property="og:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png"/>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.hostbuddy.ai/" />
        <meta property="twitter:title" content="HostBuddy AI - Automate Short-Term Rental Messaging"/>
        <meta property="twitter:description" content="Industry-leading AI messaging for short-term rental hosts. Automate everything: messaging, upsells, operations & much more. Trusted by top property managers."/>
        <meta property="twitter:image" content="https://i.postimg.cc/05KJThn5/host-buddy-metaimg.png"/>
        <link rel="canonical" href="https://www.hostbuddy.ai/" />
      </Helmet>

      {/*
      <div style={{padding:'0 20px', marginTop:'20px'}}>
        <AccountNotifBanner message={<>Join us on January 21st at 10am PST for our joint webinar with OwnerRez! <a style={{marginLeft:'8px'}} href="https://www.crowdcast.io/c/webinar-ownerrez-hostbuddy-ai-automating-guest-communication-with-ai">Register Now</a></>}/>
      </div>
      */}
      
      <Banner />
      {/* <Introduction /> */}
      <WelcomeSection />
      <div className="pt-5" ref={worksRef}>
        <Works />
      </div>
      <TryItOutCTA sourceMsg={"Home bage bottom cta"} />
      {/* <Features /> */}
      {/*
      <div ref={demoVideoRef}>
        <DemoVideoSection load={loadDemoVideo} />
      </div>
      */}
      <Plans />
    </div>
  );
};

export default Home;
