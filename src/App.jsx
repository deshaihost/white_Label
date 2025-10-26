import './App.css';
import Routing from "./routes/Routes";
import { WhiteLabelLogoProvider } from "./helper/WhiteLabelLogoContext";
import { WhiteLabelCssProvider } from "./helper/WhiteLabelCssContext";

function App() {
  return (
    <WhiteLabelCssProvider>
      <WhiteLabelLogoProvider>
        <div className="App">
          <Routing />
        </div>
      </WhiteLabelLogoProvider>
    </WhiteLabelCssProvider>
  );
}

export default App;
