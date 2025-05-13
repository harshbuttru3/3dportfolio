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

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    // Clean up any existing ScrollTrigger instances to prevent duplication
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Setup animations when component mounts
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      const elements = section.querySelectorAll('.hidden');
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          elements.forEach((el) => {
            el.classList.add('show');
          });
        }
      });
    });

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  return (
    <div ref={appRef} className="app">
      <div className="overlay"></div>
      
      <Canvas
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
            pages={5} // Number of pages
            damping={0.4} // Smoother scrolling
            distance={1} // Page size
            enabled={true} // Enable scroll controls
          >
            <Scene toggleTerminal={toggleTerminal} />
            <Scroll html>
              <IntroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
    </div>
  );
};

export default App; 