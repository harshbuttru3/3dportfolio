import React, { useEffect, useState } from 'react';
import './Desktop.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing system...');

  useEffect(() => {
    console.log("Loader mounted, starting animation");
    
    // Start with a lower initial delay to make loading feel faster
    let animationSpeed = 150; // ms between updates
    
    // Simulate loading progress with increasing speed as we get closer to 100%
    const interval = setInterval(() => {
      setProgress(prev => {
        // Calculate the new progress - increase speed as we get closer to 100%
        let increment = Math.random() * 5 + (prev > 80 ? 10 : 5);
        const newProgress = prev + increment;
        
        // Once we're near completion, speed up even more
        if (prev > 90) {
          animationSpeed = 100;
        } else if (prev > 70) {
          animationSpeed = 120;
        }
        
        // Log progress
        if (Math.floor(newProgress) % 10 === 0 && Math.floor(prev) % 10 !== 0) {
          console.log(`Loading progress: ${Math.floor(newProgress)}%`);
        }
        
        // If we're done, clean up the interval
        if (newProgress >= 100) {
          console.log("Loader complete");
          clearInterval(interval);
          clearInterval(textInterval);
          return 100;
        }
        
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, animationSpeed);

    // Change loading text based on progress
    const textInterval = setInterval(() => {
      if (progress < 20) {
        setLoadingText('Initializing system...');
      } else if (progress < 40) {
        setLoadingText('Loading core modules...');
      } else if (progress < 60) {
        setLoadingText('Establishing neural connections...');
      } else if (progress < 80) {
        setLoadingText('Calibrating interface...');
      } else {
        setLoadingText('Finalizing startup sequence...');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="cyber-text">INITIALIZING</span>
        </div>
        
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        
        <div className="loader-text">
          {loadingText}
          <span className="loader-percentage">{Math.floor(progress)}%</span>
        </div>
        
        <div className="loader-glitch-text">SYSTEM.BOOT_SEQUENCE</div>
      </div>
    </div>
  );
};

export default Loader; 