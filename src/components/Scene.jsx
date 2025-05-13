import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll, Text, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Custom 3D chair model - you can replace this with your own model
const Chair = ({ position = [0, 0, 0], scale = 1, modelPath }) => {
  const chairRef = useRef();
  // Use custom model if provided, otherwise use default
  const [model, setModel] = useState(null);
  
  useEffect(() => {
    if (modelPath) {
      try {
        // Only try to load if modelPath is provided
        const { scene } = useGLTF(modelPath);
        if (scene) setModel(scene);
      } catch (error) {
        console.log(`Failed to load chair model: ${error.message}`);
      }
    }
  }, [modelPath]);
  
  useFrame(() => {
    if (chairRef.current) {
      chairRef.current.rotation.y += 0.002; // Slow rotation
    }
  });
  
  if (model) {
    // Render custom model if available
    return (
      <group ref={chairRef} position={position} scale={scale}>
        <primitive object={model} />
      </group>
    );
  }
  
  // Fallback to simple chair
  return (
    <group ref={chairRef} position={position} scale={scale}>
      {/* Chair base */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Chair back */}
      <mesh position={[0, 1.25, -0.5]}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Chair legs */}
      {[
        [-0.5, 0, 0.5],
        [0.5, 0, 0.5],
        [-0.5, 0, -0.5],
        [0.5, 0, -0.5]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
    </group>
  );
};

// Custom 3D desk with PC model
const Desk = ({ position = [0, 0, 0], scale = 1, modelPath }) => {
  const deskRef = useRef();
  // Use custom model if provided, otherwise use default
  const [model, setModel] = useState(null);
  
  useEffect(() => {
    if (modelPath) {
      try {
        // Only try to load if modelPath is provided
        const { scene } = useGLTF(modelPath);
        if (scene) setModel(scene);
      } catch (error) {
        console.log(`Failed to load desk model: ${error.message}`);
      }
    }
  }, [modelPath]);
  
  if (model) {
    // Render custom model if available
    return (
      <group ref={deskRef} position={position} scale={scale}>
        <primitive object={model} />
      </group>
    );
  }
  
  // Fallback to simple desk model
  return (
    <group position={position} scale={scale}>
      {/* Desk surface */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Desk legs */}
      {[
        [-1.1, 0, 0.5],
        [1.1, 0, 0.5],
        [-1.1, 0, -0.5],
        [1.1, 0, -0.5]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color="#5D3A1A" />
        </mesh>
      ))}
      
      {/* Computer monitor */}
      <mesh position={[0, 1.35, -0.3]}>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Computer screen (active) */}
      <mesh position={[0, 1.35, -0.27]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshBasicMaterial color="#0a192f" />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, 0.8, 0.2]}>
        <boxGeometry args={[0.8, 0.05, 0.3]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.6, 0.8, 0.2]}>
        <boxGeometry args={[0.1, 0.03, 0.2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
};

// Custom 3D human model
const Human = ({ position = [0, 0, 0], scale = 1, toggleTerminal, modelPath }) => {
  const humanRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [turned, setTurned] = useState(false);
  // Use custom model if provided, otherwise use default
  const [model, setModel] = useState(null);
  
  useEffect(() => {
    if (modelPath) {
      try {
        // Only try to load if modelPath is provided
        const { scene } = useGLTF(modelPath);
        if (scene) setModel(scene);
      } catch (error) {
        console.log(`Failed to load human model: ${error.message}`);
      }
    }
  }, [modelPath]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    if (humanRef.current) {
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
        toggleTerminal();
      }, 500);
    }
  };

  if (model) {
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
        <primitive object={model} />
        
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
  
  // Fallback to simple human model
  return (
    <group
      ref={humanRef}
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Body */}
      <mesh position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
        <meshStandardMaterial color={hovered ? "#64FFDA" : "#3a506b"} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#e0ac69" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.4, 1.1, 0.1]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.08, 0.7, 4, 8]} />
        <meshStandardMaterial color="#3a506b" />
      </mesh>
      <mesh position={[0.4, 1.1, 0.1]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.08, 0.7, 4, 8]} />
        <meshStandardMaterial color="#3a506b" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, 0.5, 0]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
        <meshStandardMaterial color="#1a2639" />
      </mesh>
      <mesh position={[0.2, 0.5, 0]} rotation={[0.3, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
        <meshStandardMaterial color="#1a2639" />
      </mesh>
      
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
};

// Main 3D scene
const Scene = ({ toggleTerminal }) => {
  const scroll = useScroll();
  const cameraRef = useRef();
  const { camera } = useThree();
  
  // Define empty model paths - users can add their own models later
  const modelPaths = {
    // Models are now commented out to avoid loading errors
    // human: "/models/human.glb",
    // chair: "/models/chair.glb",
    // desk: "/models/desk.glb"
  };
  
  // Setup scene elements
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 2, 5);
      cameraRef.current.lookAt(0, 1, 0);
    }
  }, []);
  
  // Handle scroll animation with improved performance
  useFrame(() => {
    if (!cameraRef.current) return;
    
    const scrollOffset = scroll.offset;
    
    // Use proper animation technique to avoid choppy scrolling
    // Initial position (view of the person at desk)
    if (scrollOffset < 0.1) {
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 2, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 5, 0.05);
      cameraRef.current.lookAt(0, 1, 0);
    }
    // Zoom into the computer screen
    else if (scrollOffset < 0.3) {
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.35, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, 0.5, 0.05);
      cameraRef.current.lookAt(0, 1.35, -0.3);
    }
    // Inside the computer screen
    else {
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, 0, 0.05);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, 1.35, 0.05);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, -2, 0.05);
      cameraRef.current.lookAt(0, 1.35, -5);
    }
  });
  
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      <Environment preset="city" />
      
      {/* Main scene setup - with optional custom models */}
      <group position={[0, -1, 0]}>
        <Desk 
          position={[0, 0, -1]} 
          modelPath={modelPaths.desk}
        />
        <Chair 
          position={[0, 0, 0]} 
          modelPath={modelPaths.chair}
        />
        <Human 
          position={[0, 0.55, 0]} 
          toggleTerminal={toggleTerminal} 
          modelPath={modelPaths.human}
        />
      </group>
      
      {/* Technology floating elements (only visible until we zoom in) */}
      {[-3, -2, -1, 1, 2, 3].map((x, i) => (
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.01, 0]}>
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