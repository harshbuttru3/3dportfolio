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

  // Map icon keys to the Icons component
  const getIcon = (appId) => {
    switch(appId) {
      case 'terminal':
        return Icons.terminal;
      case 'browser':
        return Icons.browser;
      case 'finder':
        return Icons.finder;
      case 'blender':
        return Icons.blender;
      case 'discord':
        return Icons.discord;
      case 'telegram':
        return Icons.telegram;
      case 'github':
        return Icons.github;
      case 'spotify':
        return Icons.spotify;
      default:
        return Icons.browser; // Default fallback
    }
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