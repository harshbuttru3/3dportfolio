import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import components
import Scene from './components/Scene';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Terminal from './components/Terminal';
import ScreenPortal from './components/ScreenPortal';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [inScreenView, setInScreenView] = useState(false);
  const appRef = useRef(null);
  const canvasRef = useRef(null);
  const htmlRef = useRef(null);

  // Update when scroll state changes
  useEffect(() => {
    console.log("Scroll state changed to:", isScrollEnabled);
    
    // Force update by triggering resize event
    if (isScrollEnabled) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [isScrollEnabled]);

  // Monitor scroll position to determine when to transition to screen view
  useEffect(() => {
    const handleScroll = () => {
      // Calculate normalized scroll position (0 to 1)
      const scrollPos = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      // When scroll is at 40% or more, transition to screen view
      if (scrollPos > 0.4 && !inScreenView) {
        setInScreenView(true);
      } 
      // When scrolling back up to less than 30%, exit screen view
      else if (scrollPos < 0.3 && inScreenView) {
        setInScreenView(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inScreenView]);

  useEffect(() => {
    console.log("App mounted");
    
    // Clean up any existing ScrollTrigger instances to prevent duplication
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Important: Add a slight delay to ensure DOM is ready before checking sections
    const setupScrollAnimation = () => {
      // Setup animations when component mounts
      console.log("Setting up scroll animations");
      console.log("App ref exists:", !!appRef.current);
      console.log("HTML sections exist:", document.querySelectorAll('section').length);
      
      const sections = document.querySelectorAll('section');
      console.log("Found sections:", sections.length);
      
      // Log each section found for debugging
      sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section.classList, section.innerHTML.substring(0, 50) + '...');
      });
      
      if (sections.length === 0 && htmlRef.current) {
        console.log("Using htmlRef to find sections");
        // Try to find sections within the Scroll html component
        const scrollSections = htmlRef.current.querySelectorAll('section');
        console.log("Found scroll sections:", scrollSections.length);
      }
      
      sections.forEach((section) => {
        const elements = section.querySelectorAll('.hidden');
        console.log(`Section ${sections.indexOf(section)} has ${elements.length} hidden elements`);
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          onEnter: () => {
            console.log("Section entered view:", sections.indexOf(section));
            elements.forEach((el) => {
              el.classList.add('show');
            });
          }
        });
      });

      // Force a refresh of ScrollTrigger
      ScrollTrigger.refresh();
    };
    
    // Add a delay to ensure DOM is ready
    setTimeout(setupScrollAnimation, 500);
    
    // Make sure the page is scrollable
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Toggle function for Scene to call
  const toggleScrollEnabled = () => {
    console.log("Toggling scroll state from App");
    setIsScrollEnabled(prev => !prev);
    
    // Force ScrollControls to update immediately
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 10);
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  // Function to communicate screen view state to Scene
  const toggleScreenView = (state) => {
    setInScreenView(state);
  };

  return (
    <div ref={appRef} className="app">
      <div className="overlay"></div>
      
      {/* 3D Canvas - Hidden when in screen view mode */}
      {!inScreenView && (
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1
          }}
          onCreated={state => {
            console.log("Canvas created:", state.gl ? "GL Ready" : "No GL");
            // Store canvas state in window to prevent duplicate creation
            if (!window._canvasState) {
              window._canvasState = state;
            }
          }}
        >
          <Suspense fallback={null}>
            <ScrollControls 
              pages={5} // Number of pages
              damping={0.4} // Smoother scrolling
              distance={1} // Page size
              enabled={isScrollEnabled} // Enable/disable based on state
              infinite={false} // Disable infinite scrolling
            >
              <Scene 
                toggleTerminal={toggleTerminal} 
                toggleScrollEnabled={toggleScrollEnabled}
                isScrollEnabled={isScrollEnabled}
                toggleScreenView={toggleScreenView}
                inScreenView={inScreenView}
              />
              <Scroll ref={htmlRef} html style={{ width: '100%', overflow: 'hidden', opacity: 0 }}>
                {/* These sections are just for scroll depth, but aren't visible */}
                <section style={{ height: '100vh' }}></section>
                <section style={{ height: '100vh' }}></section>
                <section style={{ height: '100vh' }}></section>
                <section style={{ height: '100vh' }}></section>
                <section style={{ height: '100vh' }}></section>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      )}
      
      {/* Screen Portal View - Only shown when in screen view mode */}
      {inScreenView && (
        <ScreenPortal>
          <div className="screen-content-wrapper">
            <IntroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </div>
        </ScreenPortal>
      )}

      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      
      {/* Improved scroll indicator with css animation - only shown in 3D view */}
      {isScrollEnabled && !inScreenView && (
        <div className="scroll-indicator">
          Scroll down to explore
        </div>
      )}
      
      {/* Back button when in screen view */}
      {inScreenView && (
        <button 
          className="back-button"
          onClick={() => {
            setInScreenView(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to 3D View
        </button>
      )}
    </div>
  );
};

export default App; 