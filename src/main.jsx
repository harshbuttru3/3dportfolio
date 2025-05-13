import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create the root only once
const rootElement = document.getElementById('root');

// Check if the root element already has a React root attached
// This helps prevent the "already been passed to createRoot()" error
if (!rootElement._reactRootContainer) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 