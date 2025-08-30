import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const EarthWireframe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const earthRef = useRef<THREE.Mesh>();
  const materialRef = useRef<THREE.MeshBasicMaterial>();

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
      color: 0x3B82F6, // Blue color
      wireframe: true,
      opacity: 0.3,
      transparent: true,
    });
    materialRef.current = material;
    
    const earth = new THREE.Mesh(geometry, material);
    earthRef.current = earth;
    scene.add(earth);

    // Function to check collision with cards
    const checkCollisionWithCards = () => {
      const cards = document.querySelectorAll('.glass-effect');
      const earthScreenPos = getEarthScreenPosition();
      
      let isColliding = false;
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance between earth and card center
        const distance = Math.sqrt(
          Math.pow(earthScreenPos.x - cardCenterX, 2) + 
          Math.pow(earthScreenPos.y - cardCenterY, 2)
        );
        
        // Collision threshold (earth radius + card size)
        const threshold = 100 + Math.max(rect.width, rect.height) / 2;
        
        if (distance < threshold) {
          isColliding = true;
        }
      });
      
      return isColliding;
    };

    // Function to get earth screen position
    const getEarthScreenPosition = () => {
      const progress = getScrollProgress();
      const earthX = (progress - 0.5) * 10;
      const earthY = Math.sin(progress * Math.PI * 2) * 2;
      
      // Convert 3D position to screen coordinates
      const vector = new THREE.Vector3(earthX, earthY, 0);
      vector.project(camera);
      
      return {
        x: (vector.x * 0.5 + 0.5) * window.innerWidth,
        y: (vector.y * -0.5 + 0.5) * window.innerHeight
      };
    };

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

      // Check collision and change color
      const isColliding = checkCollisionWithCards();
      if (materialRef.current) {
        if (isColliding) {
          materialRef.current.color.setHex(0xFFFFFF); // White when colliding
        } else {
          materialRef.current.color.setHex(0x3B82F6); // Blue when not colliding
        }
      }

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

  // Scroll-based highlight for text/cards
  useEffect(() => {
    const styleElementId = 'scroll-highlight-styles';

    if (!document.getElementById(styleElementId)) {
      const style = document.createElement('style');
      style.id = styleElementId;
      style.textContent = `
        /* Base hidden state */
        .highlight-base, [data-highlight], .highlight-on-scroll {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.6s ease, background-color 0.6s ease, color 0.6s ease;
          will-change: opacity, transform;
        }
        /* Visible state */
        .highlight--visible {
          opacity: 1;
          transform: none;
        }
        /* Card emphasis when visible */
        [data-highlight="card"].highlight--visible,
        .highlight-card.highlight--visible {
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }
        /* Text emphasis when visible */
        [data-highlight="text"].highlight--visible,
        .highlight-text.highlight--visible {
          color: inherit;
        }
      `;
      document.head.appendChild(style);
    }

    const elements = Array.from(
      document.querySelectorAll('[data-highlight], .highlight-on-scroll')
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add('highlight--visible');
          } else {
            target.classList.remove('highlight--visible');
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('highlight-base')) {
        el.classList.add('highlight-base');
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
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
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  );
};

export default EarthWireframe;
