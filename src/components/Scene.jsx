import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll, Text, Environment, PerspectiveCamera, OrbitControls, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { preloadModels } from '../utils/modelLoader';

// Preload models
preloadModels();

// Loader component
const Loader = () => (
  <Html center>
    <div className="loader">
      <div className="loading-text">Loading 3D Environment...</div>
    </div>
  </Html>
);

// Chair model
const Chair = ({ position = [0, 0, 0], scale = 1, modelPath, scrollProgress = 0, turned = false }) => {
  const chairRef = useRef();
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };
  const [currentRotation, setCurrentRotation] = useState(-1.9); // Initial rotation
  const targetRotation = useRef(-1.9);
  
  useFrame(() => {
    if (chairRef.current) {
      if (scrollProgress > 0.3) {
        chairRef.current.position.x = THREE.MathUtils.lerp(chairRef.current.position.x, 20, 0.1);
      } else {
        chairRef.current.position.x = 0.3;
        chairRef.current.position.y = -0.8;
        chairRef.current.position.z = -0.1;
        chairRef.current.scale.set(1.7, 1.7, 1.7);
        
        // Update target rotation based on turned state
        targetRotation.current = turned ? (0 + Math.PI, -0.1) : -2.1;
        
        // Smoothly interpolate current rotation
        const newRotation = THREE.MathUtils.lerp(
          currentRotation,
          targetRotation.current,
          0.1
        );
        
        setCurrentRotation(newRotation);
        chairRef.current.rotation.y = newRotation;
      }
    }
  });

  if (!scene) return null;
  return (
    <group ref={chairRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

// Desk model
const Desk = ({ position = [0, 0, 0], scale = 0.25, modelPath, scrollProgress = 0 }) => {
  const deskRef = useRef();
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };
  useFrame(() => {
    if (deskRef.current) {
      if (scrollProgress > 0.3) {
        deskRef.current.position.x = THREE.MathUtils.lerp(deskRef.current.position.x, 1.23, 0.1);
        deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0.09, 0.01);
        deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -0.7, 0.01);
        deskRef.current.scale.x = THREE.MathUtils.lerp(deskRef.current.scale.x, 0.29, 0.01);
        deskRef.current.scale.y = THREE.MathUtils.lerp(deskRef.current.scale.y, 0.4, 0.01);
        deskRef.current.scale.z = THREE.MathUtils.lerp(deskRef.current.scale.z, 0.4, 0.01);
        deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -1.57, 0.01);
      } else {
        deskRef.current.position.x = THREE.MathUtils.lerp(deskRef.current.position.x, -0.9, 0.05);
        deskRef.current.position.y = THREE.MathUtils.lerp(deskRef.current.position.y, 0, 0.05);
        deskRef.current.position.z = THREE.MathUtils.lerp(deskRef.current.position.z, -1.5, 0.05);
        deskRef.current.rotation.y = THREE.MathUtils.lerp(deskRef.current.rotation.y, -0.4, 0.05);
        deskRef.current.scale.x = THREE.MathUtils.lerp(deskRef.current.scale.x, 0.2, 0.05);
        deskRef.current.scale.y = THREE.MathUtils.lerp(deskRef.current.scale.y, 0.2, 0.05);
        deskRef.current.scale.z = THREE.MathUtils.lerp(deskRef.current.scale.z, 0.2, 0.05);
      }
    }
  });
  if (!scene) return null;
  return (
    <group ref={deskRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

// Human model
const Human = ({ position = [0, 0, 0], scale = 1, toggleTerminal, modelPath, scrollProgress = 0, turned, onTurn }) => {
  const humanRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, humanRef);
  const [isSitting, setIsSitting] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(-2.3);
  const [currentPosition, setCurrentPosition] = useState({ x: 0.1, y: -0.8, z: -0.2 });
  const targetRotation = useRef(-2.3);
  const targetPosition = useRef({ x: 0.1, y: -0.8, z: -0.2 });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    const sittingAction = actions['sit'] || actions['Sit'] || actions['sitting'] || actions['Sitting'];
    if (sittingAction) {
      if (isSitting) {
        sittingAction.reset().play();
      } else {
        sittingAction.stop();
      }
    }
  }, [isSitting, actions]);

  useFrame(() => {
    if (humanRef.current) {
      humanRef.current.scale.set(1.5, 1.5, 1.5);
      
      if (scrollProgress > 0.3) {
        humanRef.current.position.x = THREE.MathUtils.lerp(humanRef.current.position.x, -20, 0.1);
      } else {
        // Update target position and rotation based on turned state
        targetRotation.current = turned ?( Math.PI, 0.01) : -2.3;
        targetPosition.current = turned 
          ? { x: 0.3, y: -0.75, z: -0.2 }  // Shifted position when turned
          : { x: 0.1, y: -0.8, z: -0.2 };  // Original position
        
        // Smooth position interpolation
        const newPosition = {
          x: THREE.MathUtils.lerp(currentPosition.x, targetPosition.current.x, 0.1),
          y: THREE.MathUtils.lerp(currentPosition.y, targetPosition.current.y, 0.1),
          z: THREE.MathUtils.lerp(currentPosition.z, targetPosition.current.z, 0.1)
        };
        
        // Smooth rotation interpolation
        const newRotation = THREE.MathUtils.lerp(
          currentRotation,
          targetRotation.current,
          0.1
        );
        
        // Update states and apply to ref
        setCurrentPosition(newPosition);
        setCurrentRotation(newRotation);
        
        humanRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
        humanRef.current.rotation.y = newRotation;
      }
    }
  });

  const handleClick = () => {
    onTurn();
    // You can add additional animation triggers here
  };

  if (!scene) return null;
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
};

// Main 3D scene
const Scene = ({ toggleTerminal, toggleScrollEnabled, isScrollEnabled, onScrollOffsetChange }) => {
  const scroll = useScroll();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const { gl } = useThree();
  const [enableControls, setEnableControls] = useState(false);
  const [inScreenView, setInScreenView] = useState(false);
  const [turned, setTurned] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Only notify parent when threshold is crossed
  const lastThreshold = useRef(null);
  const threshold = 0.9;

  useEffect(() => {
    setEnableControls(!isScrollEnabled);
  }, [isScrollEnabled]);

  const modelPaths = {
    human: "/models/optimizedman.glb",
    chair: "/models/optimizedchair.glb",
    desk: "/models/optimizeddesk.glb"
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2, 5);
      cameraRef.current.lookAt(0, 1, 0);
    }
    // Classic controls toggle logic
    const toggleControls = () => {
      setEnableControls(prev => {
        if (controlsRef.current) {
          controlsRef.current.enabled = !prev;
          controlsRef.current.update?.();
        }
        return !prev;
      });
    };
    const keydownHandler = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        toggleControls();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', keydownHandler);
    gl.domElement.style.pointerEvents = 'auto';
    gl.domElement.style.touchAction = 'auto';
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [gl]);

  useEffect(() => {
    // Detect touch device
    const isTouchCapable = ('ontouchstart' in window) || 
      (window.DocumentTouch && document instanceof window.DocumentTouch);
    setIsTouchDevice(isTouchCapable);
  }, []);

  // Add touch button component
  const ControlsButton = () => (
    <Html position={[0, 4, 0]}>
      <button 
        className="controls-button"
        onClick={() => setEnableControls(prev => !prev)}
        style={{
          background: 'rgba(100, 255, 218, 0.1)',
          border: '1px solid #64FFDA',
          color: '#64FFDA',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease'
        }}
      >
        {enableControls ? 'Disable Controls' : 'Enable Controls'}
      </button>
    </Html>
  );

  useFrame(() => {
    if (!cameraRef.current) return;
    
    // Update controls enabled state
    if (controlsRef.current) {
      if (controlsRef.current.enabled !== enableControls) {
        controlsRef.current.enabled = enableControls;
      }
    }

    // Handle scroll threshold notification
    const offset = scroll.offset;
    if (
      lastThreshold.current === null ||
      (lastThreshold.current <= threshold && offset > threshold) ||
      (lastThreshold.current > threshold && offset <= threshold)
    ) {
      if (onScrollOffsetChange) onScrollOffsetChange(offset);
      lastThreshold.current = offset;
    }

    // Only animate camera if controls are disabled
    if (!enableControls) {
      if (offset < 0.1) {
        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 2, 0.05);
        cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 5, 0.05);
        cameraRef.current.lookAt(0, 1, 0);
        setInScreenView(false);
      } else if (offset < 0.3) {
        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.3, 0.05);
        cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 2, 0.05);
        cameraRef.current.lookAt(0, 1.3, -0.5);
        setInScreenView(false);
      } else {
        cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
        cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.25, 0.05);
        cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 0.3, 0.05);
        cameraRef.current.lookAt(0, 1.25, -0.5);
        if (!inScreenView && offset > 0.4) {
          setInScreenView(true);
        }
      }
    }
  });

  const handleTurn = () => {
    setTurned(!turned);
  };

  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={[0, 2, 5]} 
        fov={75}
      />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enabled={enableControls}
        makeDefault
        target={[0, 1, 0]} // Adjust target to look at the center of the scene
        minDistance={1} // Add minimum zoom distance
        maxDistance={20} // Add maximum zoom distance
        // Add damping for smoother controls
        enableDamping={true}
        dampingFactor={0.05}
        touches={{
          one: enableControls ? THREE.TOUCH.ROTATE : THREE.TOUCH.DOLLY_PAN,
          two: enableControls ? THREE.TOUCH.DOLLY_PAN : THREE.TOUCH.ROTATE
        }}
      />
      {/* Show button instead of text for touch devices */}
      {isTouchDevice ? (
        <ControlsButton />
      ) : (
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
      )}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <Environment preset="city" />
      <Suspense fallback={<Loader />}>
        <group position={[0, 0, 0]}>
          <Desk
            position={[0, 0, -1.5]}
            modelPath={modelPaths.desk}
            scrollProgress={scroll.offset}
          />
          <Chair
            position={[0, 0, 0.5]}
            modelPath={modelPaths.chair}
            scrollProgress={scroll.offset}
            turned={turned}
          />
          <Human
            position={[0, 0, 0]}
            toggleTerminal={toggleTerminal}
            modelPath={modelPaths.human}
            scrollProgress={scroll.offset}
            turned={turned}
            onTurn={handleTurn}
          />
        </group>
      </Suspense>
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]}>
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