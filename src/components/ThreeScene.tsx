import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createWifiSymbol, createMsgSymbol } from './ThreeSymbols';

// --- 3D SCENE CONSTANTS ---
const NUM_FLOATING_SYMBOLS = 8;

// --- MAIN COMPONENT ---
const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const frameRef = useRef<number>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (!mountRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 40);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // --- LIGHTING ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    dirLight.position.set(20, 30, 40);
    scene.add(dirLight);

    // --- FLOATING SYMBOLS ---
    const floatingSymbols: {
      mesh: THREE.Group;
      type: 'wifi' | 'msg';
      speed: number;
      x: number;
      z: number;
      yStart: number;
      yEnd: number;
    }[] = [];
    for (let i = 0; i < NUM_FLOATING_SYMBOLS; i++) {
      let mesh: THREE.Group;
      let type: 'wifi' | 'msg';
      if (Math.random() < 0.5) {
        mesh = createWifiSymbol();
        type = 'wifi';
      } else {
        mesh = createMsgSymbol();
        type = 'msg';
      }
      // Random x in [-80, 80], random z, y from top to bottom
      const x = (Math.random() - 0.5) * 160; // -80 to +80
      const z = (Math.random() - 0.5) * 40;
      const yStart = 35 + Math.random() * 10;
      const yEnd = -35 - Math.random() * 10;
      mesh.position.set(x, yStart, z);
      mesh.renderOrder = 999;
      scene.add(mesh);
      floatingSymbols.push({
        mesh,
        type,
        speed: 0.22 + Math.random() * 0.18,
        x,
        z,
        yStart,
        yEnd,
      });
    }

    // --- ANIMATION LOOP ---
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Animate floating symbols: move from top to bottom, reset to top when out of view
      floatingSymbols.forEach((symbol) => {
        symbol.mesh.position.y -= 0.09 * symbol.speed;
        if (symbol.mesh.position.y < symbol.yEnd) {
          symbol.mesh.position.y = symbol.yStart;
        }
        symbol.mesh.position.x = symbol.x;
        symbol.mesh.position.z = symbol.z;
        symbol.mesh.rotation.y = 0;
      });

      // Camera follows scroll (simulate scroll by mapping window.scrollY to camera y)
      if (cameraRef.current) {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        cameraRef.current.position.y = -scrollY / 60;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, cameraRef.current!);
    };

    animate();

    // --- HANDLE RESIZE ---
    const handleResize = () => {
      if (!cameraRef.current || !renderer) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', () => {});

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', () => {});
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <>
  <div ref={mountRef} className="absolute inset-0" />;

  </>
};

export default ThreeScene;