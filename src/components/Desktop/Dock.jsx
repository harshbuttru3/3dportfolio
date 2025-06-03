import React, { useState, useEffect } from 'react';
import './Desktop.css';

const DockContextMenu = ({ x, y, app, isOpen, onClose, onMinimize, onMaximize }) => {
  return (
    <div 
      className="dock-context-menu"
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translateY(-100%)', // Position above click point
        zIndex: 10000,
      }}
      onClick={(e) => e.stopPropagation()} // Prevent immediate closing
    >
      <div className="dock-context-menu-title">
        <div className="dock-context-menu-icon">{app.icon}</div>
        <span>{app.title}</span>
      </div>
      <div className="dock-context-menu-options">
        {isOpen ? (
          <>
            <div onClick={onMinimize}>Minimize</div>
            <div onClick={onMaximize}>Maximize</div>
            <div onClick={onClose}>Close</div>
          </>
        ) : (
          <div onClick={onMaximize}>Open</div>
        )}
      </div>
    </div>
  );
};

const Dock = ({ 
  applications, 
  openApps, 
  minimizedApps,
  dockApps,
  openApplication, 
  activeApp,
  closeApplication,
  handleMinimize,
  handleMaximize 
}) => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, appId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const app = applications[appId];
    const isOpen = openApps.includes(appId);
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      app,
      appId,
      isOpen
    });
  };

  // Close context menu when clicking outside
  const handleGlobalClick = (e) => {
    if (contextMenu) {
      setContextMenu(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [contextMenu]);

  return (
    <>
      <div className="dock">
        {dockApps.map(appId => {
          const app = applications[appId];
          const isOpen = openApps.includes(appId);
          const isActive = activeApp === appId;
          const isMinimized = minimizedApps.includes(appId);
          
          return (
            <div 
              key={appId}
              className={`dock-item ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
              onClick={() => openApplication(appId)}
              onContextMenu={(e) => handleContextMenu(e, appId)}
              data-app-id={appId}
            >
              <div className="dock-icon">
                {app.icon}
              </div>
              {isOpen && <div className="dock-dot"></div>}
            </div>
          );
        })}
      </div>

      {contextMenu && (
        <DockContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          app={contextMenu.app}
          isOpen={contextMenu.isOpen}
          onClose={() => {
            closeApplication(contextMenu.appId);
            setContextMenu(null);
          }}
          onMinimize={() => {
            handleMinimize(contextMenu.appId);
            setContextMenu(null);
          }}
          onMaximize={() => {
            openApplication(contextMenu.appId);
            setContextMenu(null);
          }}
        />
      )}
    </>
  );
};

export default Dock;