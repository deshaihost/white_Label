import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/home/Home";
import Pricing from "../pages/pricing/Pricing";
import MeetHostBoddy from "../pages/meetHostBuddy/MeetHostBoddy";
import Faqs from "../pages/faq/Faq";
import AboutUs from "../pages/aboutUs";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import InviteSignup from "../auth/inviteSignup/inviteSignup";
import NavBar from "../component/navBar/NavBar";
import Footer from "../component/footer/Footer";
import ForgotPass from "../auth/forgotPass/ForgotPass";
import ThankError from "../component/thankError/ThankError";
import ErrorImg from "../public/img/404.png";
import Properties from "../pages/properties/Properties";
import PropertyInsight from "../pages/propertyInsight/PropertyInsight";
import Subscription from "../pages/subscription/Subscription";
//import Account from "../pages/account/Account";
import SetupGuide from "../pages/setupGuide/SetupGuide";
import HostawaySetup from "../pages/setupGuide/HostawaySetup";
import Dashboard from "../pages/dashboard/Dashboard";
import StatisticsPage from "../pages/statistics/statistics";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../helper/ScrollToTop";
import QuestionnairePage from "../pages/properties/addProperties/dynamic_questionnaire/complete_questionnaire";
import CopyChatBotLink from "../pages/copyChatbotLink/CopyChatBotLink";
import TestProperty from "../pages/testProperty/TestProperty";
import Workbench from "../pages/testProperty/workbench/workbench";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import TermsofService from "../pages/termsofService/TermsofService";
import SchedulingWalkthrough from "../pages/userGuides/schedulingWalkthrough/schedulingWalkthrough";
import TipsAndTricks from "../pages/userGuides/tipsAndTricks/tipsAndTricks";
import BestPractices from "../pages/userGuides/bestPractices/bestPractices";
import ScheduleHostBuddy from "../pages/userGuides/scheduleGuide/scheduleGuide";
import NotificationsGuide from "../pages/userGuides/notificationsGuide/notificationsGuide";
import CustomizeHostBuddyGuide from "../pages/userGuides/customizeHostBuddyGuide/customizeHostBuddyGuide";
import TestingQuestions from "../pages/userGuides/testingQuestions/testingQuestions";
import ConfirmYourEmail from "../pages/confirmEmail/confirmYourEmail";
import EmailConfirmationAction from "../pages/confirmEmail/emailConfirmationAction";
import ResetPass from "../auth/resetPass/resetPass";
import AddPropertyForm from "../pages/properties/addProperties/dynamic_questionnaire/BasicInformationForm/AddPropertyForm";
import BlogLandingPage from "../blog/blogLanding";
import BlogArticle from "../blog/blogArticle";
import GetStarted from "../pages/getStarted/GetStarted";
import BecomeAnAffiliate from "../pages/becomen Affiliate/BecomeAnAffiliate";
import SoftwareSolutions from "../pages/SoftwareSolutions/SoftwareSolutions";
//----
import SettingIndex from "../pages/settings/SettingIndex";
import InboxIndex from "../pages/inbox/InboxIndex";
import GetConversationsTest from "../helper/getConversationsTest/getConversationsTest";
import ActionItemsIndex from "../pages/actionItems/ActionItemsIndex";
//import TestShowConvIndex from "../pages/testShowConversations/TestShowConvIndex";
import AiMessaging from "../pages/aiMessaging/AiMessaging";
import SmartTemplatesLanding from "../pages/smartTemplatesLanding/smartTemplatesLanding";

// PMS instructions pages
import PmsInstructionsMain from "../pages/userGuides/pmsInstructions/instructionsMain";
import GuestyInstructions from "../pages/userGuides/pmsInstructions/guesty";
import Beds24Instructions from "../pages/userGuides/pmsInstructions/beds24";
import HostawayInstructions from "../pages/userGuides/pmsInstructions/hostaway";
import LodgifyInstructions from "../pages/userGuides/pmsInstructions/lodgify";
import SmoobuInstructions from "../pages/userGuides/pmsInstructions/smoobu";
import HostifyInstructions from "../pages/userGuides/pmsInstructions/hostify";
import HospitableInstructions from "../pages/userGuides/pmsInstructions/hospitable";
import HostfullyInstructions from "../pages/userGuides/pmsInstructions/hostfully";
import OwnerRezInstructions from "../pages/userGuides/pmsInstructions/ownerrez";
import BookingSyncInstructions from "../pages/userGuides/pmsInstructions/bookingsync";
import HostbuddyForGuesty from "../pages/userGuides/hostbuddyForGuesty/HostbuddyForGuesty";


const Routing = () => {
  const location = useLocation();

  // Add rb2b profiling script to the head of the document
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement("script");
      script.id = "site-profiling";
      script.type = "text/javascript";
      //script.async = true;
      script.innerHTML = `
        !function () {
          var reb2b = window.reb2b = window.reb2b || [];
          if (reb2b.invoked) return;
          reb2b.invoked = true;
          reb2b.methods = ["identify", "collect"];
          reb2b.factory = function (method) {
            return function () {
              var args = Array.prototype.slice.call(arguments);
              args.unshift(method);
              reb2b.push(args);
              return reb2b;
            };
          };
          for (var i = 0; i < reb2b.methods.length; i++) {
            var key = reb2b.methods[i];
            reb2b[key] = reb2b.factory(key);
          }
          reb2b.load = function (key) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.id = "profiling-loaded-script";
            script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/reb2b.js.gz";
            var first = document.getElementsByTagName("script")[0];
            first.parentNode.insertBefore(script, first);
          };
          reb2b.SNIPPET_VERSION = "1.0.1";
          reb2b.load("Y4O7Z0H9V3NX");
        }();
      `;
      document.head.appendChild(script);
    };

    const addGoogleScript = () => {
      const script1 = document.createElement("script");
      script1.async = true;
      //script1.src = "https://www.googletagmanager.com/gtag/js?id=AW-16607279889";
      script1.src = "https://www.googletagmanager.com/gtag/js?id=AW-16726426864";
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16726426864');
      `;
      //gtag('config', 'AW-16607279889');
      document.head.appendChild(script2);
    };

    const addMetaPixelScript = () => {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1057311958941772');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1057311958941772&ev=PageView&noscript=1"/>
      `;
      document.head.appendChild(noscript);
    };

    // Add the scripts to the head of the document
    const existingScript = document.getElementById("site-profiling");
    const loadedScript = document.getElementById("profiling-loaded-script");
    if (!window.dataLayer) { // window.dataLayer is a global array that the Google Tag Manager uses to collect and store data. If window.dataLayer is not defined, it means the Google tracking script has not been added to the page yet. This prevents the Google tracking script from being added multiple times if the useEffect hook runs more than once.
      addGoogleScript(); // add regardless of what page we're on. We need this in the user portal so we can report conversions during checkout
    }

    // Add the rb2b script only if not already present, and only for the front pages (excluding login/register/forgotpass/changepass)
    const pathnames_to_profile = [
      "/",
      "/pricing",
      "/meet-hostbuddy",
      "/faqs",
      "/privacy-policy",
      "/termsof-service",
      "/scheduling-walkthrough",
      "/tips-and-tricks",
      "/testing-questions",
    ];
    if (pathnames_to_profile.includes(location.pathname)) {
      if (!existingScript && false) { // script adding DISABLED
        addScript();
      }
    } else {
      // When the user navigates away from the front pages, remove the rb2b script (and the other script that it loads). Don't mess with the google ads script, let it do its thing
      if (existingScript) {
        existingScript.remove();
      }
      if (loadedScript) {
        loadedScript.remove();
      }
    }

    // Add Meta Pixel script to all pages
    addMetaPixelScript();
  }, [location.pathname]);

  return (
    <div className="routes">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/reset-password" &&
        location.pathname !== "/accept-invitation" &&
        location.pathname !== "/forgot" &&
        location.pathname !== "/test-show-conversations" && <NavBar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/meet-hostbuddy" element={<MeetHostBoddy />}></Route>
        <Route path="/faqs" element={<Faqs />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/accept-invitation" element={<InviteSignup />}></Route>
        <Route path="/forgot" element={<ForgotPass />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/termsof-service" element={<TermsofService />}></Route>
        <Route path="/scheduling-walkthrough" element={<SchedulingWalkthrough />}></Route>
        <Route path="/tips-and-tricks" element={<TipsAndTricks />}></Route>
        <Route path="/best-practices" element={<BestPractices />}></Route>
        <Route path="/schedule-guide" element={<ScheduleHostBuddy />}></Route>
        <Route path="/notifications-guide" element={<NotificationsGuide />}></Route>
        <Route path="/customize-hostbuddy-guide" element={<CustomizeHostBuddyGuide />}></Route>
        <Route path="/hostbuddy-for-guesty" element={<HostbuddyForGuesty />}></Route>

        
        <Route path="/testing-questions" element={<TestingQuestions />}></Route>
        <Route path="/confirm-email" element={<ConfirmYourEmail />}></Route>
        <Route path="/email_confirmation" element={<EmailConfirmationAction />}></Route>
        <Route path="/reset-password" element={<ResetPass />}></Route>
        <Route path="/setup-guide" element={<SetupGuide />}></Route>
        <Route path="/getstarted" element={<GetStarted />}></Route>
        <Route path="/hostaway-setup" element={<HostawaySetup />}></Route>
        <Route path="/blog" element={<BlogLandingPage />}></Route>
        <Route path="/blog/:article_name" element={<BlogArticle />}></Route>

        <Route path="/pms-instructions" element={<PmsInstructionsMain />} />
        <Route path="/pms-instructions/guesty" element={<GuestyInstructions />} />
        <Route path="/pms-instructions/beds24" element={<Beds24Instructions />} />
        <Route path="/pms-instructions/hostaway" element={<HostawayInstructions />} />
        <Route path="/pms-instructions/lodgify" element={<LodgifyInstructions />} />
        <Route path="/pms-instructions/smoobu" element={<SmoobuInstructions />} />
        <Route path="/pms-instructions/hostify" element={<HostifyInstructions />} />
        <Route path="/pms-instructions/hospitable" element={<HospitableInstructions />} />
        <Route path="/pms-instructions/hostfully" element={<HostfullyInstructions />} />
        <Route path="/pms-instructions/ownerrez" element={<OwnerRezInstructions />} />
        <Route path="/pms-instructions/bookingsync" element={<BookingSyncInstructions />} />

        <Route path="/ai-messaging" element={<AiMessaging />} />
        <Route path="/smart-templates" element={<SmartTemplatesLanding />} />

        <Route path="/become-an-affiliate" element={<BecomeAnAffiliate />} />
        <Route path="/software-solutions" element={<SoftwareSolutions />} />
        <Route path="*" element={ <ThankError imgSrc={ErrorImg} text="We cannot find the page you’re looking for" /> } />
        <Route path="/become-an-affiliate" element={<BecomeAnAffiliate />} />
        <Route path="/software-solutions" element={<SoftwareSolutions />} ></Route>
        <Route path="*" element={ <ThankError imgSrc={ErrorImg} text="We cannot find the page you’re looking for" /> } />

        
        <Route
          path="/get-conversations-test"
          element={
            <ProtectedRoute>
              <GetConversationsTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property-insight"
          element={
            <ProtectedRoute>
              <PropertyInsight />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting/:section?"
          element={
            <ProtectedRoute>
              {/* <Account /> */}
              <SettingIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddPropertyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-property/:property_name"
          element={
            <ProtectedRoute>
              <QuestionnairePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox/:section?"
          element={
            <ProtectedRoute>
              <InboxIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/action-item"
          element={
            <ProtectedRoute>
              <ActionItemsIndex />
            </ProtectedRoute>
          }
        />

        <Route path="/test-property/:id" element={<TestProperty />}></Route>
        <Route path="/workbench/:property_name" element={<Workbench />}></Route>
        <Route path="/property-chat/:id" element={<CopyChatBotLink />}></Route>
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot" &&
        location.pathname !== "/accept-invitation" &&
        !location.pathname.startsWith("/inbox") &&
        location.pathname !== "/test-show-conversations" &&
        !location.pathname.startsWith("/workbench/") && <Footer />}
    </div>
  );
};

export default Routing;
