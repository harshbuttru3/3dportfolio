import React from 'react';

// This component represents the content shown inside the computer screen
// once the camera has zoomed in and transitioned to the screen view
const ScreenPortal = ({ children }) => {
  return (
    <div className="screen-portal-container">
      <div className="screen-portal">
        <div className="screen-toolbar">
          <div className="toolbar-buttons">
            <span className="toolbar-button red"></span>
            <span className="toolbar-button yellow"></span>
            <span className="toolbar-button green"></span>
          </div>
          <div className="toolbar-title">portfolio.jsx - Virtual Terminal</div>
          <div className="toolbar-spacer"></div>
        </div>
        <div className="screen-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScreenPortal; 