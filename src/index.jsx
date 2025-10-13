import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "./redux/stores"; 
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

// Import App component properly
import App from "./App";

// Print the domain name when the application is launched
const domainName = window.location.hostname;
const fullDomain = window.location.host; // includes port if present
console.log('Domain Name:', fullDomain);
console.log('Application launched on:', fullDomain);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={configureStore({})}>
      <BrowserRouter>
        <ReactNotifications />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// reportWebVitals();
