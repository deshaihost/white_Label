import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home/Home";
import Footer from "./component/footer/Footer";
import NavBar from "./component/navBar/NavBar";
import MeetHostBoddy from "./pages/meetHostBuddy/MeetHostBoddy";
import Pricing from "./pages/pricing/Pricing";
import FAQs from "./pages/faqs/FAQs";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/meetHostBuddy" element={<MeetHostBoddy />}></Route>
          <Route path="/faqs" element={<FAQs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
