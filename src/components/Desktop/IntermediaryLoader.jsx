import React, { useEffect, useState } from 'react';
import './Desktop.css';

const IntermediaryLoader = ({ className = '' }) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        const newDots = prev.length >= 3 ? '' : prev + '.';
        return newDots;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`intermediary-loader ${className}`}>
      <div className="intermediary-loader-content">
        <div className="intermediary-pulse"></div>
        <div className="intermediary-text">
          <span className="cyber-text">ENTERING SYSTEM</span>
          <span className="dots">{dots}</span>
        </div>
        <div className="intermediary-message">Please wait while the desktop environment loads</div>
      </div>
    </div>
  );
};

export default IntermediaryLoader;