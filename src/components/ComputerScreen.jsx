import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// This component represents the computer screen in 3D space
// It will render the content sections within the screen plane
const ComputerScreen = ({ isActive, scrollProgress }) => {
  const screenRef = useRef();
  const screenContentRef = useRef();
  const { size } = useThree();
  
  // Screen dimensions and position
  const screenWidth = 1.6;
  const screenHeight = 0.9;
  const screenDepth = 0.05;
  
  // Update screen visibility based on scroll progress
  useEffect(() => {
    if (screenRef.current) {
      // Screen becomes visible after certain scroll progress
      screenRef.current.visible = isActive;
    }
  }, [isActive]);
  
  // Animate screen based on scroll progress
  useFrame(() => {
    if (screenRef.current && isActive) {
      // Subtle animation for screen when active
      screenRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.01;
    }
  });
  
  return (
    <group ref={screenRef} position={[0, 1.35, -0.3]} rotation={[0, 0, 0]}>
      {/* Screen frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[screenWidth, screenHeight, screenDepth]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Screen display surface */}
      <mesh position={[0, 0, screenDepth / 2 + 0.001]} receiveShadow>
        <planeGeometry args={[screenWidth - 0.1, screenHeight - 0.1]} />
        <meshStandardMaterial 
          color="#0A192F" 
          emissive="#0A192F"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Screen content - displayed when active */}
      {isActive && (
        <group ref={screenContentRef} position={[0, 0, screenDepth / 2 + 0.002]}>
          {/* HTML content embedded in 3D space */}
          <Html
            transform
            occlude
            position={[0, 0, 0.01]}
            style={{
              width: `${(screenWidth - 0.2) * 350}px`,
              height: `${(screenHeight - 0.2) * 350}px`,
              backgroundColor: 'transparent',
              overflow: 'hidden',
              pointerEvents: 'auto',
            }}
          >
            <div className="computer-screen-content">
              <div className="screen-toolbar">
                <div className="toolbar-buttons">
                  <span className="toolbar-button red"></span>
                  <span className="toolbar-button yellow"></span>
                  <span className="toolbar-button green"></span>
                </div>
                <div className="toolbar-title">portfolio.jsx</div>
                <div className="toolbar-spacer"></div>
              </div>
              <div className="screen-content">
                <div className="code-line">
                  <span className="code-keyword">const</span> 
                  <span className="code-variable"> Developer</span> 
                  <span className="code-operator"> = </span>
                  <span className="code-punctuation">{'{'}</span>
                </div>
                <div className="code-line indented">
                  <span className="code-property">name</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-string">"Shivam"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line indented">
                  <span className="code-property">title</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-string">"Full Stack Developer & Cybersecurity Specialist"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line indented">
                  <span className="code-property">skills</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-punctuation">[</span>
                  <span className="code-string">"React"</span>
                  <span className="code-punctuation">,</span> 
                  <span className="code-string">"Node.js"</span>
                  <span className="code-punctuation">,</span> 
                  <span className="code-string">"Three.js"</span>
                  <span className="code-punctuation">,</span> 
                  <span className="code-string">"Cybersecurity"</span>
                  <span className="code-punctuation">,</span> 
                  <span className="code-string">"MongoDB"</span>
                  <span className="code-punctuation">,</span> 
                  <span className="code-string">"AWS"</span>
                  <span className="code-punctuation">]</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line indented">
                  <span className="code-property">contact</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-punctuation">{'{'}</span>
                </div>
                <div className="code-line double-indented">
                  <span className="code-property">email</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-string">"example@email.com"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line double-indented">
                  <span className="code-property">github</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-string">"github.com/yourusername"</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line double-indented">
                  <span className="code-property">linkedin</span>
                  <span className="code-punctuation">:</span> 
                  <span className="code-string">"linkedin.com/in/yourusername"</span>
                </div>
                <div className="code-line indented">
                  <span className="code-punctuation">{'}'}</span>
                  <span className="code-punctuation">,</span>
                </div>
                <div className="code-line">
                  <span className="code-punctuation">{'}'}</span>
                  <span className="code-punctuation">;</span>
                </div>
                <div className="code-line">
                  <span className="code-keyword">export default</span>
                  <span className="code-variable"> Developer</span>
                  <span className="code-punctuation">;</span>
                </div>
              </div>
            </div>
          </Html>
        </group>
      )}
      
      {/* Keyboard hint */}
      {isActive && (
        <Text
          position={[0, -0.6, 0.1]}
          fontSize={0.05}
          color="#64FFDA"
          anchorX="center"
          anchorY="middle"
        >
          Press 'C' to explore the website
        </Text>
      )}
    </group>
  );
};

export default ComputerScreen; 