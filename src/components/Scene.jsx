import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll, Text, Environment, PerspectiveCamera, OrbitControls, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Chair model
const Chair = ({ position = [0, 0, 0], scale = 1, modelPath, scrollProgress = 0 }) => {
  const chairRef = useRef();
  const { scene } = modelPath ? useGLTF(modelPath) : { scene: null };
  useFrame(() => {
    if (chairRef.current) {
      if (scrollProgress > 0.3) {
        chairRef.current.position.x = THREE.MathUtils.lerp(chairRef.current.position.x, 20, 0.1);
      } else {
        chairRef.current.position.x = 0.3;
        chairRef.current.position.y = -0.8;
        chairRef.current.position.z = -0.1;
        chairRef.current.scale.set(1.7, 1.7, 1.7);
        chairRef.current.rotation.y = -1.9;
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
const Human = ({ position = [0, 0, 0], scale = 1, toggleTerminal, modelPath, scrollProgress = 0 }) => {
  const humanRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [turned, setTurned] = useState(false);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, humanRef);
  const [isSitting, setIsSitting] = useState(true);

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
        humanRef.current.position.x = 0.1;
        humanRef.current.position.y = -0.8;
        humanRef.current.position.z = -0.2;
        humanRef.current.rotation.y = -2.3;
      }
      if (turned) {
        humanRef.current.rotation.y = THREE.MathUtils.lerp(
          humanRef.current.rotation.y,
          Math.PI,
          0.05
        );
      } else {
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
      setTimeout(() => {
        // toggleTerminal();
      }, 500);
    }
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

  // Only notify parent when threshold is crossed
  const lastThreshold = useRef(null);
  const threshold = 0.7;

  useEffect(() => {
    setEnableControls(!isScrollEnabled);
  }, [isScrollEnabled]);

  const modelPaths = {
    human: "/models/cool_man.glb",
    chair: "/models/chair.glb",
    desk: "/models/your-desk-model.glb"
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

  useFrame(() => {
    if (!cameraRef.current) return;
    if (controlsRef.current) {
      if (controlsRef.current.enabled !== enableControls) {
        controlsRef.current.enabled = enableControls;
      }
    }
    // Only notify parent when threshold is crossed
    const offset = scroll.offset;
    if (
      lastThreshold.current === null ||
      (lastThreshold.current <= threshold && offset > threshold) ||
      (lastThreshold.current > threshold && offset <= threshold)
    ) {
      if (onScrollOffsetChange) onScrollOffsetChange(offset);
      lastThreshold.current = offset;
    }

    // Camera animation
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
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 5]} />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enabled={enableControls}
        makeDefault
        target={[0, 0, 0]}
      />
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
        />
        <Human
          position={[0, 0, 0]}
          toggleTerminal={toggleTerminal}
          modelPath={modelPaths.human}
          scrollProgress={scroll.offset}
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