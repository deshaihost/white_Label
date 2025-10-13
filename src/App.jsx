import './App.css';
import Routing from "./routes/Routes";
import { WhiteLabelLogoProvider } from "./helper/WhiteLabelLogoContext";

function App() {
  return (
    <WhiteLabelLogoProvider>
      <div className="App">
        <Routing />
      </div>
    </WhiteLabelLogoProvider>
  );
}

export default App;
