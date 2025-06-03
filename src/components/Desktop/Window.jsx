import React, { useState, useEffect, useRef } from 'react';
import './Desktop.css';

const Window = ({ 
  appId, 
  title, 
  iconComponent, 
  children, 
  isActive, 
  onClose, 
  onFocus,
  onMinimize, // Add this prop
  isMinimized, // Add this prop
  onPositionUpdate,
  defaultPosition,
  defaultSize = { width: 800, height: 600 }
}) => {
  const [position, setPosition] = useState(defaultPosition || { x: 50 + Math.random() * 100, y: 50 + Math.random() * 50 });
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  
  const windowRef = useRef(null);
  
  // Handle click inside window to focus
  const handleWindowClick = (e) => {
    if (!isActive) {
      onFocus();
    }
  };
  
  // Start dragging the window
  const handleDragStart = (e) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  };
  
  // Start resizing the window
  const handleResizeStart = (e) => {
    if (isMaximized) return;
    
    setIsResizing(true);
    e.stopPropagation();
    e.preventDefault();
  };
  
  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const rect = windowRef.current.getBoundingClientRect();
        const newWidth = Math.max(300, e.clientX - rect.left);
        const newHeight = Math.max(200, e.clientY - rect.top);
        
        setSize({ width: newWidth, height: newHeight });
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Update parent component with new position
        onPositionUpdate(position);
      }
      
      if (isResizing) {
        setIsResizing(false);
      }
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, onPositionUpdate]);
  
  // Toggle maximize state
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  
  // Add minimize handler
  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) {
      onMinimize(appId);
    }
  };

  // Calculate window styles based on state
  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100% - 60px)', // Leave space for dock
        transform: 'none',
        borderRadius: 0
      }
    : {
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: isMinimized 
          ? 'scale(0.7) translateY(100vh)' 
          : isDragging 
            ? 'scale(1.02)' 
            : 'scale(1)',
        opacity: isMinimized ? 0 : 1,
        pointerEvents: isMinimized ? 'none' : 'all',
        transition: isDragging 
          ? 'none' 
          : 'transform 0.3s cubic-bezier(0.2, 0.82, 0.2, 1), opacity 0.3s cubic-bezier(0.2, 0.82, 0.2, 1)'
      };
  
  return (
    <div 
      ref={windowRef}
      className={`window ${isActive ? 'window-active' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={windowStyle}
      onClick={handleWindowClick}
    >
      <div className="window-header" onMouseDown={handleDragStart}>
        <div className="window-controls">
          <button className="window-control window-close" onClick={onClose}></button>
          <button className="window-control window-minimize" onClick={handleMinimize}></button>
          <button className="window-control window-maximize" onClick={toggleMaximize}></button>
        </div>
        
        <div className="window-title">
          <div className="window-icon-small">
            {iconComponent}
          </div>
          <span>{title}</span>
        </div>
        
        <div className="window-header-spacer"></div>
      </div>
      
      <div className="window-content">
        {children}
      </div>
      
      {!isMaximized && (
        <div 
          className="window-resize-handle"
          onMouseDown={handleResizeStart}
        ></div>
      )}
    </div>
  );
};

export default Window;