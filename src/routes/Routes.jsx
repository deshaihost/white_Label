import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";
import Pricing from "../pages/pricing/Pricing";
import MeetHostBoddy from "../pages/meetHostBuddy/MeetHostBoddy";
import Faqs from "../pages/faq/Faq";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import NavBar from "../component/navBar/NavBar";
import Footer from "../component/footer/Footer";
import ForgotPass from "../auth/forgotPass/ForgotPass";
import ThankError from "../component/thankError/ThankError";
import ErrorImg from "../public/img/404.png";
import Properties from "../pages/properties/Properties";
import PropertyInsight from "../pages/propertyInsight/PropertyInsight";
import Subscription from "../pages/subscription/Subscription";
import Account from "../pages/account/Account";
import SetupGuide from "../pages/setupGuide/SetupGuide";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../helper/ScrollToTop";
import AddPropertiesIndex from "../pages/properties/addProperties/AddPropertiesIndex";
import { ParamsGet } from "../helper/Authorized";
import CopyChatBotLink from "../pages/copyChatbotLink/CopyChatBotLink";
import TestProperty from "../pages/testProperty/TestProperty";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import TermsofService from "../pages/termsofService/TermsofService";

const Routing = () => {
  const location = useLocation();
  return (
    <div className="routes">
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot" && <NavBar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/meet-hostbuddy" element={<MeetHostBoddy />}></Route>
        <Route path="/faqs" element={<Faqs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot" element={<ForgotPass />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/termsof-service" element={<TermsofService />}></Route>
        <Route
          path="*"
          element={
            <ThankError
              imgSrc={ErrorImg}
              text="We Can not find the page you’re looking for "
            />
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
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property-insight/:id"
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
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup-guide"
          element={
            <ProtectedRoute>
              <SetupGuide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-properties/:id"
          element={
            <ProtectedRoute>
              <AddPropertiesIndex />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-properties"
          element={
            <ProtectedRoute>
              <AddPropertiesIndex />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/meet-hostbuddy/:id" element={<MeetHostBoddy />}></Route> */}
        <Route path="/test-property/:id" element={<TestProperty />}></Route>
        <Route
          path="/property-chat/:id"
          element={<CopyChatBotLink />}
        ></Route>
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot" && <Footer />}
    </div>
  );
};

export default Routing;
