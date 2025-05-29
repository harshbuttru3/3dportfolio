import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Scene from './components/Scene';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Terminal from './components/Terminal';
import ScreenPortal from './components/ScreenPortal';
import Desktop from './components/Desktop/Desktop';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [inScreenView, setInScreenView] = useState(false);
  const [inDesktopView, setInDesktopView] = useState(false);
  const [showEnterDesktop, setShowEnterDesktop] = useState(false);
  const appRef = useRef(null);
  const canvasRef = useRef(null);
  const htmlRef = useRef(null);

  // Only update when threshold is crossed
  const handleScrollOffsetChange = (offset) => {
    setShowEnterDesktop(offset > 0.7); // Show button when scrollOffset > 0.7
  };

  // Update when scroll state changes
  useEffect(() => {
    console.log("Scroll state changed to:", isScrollEnabled);
    
    // Force update by triggering resize event
    if (isScrollEnabled) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [isScrollEnabled]);

  // Monitor scroll position to update the scrollProgress state
  useEffect(() => {
    console.log("Setting up scroll monitor effect");
    
    const handleScroll = () => {
      // Calculate normalized scroll position (0 to 1)
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return; // Prevent division by zero
      
      const scrollPos = window.scrollY / totalHeight;
      setScrollProgress(scrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial check
    setTimeout(handleScroll, 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        // console.log(`Section ${sections.indexOf(section)} has ${elements.length} hidden elements`);
        
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

  const enterDesktopView = () => {
    setInDesktopView(true);
    setInScreenView(false);
  };

  const exitDesktopView = () => {
    setInDesktopView(false);
    setInScreenView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleScreenView = (state) => {
    setInScreenView(state);
  };

  return (
    <div ref={appRef} className="app">
      <div className="overlay"></div>
      {!inScreenView && !inDesktopView && (
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
        >
          <Suspense fallback={null}>
            <ScrollControls
              pages={5}
              damping={0.4}
              distance={1}
              enabled={isScrollEnabled}
              infinite={false}
            >
              <Scene
                toggleTerminal={toggleTerminal}
                toggleScrollEnabled={toggleScrollEnabled}
                isScrollEnabled={isScrollEnabled}
                toggleScreenView={toggleScreenView}
                inScreenView={inScreenView}
                onScrollOffsetChange={handleScrollOffsetChange}
              />
              <Scroll ref={htmlRef} html style={{ width: '100%', overflow: 'hidden', opacity: 0 }}>
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
      {!inDesktopView && !inScreenView && (
        <button
          className={`enter-desktop-button${showEnterDesktop ? ' show' : ''}`}
          onClick={enterDesktopView}
        >
          Enter Desktop
        </button>
      )}
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
      {inDesktopView && (
        <div className="desktop-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
          <Desktop scrollProgress={1} />
        </div>
      )}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      {isScrollEnabled && !inScreenView && !inDesktopView && (
        <div className="scroll-indicator">
          Scroll down to explore, <br />
          click "C" to interact.
        </div>
      )}
      {(inScreenView || inDesktopView) && (
        <button
          className="back-button"
          onClick={exitDesktopView}
        >
          Back to 3D View
        </button>
      )}
    </div>
  );
};

export default App;