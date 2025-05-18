import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Prevent issues with strict mode creating duplicate roots
const rootElement = document.getElementById('root');

// Clear any existing content to prevent React warnings
if (rootElement._reactRootContainer) {
  console.log('Removing existing React root');
  rootElement.innerHTML = '';
}

// Create the React root directly
const root = ReactDOM.createRoot(rootElement);

// Render without strict mode to prevent duplicate rendering
root.render(<App />); 