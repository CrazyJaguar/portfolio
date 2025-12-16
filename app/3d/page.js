'use client';
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Stars, Text, Html, PerspectiveCamera, Environment } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import * as THREE from 'three';

const AnimatedSphere = animated(Sphere);
const AnimatedMesh = animated.mesh;

// Floating Particle System
function ParticleField({ count = 1000 }) {
  const points = useRef();
  
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 50;
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 50;
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  
  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ff6347" transparent opacity={0.6} />
    </points>
  );
}

// Hero 3D Scene
function HeroScene() {
  const orbRef = useRef();
  const ringRefs = useRef([]);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      orbRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
    
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = state.clock.elapsedTime * (0.3 + i * 0.1);
        ring.rotation.y = state.clock.elapsedTime * (0.2 + i * 0.15);
      }
    });
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ParticleField count={800} />
      
      {/* Central Orb */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={orbRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.5, 2]} />
          <MeshDistortMaterial
            color="#ff4500"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive="#ff6347"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
      
      {/* Orbiting Rings */}
      {[3.5, 4.5, 5.5].map((radius, i) => (
        <mesh key={i} ref={el => ringRefs.current[i] = el}>
          <torusGeometry args={[radius, 0.1, 16, 100]} />
          <meshStandardMaterial 
            color={['#ff4500', '#ffd700', '#ff6347'][i]} 
            emissive={['#ff4500', '#ffd700', '#ff6347'][i]}
            emissiveIntensity={0.5}
            metalness={0.8}
          />
        </mesh>
      ))}
      
      {/* 3D Text */}
      <Float speed={2} floatIntensity={0.5}>
        <Text
          position={[0, 3, 0]}
          fontSize={1.2}
          color="#ff4500"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.woff"
        >
          SUSHANT RAJ MISHRA
          <meshStandardMaterial emissive="#ff6347" emissiveIntensity={0.5} />
        </Text>
      </Float>
      
      <Float speed={1.5} floatIntensity={0.3}>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.5}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
        >
          FULL STACK DEVELOPER
          <meshStandardMaterial emissive="#ffd700" emissiveIntensity={0.4} />
        </Text>
      </Float>
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff4500" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffd700" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={2} color="#ff6347" />
    </>
  );
}

// About Section 3D
function AboutScene() {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  const items = [
    { pos: [0, 2, 0], text: 'MBBS\nASPIRANT', color: '#ff4500', icon: '🏥' },
    { pos: [3, 0, 0], text: 'FULL STACK\nDEVELOPER', color: '#ffd700', icon: '💻' },
    { pos: [0, -2, 0], text: 'SOCIETY\nSERVICE', color: '#ff6347', icon: '🤝' },
    { pos: [-3, 0, 0], text: 'INNOVATOR', color: '#ff8c00', icon: '🚀' },
  ];
  
  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh 
            position={item.pos}
            onPointerOver={() => setHovered(i)}
            onPointerOut={() => setHovered(null)}
            scale={hovered === i ? 1.3 : 1}
          >
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <MeshDistortMaterial
              color={item.color}
              distort={0.4}
              speed={2}
              metalness={0.8}
              roughness={0.2}
              emissive={item.color}
              emissiveIntensity={hovered === i ? 0.8 : 0.4}
            />
          </mesh>
          <Text
            position={[item.pos[0], item.pos[1], item.pos[2] + 1]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.5}
          >
            {item.text}
          </Text>
          <Text
            position={[item.pos[0], item.pos[1] + 0.6, item.pos[2] + 1]}
            fontSize={0.6}
            anchorX="center"
            anchorY="middle"
          >
            {item.icon}
          </Text>
        </Float>
      ))}
      
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff4500" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#ffd700" />
    </group>
  );
}

// Skills Section 3D
function SkillsScene() {
  const groupRef = useRef();
  const skills = [
    { name: 'React', level: 0.9, color: '#61dafb', pos: [0, 2, 0] },
    { name: 'Node.js', level: 0.85, color: '#68a063', pos: [2, 1, 0] },
    { name: 'Three.js', level: 0.8, color: '#000000', pos: [2, -1, 0] },
    { name: 'Python', level: 0.88, color: '#3776ab', pos: [0, -2, 0] },
    { name: 'MongoDB', level: 0.82, color: '#47a248', pos: [-2, -1, 0] },
    { name: 'Next.js', level: 0.87, color: '#ffffff', pos: [-2, 1, 0] },
  ];
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  
  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={1} floatIntensity={2}>
          <group position={skill.pos}>
            <mesh>
              <cylinderGeometry args={[0.6, 0.6, skill.level * 3, 32]} />
              <meshStandardMaterial 
                color={skill.color} 
                emissive={skill.color}
                emissiveIntensity={0.5}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
            <Text
              position={[0, skill.level * 1.5 + 0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
            <Text
              position={[0, -1.8, 0]}
              fontSize={0.25}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
            >
              {Math.round(skill.level * 100)}%
            </Text>
          </group>
        </Float>
      ))}
      
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff6347" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffd700" />
    </group>
  );
}

// Projects Section 3D
function ProjectsScene() {
  const groupRef = useRef();
  const [activeProject, setActiveProject] = useState(0);
  
  const projects = [
    { name: 'HEALTHCARE\nAPP', tech: 'React Native', color: '#ff4500' },
    { name: 'FINTECH\nPLATFORM', tech: 'MERN Stack', color: '#ffd700' },
    { name: 'COMMUNITY\nPORTAL', tech: 'Next.js', color: '#ff6347' },
    { name: 'AI CHATBOT', tech: 'Python + ML', color: '#ff8c00' },
  ];
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });
  
  return (
    <group ref={groupRef}>
      {projects.map((project, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1.5}>
            <group 
              position={[x, 0, z]}
              onPointerOver={() => setActiveProject(i)}
              onPointerOut={() => setActiveProject(null)}
            >
              <mesh scale={activeProject === i ? 1.4 : 1}>
                <octahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                  color={project.color}
                  distort={0.5}
                  speed={2.5}
                  metalness={0.9}
                  roughness={0.1}
                  emissive={project.color}
                  emissiveIntensity={activeProject === i ? 0.9 : 0.5}
                />
              </mesh>
              <Text
                position={[0, 1.8, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
              >
                {project.name}
              </Text>
              <Text
                position={[0, -1.5, 0]}
                fontSize={0.2}
                color="#ffd700"
                anchorX="center"
                anchorY="middle"
              >
                {project.tech}
              </Text>
            </group>
          </Float>
        );
      })}
      
      <ambientLight intensity={0.6} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#ff4500" />
      <pointLight position={[-8, -8, -8]} intensity={1.5} color="#ffd700" />
    </group>
  );
}

// Social Impact Section 3D
function SocialScene() {
  const groupRef = useRef();
  
  const impacts = [
    { text: 'MEDICAL\nCAMPS', icon: '🏥', color: '#ff4500', pos: [0, 3, 0] },
    { text: 'EDUCATION\nDRIVES', icon: '📚', color: '#ffd700', pos: [3, 1.5, 0] },
    { text: 'BLOOD\nDONATION', icon: '🩸', color: '#ff0000', pos: [3, -1.5, 0] },
    { text: 'COMMUNITY\nOUTREACH', icon: '🤝', color: '#ff6347', pos: [0, -3, 0] },
    { text: 'AWARENESS\nCAMPAIGNS', icon: '📢', color: '#ff8c00', pos: [-3, -1.5, 0] },
    { text: 'VOLUNTEER\nWORK', icon: '👥', color: '#ffa500', pos: [-3, 1.5, 0] },
  ];
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });
  
  return (
    <group ref={groupRef}>
      {impacts.map((impact, i) => (
        <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={0.8} floatIntensity={2}>
          <group position={impact.pos}>
            <mesh>
              <sphereGeometry args={[0.8, 32, 32]} />
              <MeshDistortMaterial
                color={impact.color}
                distort={0.4}
                speed={2}
                metalness={0.8}
                roughness={0.2}
                emissive={impact.color}
                emissiveIntensity={0.6}
              />
            </mesh>
            <Text
              position={[0, 0, 0.9]}
              fontSize={0.6}
              anchorX="center"
              anchorY="middle"
            >
              {impact.icon}
            </Text>
            <Text
              position={[0, -1.3, 0]}
              fontSize={0.22}
              color="white"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
            >
              {impact.text}
            </Text>
          </group>
        </Float>
      ))}
      
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ff4500" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ffd700" />
    </group>
  );
}

// Contact Section 3D
function ContactScene() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  
  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh>
          <torusKnotGeometry args={[2, 0.6, 128, 16]} />
          <MeshDistortMaterial
            color="#ff4500"
            distort={0.6}
            speed={3}
            metalness={0.9}
            roughness={0.1}
            emissive="#ff6347"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>
      
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.8}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        LET'S CONNECT
        <meshStandardMaterial emissive="#ffd700" emissiveIntensity={0.5} />
      </Text>
      
      {['📧', '💼', '🔗'].map((icon, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={1} floatIntensity={1.5}>
          <Text
            position={[(i - 1) * 2.5, -2.5, 0]}
            fontSize={1}
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        </Float>
      ))}
      
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#ff4500" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#ffd700" />
    </group>
  );
}

// Main Component
export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0);
  
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0 && currentSection < 5) {
        setCurrentSection(prev => Math.min(prev + 1, 5));
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => Math.max(prev - 1, 0));
      }
    };
    
    let timeout;
    const throttledScroll = (e) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleScroll(e);
          timeout = null;
        }, 800);
      }
    };
    
    window.addEventListener('wheel', throttledScroll);
    return () => window.removeEventListener('wheel', throttledScroll);
  }, [currentSection]);
  
  const sections = [
    { component: HeroScene, bg: 'from-black via-red-950/20 to-black' },
    { component: AboutScene, bg: 'from-black via-orange-950/20 to-black' },
    { component: SkillsScene, bg: 'from-black via-yellow-950/20 to-black' },
    { component: ProjectsScene, bg: 'from-black via-red-950/30 to-black' },
    { component: SocialScene, bg: 'from-black via-orange-950/30 to-black' },
    { component: ContactScene, bg: 'from-black via-yellow-950/30 to-black' },
  ];
  
  const CurrentScene = sections[currentSection].component;
  
  return (
    <div className={`w-full h-screen overflow-hidden bg-gradient-to-b ${sections[currentSection].bg} transition-all duration-1000`}>
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <Suspense fallback={null}>
          <CurrentScene />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
        {['HERO', 'ABOUT', 'SKILLS', 'PROJECTS', 'IMPACT', 'CONTACT'].map((label, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              currentSection === i ? 'scale-110' : 'scale-100 opacity-50'
            }`}
          >
            <span className="text-xs text-orange-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
            <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === i 
                ? 'bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/50' 
                : 'border-orange-500/50'
            }`} />
          </button>
        ))}
      </div>
      
      {/* Scroll Hint */}
      {currentSection < 5 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="text-orange-400 text-sm font-bold">SCROLL TO EXPLORE</div>
          <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-transparent rounded-full mx-auto mt-2"></div>
        </div>
      )}
    </div>
  );
}