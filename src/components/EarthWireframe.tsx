import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const EarthWireframe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    // Earth wireframe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      opacity: 0.7,
      transparent: true,
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Track scroll progress (0 → 1)
    const getScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? scrollTop / docHeight : 0;
    };

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const progress = getScrollProgress();

      // Move Earth horizontally across the screen (adjust range as needed)
      earth.position.x = (progress - 0.5) * 10; // -5 to +5 across screen
      earth.position.y = Math.sin(progress * Math.PI * 2) * 2; // optional up-down wave

      // Slow rotation
      earth.rotation.y += 0.004;
      earth.rotation.x += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Fullscreen canvas (not fixed to corner anymore)
  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 50,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
};

export default EarthWireframe;
