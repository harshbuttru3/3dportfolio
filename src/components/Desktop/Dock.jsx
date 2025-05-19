import React from 'react';
import './Desktop.css';
import { Icons } from './BasicIcons';

const Dock = ({ applications, openApps, openApplication, activeApp }) => {
  // List of apps to show in the dock - match with your screenshot
  const dockApps = [
    'finder',
    'browser',
    'terminal',
    'blender',
    'discord',
    'telegram',
    'github',
    'spotify'
  ];

  // Get the icon for an app from the Icons object
  const getIcon = (appId) => {
    // First check if we have a specific icon in the Icons object
    if (Icons[appId]) {
      return Icons[appId];
    }
    
    // If not, check if the app object has an icon
    if (applications[appId] && applications[appId].icon) {
      return applications[appId].icon;
    }
    
    // Fallback to browser icon
    return Icons.browser;
  };

  return (
    <div className="dock">
      {dockApps.map(appId => {
        const app = applications[appId];
        const isOpen = openApps.includes(appId);
        const isActive = activeApp === appId;
        
        return (
          <div 
            key={appId}
            className={`dock-item ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`}
            onClick={() => openApplication(appId)}
          >
            <div className="dock-icon">
              {getIcon(appId)}
            </div>
            {isOpen && <div className="dock-dot"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default Dock; 