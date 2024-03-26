import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./component/footer/Footer";
import NavBar from "./component/navBar/NavBar";
import MeetHostBoddy from "./pages/meetHostBuddy/MeetHostBoddy";
import Pricing from "./pages/pricing/Pricing";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/meetHostBuddy" element={<MeetHostBoddy />}></Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
