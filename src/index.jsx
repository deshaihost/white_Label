import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "./redux/stores"; 
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { HelmetProvider } from 'react-helmet-async';

// Import App component properly
import App from "./App";

// Print the domain name when the application is launched
const domainName = window.location.hostname;
const fullDomain = window.location.host; // includes port if present
console.log('='.repeat(60));
console.log('🌐 APPLICATION LAUNCHED');
console.log('Domain Name:', fullDomain);
console.log('Hostname:', domainName);
console.log('Full URL:', window.location.href);
console.log('='.repeat(60));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={configureStore({})}>
        <BrowserRouter>
          <ReactNotifications />
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// reportWebVitals();
