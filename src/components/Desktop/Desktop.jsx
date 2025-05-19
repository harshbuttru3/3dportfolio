import React, { useState, useEffect } from 'react';
import Dock from './Dock';
import DesktopIcons from './DesktopIcons';
import Window from './Window';
import Terminal from '../Terminal';
import Loader from './Loader';
import IntermediaryLoader from './IntermediaryLoader';
import { Icons } from './BasicIcons';
import './Desktop.css';

// List of applications that can be opened
const applications = {
  terminal: {
    title: 'Terminal',
    icon: Icons.terminal,
    component: Terminal,
    defaultSize: { width: 700, height: 500 }
  },
  blender: {
    title: 'Blender',
    icon: Icons.blender,
    component: () => <div className="app-content blender-content">Blender Application</div>,
    defaultSize: { width: 800, height: 600 }
  },
  browser: {
    title: 'Web Browser',
    icon: Icons.browser,
    component: () => <div className="app-content browser-content">Web Browser</div>,
    defaultSize: { width: 1000, height: 700 }
  },
  finder: {
    title: 'Finder',
    icon: Icons.finder,
    component: () => <div className="app-content finder-content">Finder</div>,
    defaultSize: { width: 800, height: 500 }
  },
  discord: {
    title: 'Discord',
    icon: Icons.discord,
    component: () => <div className="app-content discord-content">Discord</div>,
    defaultSize: { width: 900, height: 600 }
  },
  telegram: {
    title: 'Telegram',
    icon: Icons.telegram,
    component: () => <div className="app-content telegram-content">Telegram</div>,
    defaultSize: { width: 800, height: 600 }
  },
  github: {
    title: 'GitHub',
    icon: Icons.github,
    component: () => <div className="app-content github-content">GitHub</div>,
    defaultSize: { width: 900, height: 650 }
  },
  spotify: {
    title: 'Spotify',
    icon: Icons.spotify,
    component: () => <div className="app-content spotify-content">Spotify</div>,
    defaultSize: { width: 900, height: 600 }
  }
};

const Desktop = () => {
  const [loading, setLoading] = useState(true);
  const [intermediaryLoading, setIntermediaryLoading] = useState(true);
  const [openApps, setOpenApps] = useState([]); // Array of open application IDs
  const [activeApp, setActiveApp] = useState(null); // Currently focused app
  const [windowPositions, setWindowPositions] = useState({}); // Track window positions
  const [currentTime, setCurrentTime] = useState(new Date());

  console.log("Desktop rendering");

  // Update current time every minute
  useEffect(() => {
    console.log("Desktop mounted - setting up time updater");
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Show loading screens before revealing desktop
  useEffect(() => {
    console.log("Starting desktop loading sequence");
    
    // Reset timers
    let intermediaryTimer = null;
    let desktopTimer = null;
    
    // Show intermediary loader first
    setIntermediaryLoading(true);
    
    // After 2 seconds, switch to main desktop loading process
    intermediaryTimer = setTimeout(() => {
      console.log("Intermediary loading complete, starting main loader");
      setIntermediaryLoading(false);
      setLoading(true);
      
      // Then after 1 more second, complete loading
      desktopTimer = setTimeout(() => {
        console.log("Main loading complete, showing desktop");
        setLoading(false);
      }, 1000);
    }, 2000);
    
    // Cleanup function
    return () => {
      if (intermediaryTimer) clearTimeout(intermediaryTimer);
      if (desktopTimer) clearTimeout(desktopTimer);
    };
  }, []);
  
  console.log("Desktop state:", { intermediaryLoading, loading });

  // Handle opening an application
  const openApplication = (appId) => {
    console.log("Opening application:", appId);
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
    setActiveApp(appId);
  };

  // Handle closing an application
  const closeApplication = (appId) => {
    console.log("Closing application:", appId);
    setOpenApps(openApps.filter(id => id !== appId));
    if (activeApp === appId) {
      setActiveApp(openApps.length > 1 ? openApps[openApps.length - 2] : null);
    }
  };

  // Handle window focus
  const focusWindow = (appId) => {
    setActiveApp(appId);
  };

  // Handle window position update
  const updateWindowPosition = (appId, position) => {
    setWindowPositions({
      ...windowPositions,
      [appId]: position
    });
  };

  // Format the date and time
  const formatDate = () => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    
    let hours = currentTime.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    return {
      day,
      fullDate: `${date} ${month} ${year} - ${hours}:${minutes} ${ampm}`
    };
  };

  const { day, fullDate } = formatDate();

  return (
    <div 
      className="desktop-container" 
      style={{ 
        opacity: 1,
        zIndex: 9000
      }}
    >
      {intermediaryLoading ? (
        <IntermediaryLoader />
      ) : loading ? (
        <Loader />
      ) : (
        <>
          <div className="desktop-background">
            {/* Desktop background with purple cyberpunk theme */}
          </div>

          <DesktopIcons openApplication={openApplication} />
          
          {/* Render open application windows */}
          {openApps.map(appId => {
            const app = applications[appId];
            return (
              <Window
                key={appId}
                appId={appId}
                title={app.title}
                iconComponent={app.icon}
                isActive={activeApp === appId}
                onClose={() => closeApplication(appId)}
                onFocus={() => focusWindow(appId)}
                onPositionUpdate={(position) => updateWindowPosition(appId, position)}
                defaultPosition={windowPositions[appId]}
                defaultSize={app.defaultSize}
              >
                <app.component onClose={() => closeApplication(appId)} />
              </Window>
            );
          })}

          <Dock 
            applications={applications} 
            openApps={openApps}
            openApplication={openApplication}
            activeApp={activeApp}
          />
          
          {/* Desktop footer showing time/date - similar to your screenshot */}
          <div className="desktop-footer">
            <div className="desktop-time">{day}</div>
            <div className="desktop-date">{fullDate}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Desktop; 