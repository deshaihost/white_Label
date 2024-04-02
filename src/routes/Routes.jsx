import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/home/Home';
import Pricing from '../pages/pricing/Pricing';
import MeetHostBoddy from '../pages/meetHostBuddy/MeetHostBoddy';
import Faqs from '../pages/faq/Faq';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';
import NavBar from '../component/navBar/NavBar';
import Footer from '../component/footer/Footer';
import ForgotPass from '../auth/forgotPass/ForgotPass';
import ThankError from '../component/thankError/ThankError';
import ErrorImg from '../public/img/404.png'
import Properties from '../pages/properties/Properties';
import PropertyInsight from '../pages/propertyInsight/PropertyInsight';
import Subscription from '../pages/subscription/Subscription';
import Account from '../pages/account/Account';
import SetupGuide from '../pages/setupGuide/SetupGuide';
import Dashboard from '../pages/dashboard/Dashboard';
const Routing = () => {
  const location = useLocation();
  return (
      
    <div className="routes">
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot' && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/meet-hostbuddy" element={<MeetHostBoddy />}></Route>
        <Route path="/faqs" element={<Faqs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot" element={<ForgotPass />}></Route>
        <Route path="*" element={<ThankError imgSrc={ErrorImg} text="We Can not find the page you’re looking for " />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/properties" element={<Properties />}></Route>
        <Route path="/property-insight" element={<PropertyInsight />}></Route>
        <Route path="/subscription" element={<Subscription />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/setup-guide" element={<SetupGuide />}></Route>

      </Routes>
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot' && <Footer />}
    </div>
  );
}

export default Routing;