import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll, Text, Environment, PerspectiveCamera, OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Import our new ComputerScreen component
import ComputerScreen from './ComputerScreen';

// Custom 3D chair model - you can replace this with your own model
const Chair = ({ position = [0, 0, 0], scale = 1, modelPath }) => {
  const chairRef = useRef();
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };
  
  useFrame(() => {
    if (chairRef.current) {
      // Fixed scale for chair
      chairRef.current.position.y = -0.8;
      chairRef.current.position.x = 0.3;
      chairRef.current.position.z = -0.1;
      chairRef.current.scale.x = 1.7;
      chairRef.current.scale.y = 1.7;
      chairRef.current.scale.z = 1.7;
      chairRef.current.rotation.y = -1.9;
    }
  });
  
  if (scene) {
    // Render custom model if available
    return (
      <group ref={chairRef} position={position} scale={scale}>
        <primitive object={scene} />
      </group>
    );
  }
  

 
};

// Custom 3D desk with PC model
const Desk = ({ position = [0, 0, 0], scale = 0.25, modelPath, scrollProgress = 0 }) => {
  const deskRef = useRef();
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };
  
  // Add rotation and transformation controls
  useFrame((state, delta) => {
    if (deskRef.current) {
      // Smoothly interpolate position and rotation based on scroll
      if (scrollProgress > 0.3) {
        // When scrolled down, position desk to center the monitor in view
        deskRef.current.position.x = THREE.MathUtils.lerp(deskRef.current.position.x, 0.7, 0.9);
        deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0.4, 0.09);
        deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -0.7, 0.05);
        deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -1.57, 0.05); // Rotate to face camera directly
      } else {
        // Default position
        deskRef.current.position.x = THREE.MathUtils.lerp(deskRef.current.position.x, -0.9, 0.05);
        deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0, 0.05);
        deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -1.5, 0.05);
        deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -0.4, 0.05);
      }
    }
  });
  
  if (!scene) {
    return null;
  }
  
  return (
    <group 
      ref={deskRef} 
      position={position} 
      scale={scale}
    >
      <primitive object={scene} />
    </group>
  );
};

// Custom 3D human model
const Human = ({ position = [0, 0, 0], scale = 1, toggleTerminal, modelPath }) => {
  const humanRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [turned, setTurned] = useState(false);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, humanRef);
  const [isSitting, setIsSitting] = useState(true); // Default to sitting pose

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    // Find the sitting animation
    const sittingAction = actions['sit'] || actions['Sit'] || actions['sitting'] || actions['Sitting'];
    if (sittingAction) {
      if (isSitting) {
        sittingAction.reset().play();
      } else {
        sittingAction.stop();
      }
    }
  }, [isSitting, actions]);

  useFrame((state) => {
    if (humanRef.current) {
     // Fixed position for human
      humanRef.current.scale.x = 1.5;
      humanRef.current.scale.y = 1.5;
      humanRef.current.scale.z = 1.5;
      humanRef.current.position.x = 0.1;
      humanRef.current.position.y = -0.8;
      humanRef.current.position.z = -0.2;
      humanRef.current.rotation.y = -2.3;
      // if (scrollProgress > 0.3) {
      //   // When scrolled down, position desk to center the monitor in view
      //   humanRef.current.position.x = THREE.MathUtils.lerp(humanRef.current.position.x, 0.7, 0.9);
      //   deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0.4, 0.09);
      //   deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -0.7, 0.05);
      //   deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -1.57, 0.05); // Rotate to face camera directly
      // } else {
      //   // Default position
      //   deskRef.current.position.x = THREE.MathUtils.lerp(deskRef.current.position.x, -0.9, 0.05);
      //   deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0, 0.05);
      //   deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -1.5, 0.05);
      //   deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -0.4, 0.05);
      // }
      
      if (turned) {
        // Gradually rotate to face camera
        humanRef.current.rotation.y = THREE.MathUtils.lerp(
          humanRef.current.rotation.y,
          Math.PI,
          0.05
        );
      } else {
        // Gradually rotate to face desk
        humanRef.current.rotation.y = THREE.MathUtils.lerp(
          humanRef.current.rotation.y,
          0,
          0.05
        );
      }
    }
  });

  const handleClick = () => {
    setTurned(!turned);
    if (!turned) {
      // Show greeting after turning
      setTimeout(() => {
        // toggleTerminal();
      }, 500);
    }
  };

  if (scene) {
    // Render custom model if available
    return (
      <group
        ref={humanRef}
        position={position}
        scale={scale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={scene} />
        
        {/* Speech bubble, only visible when turned */}
        {turned && (
          <group position={[0, 2.3, 0]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.2}
              color="#64FFDA"
              anchorX="center"
              anchorY="middle"
            >
              Hi, I'm Shivam!
            </Text>
          </group>
        )}
      </group>
    );
  }
  

  
};

// Main 3D scene
const Scene = ({ toggleTerminal, toggleScrollEnabled, isScrollEnabled }) => {
  const scroll = useScroll();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const { camera, gl, size, scene } = useThree();
  const [enableControls, setEnableControls] = useState(false);
  const [inScreenView, setInScreenView] = useState(false);
  const [showComputerScreen, setShowComputerScreen] = useState(false);
  
  // Force enableControls to be the opposite of isScrollEnabled
  useEffect(() => {
    setEnableControls(!isScrollEnabled);
    console.log("Scene: Control state updated based on scroll state:", !isScrollEnabled);
  }, [isScrollEnabled]);
  
  // Define model paths - removed invalid references
  const modelPaths = {
    // Comment out any models that don't exist yet
    human: "/models/cool_man.glb",
    chair: "/models/chair.glb",
    desk: "/models/your-desk-model.glb"  // Updated to point to the correct path in public folder
  };
  
  // Handle toggling controls separately from React state
  // to avoid any batching or timing issues
  const toggleControls = useCallback(() => {
    console.log("Toggling controls manually");
    
    // Toggle app scroll state first
    if (toggleScrollEnabled) {
      toggleScrollEnabled();
    }
    
    // Then toggle our own controls
    setEnableControls(prev => !prev);
    
    // Directly manipulate controls if they exist
    if (controlsRef.current) {
      controlsRef.current.enabled = !controlsRef.current.enabled;
      
      // Force a controls update
      controlsRef.current.update();
      console.log("Controls enabled set to:", controlsRef.current.enabled);
    }
  }, [toggleScrollEnabled]);
  
  // Setup scene elements
  useEffect(() => {
    console.log("Scene mounted");
    
    // Initial camera setup
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2, 5);
      cameraRef.current.lookAt(0, 1, 0);
    }
    
    // Setup custom key event handler outside of React's event system
    const keydownHandler = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        console.log("C key pressed - direct DOM event");
        toggleControls();
        e.preventDefault(); // Prevent any default behavior
      }
    };
    
    // Add the key handler directly to window
    window.addEventListener('keydown', keydownHandler);
    
    // Setup mouse handlers to debug events
    const mouseDownHandler = (e) => {
      console.log("Mouse down on canvas:", e.clientX, e.clientY);
    };
    
    // Event listeners for debugging
    gl.domElement.addEventListener('mousedown', mouseDownHandler);
    
    // Make sure all DOM elements allow scrolling
    document.body.style.overflow = 'auto';
    gl.domElement.style.pointerEvents = 'auto';
    gl.domElement.style.touchAction = 'auto';
    
    return () => {
      window.removeEventListener('keydown', keydownHandler);
      gl.domElement.removeEventListener('mousedown', mouseDownHandler);
    };
  }, [gl, toggleControls, enableControls]);
  
  // Camera animation and controls management loop
  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // Update controls state to match ref
    if (controlsRef.current) {
      if (controlsRef.current.enabled !== enableControls) {
        controlsRef.current.enabled = enableControls;
      }
    }
    
    // Check if scroll is near zero (happens on page load)
    if (scroll.offset === 0 && !enableControls) {
      // Set initial position
      cameraRef.current.position.set(0, 2, 5);
      cameraRef.current.lookAt(0, 1, 0);
      setInScreenView(false);
      setShowComputerScreen(false);
    }
    
    // If controls are enabled, don't move the camera with scroll
    if (enableControls) return;
    
    // Otherwise, handle scroll-based camera animation
    const scrollOffset = scroll.offset;
    
    // Use smooth animation to update camera based on scroll
    if (scrollOffset < 0.1) {
      // Initial view of the scene
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 2, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 5, 0.05);
      cameraRef.current.lookAt(0, 1, 0);
      setInScreenView(false);
    } 
    else if (scrollOffset < 0.3) {
      // Transition to monitor view
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.3, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 2, 0.05);
      cameraRef.current.lookAt(0, 1.3, -0.5);
      setInScreenView(false);
    } 
    else {
      // Final position - directly facing the monitor
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.25, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 0.3, 0.05);
      cameraRef.current.lookAt(0, 1.25, -0.5); // Look straight at monitor
      
      if (!inScreenView && scrollOffset > 0.4) {
        setInScreenView(true);
      }
    }
  });
  
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
      
      {/* OrbitControls with explicitly managed enablement */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        enabled={enableControls}
        makeDefault
        target={[0, 0, 0]}
      />
      
      {/* Helper text to show controls status */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.2}
        color="#64FFDA"
        anchorX="center"
        anchorY="middle"
        renderOrder={100}
      >
        {enableControls ? "Controls Enabled (Press 'C' to disable)" : "Press 'C' to enable mouse controls"}
      </Text>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      <Environment preset="city" />
      
      {/* Main scene setup - with optional custom models */}
      <group position={[0, 0, 0]}>
        <Desk 
          position={[0, 0, -1.5]} 
          modelPath={modelPaths.desk}
          scrollProgress={scroll.offset}
        />
        <Chair 
          position={[0, 0, 0.5]} 
          modelPath={modelPaths.chair}
        />
        <Human 
          position={[0, 0, 0]} 
          toggleTerminal={toggleTerminal} 
          modelPath={modelPaths.human}
        />
      </group>
      
      {/* Technology floating elements (only visible until we zoom in) */}
      {!inScreenView && [-3, -2, -1, 1, 2, 3].map((x, i) => (
        <mesh 
          key={i}
          position={[x * 2, Math.sin(x) + 3, -5 - Math.abs(x)]}
          rotation={[0, x * 0.2, 0]}
        >
          <Text
            fontSize={0.5}
            color={i % 2 === 0 ? "#64FFDA" : "#CCD6F6"}
            anchorX="center"
            anchorY="middle"
          >
            {["React", "Node.js", "Three.js", "Cybersecurity", "MongoDB", "AWS"][i]}
          </Text>
        </mesh>
      ))}
      
      {/* Floor - simple grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50, 50, 50]} />
        <meshStandardMaterial 
          color="#1E2D3D"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
};

export default Scene; 