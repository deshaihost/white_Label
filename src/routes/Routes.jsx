import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/home/Home';
import Pricing from '../pages/pricing/Pricing';
import MeetHostBoddy from '../pages/meetHostBuddy/MeetHostBoddy';
import FAQs from '../pages/faqs/FAQs';
import Login from '../auth/login/Login';
import Signup from '../auth/signup/Signup';
import NavBar from '../component/navBar/NavBar';
import Footer from '../component/footer/Footer';
import ForgotPass from '../auth/forgotPass/ForgotPass';

const Routing = () => {
  const location = useLocation();
  return (
      
    <div className="routes">
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot' && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/meetHostBuddy" element={<MeetHostBoddy />}></Route>
        <Route path="/faqs" element={<FAQs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot" element={<ForgotPass />}></Route>
      </Routes>
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot' && <Footer />}
    </div>
  );
}

export default Routing;