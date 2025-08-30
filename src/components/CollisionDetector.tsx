import React, { useEffect, useRef } from 'react';

interface CollisionDetectorProps {
  ballPosition: { x: number; y: number };
  ballRadius: number;
}

const CollisionDetector: React.FC<CollisionDetectorProps> = ({ ballPosition, ballRadius }) => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const collisionStatesRef = useRef<Map<HTMLElement, boolean>>(new Map());
  const debugIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create debug indicator if it doesn't exist
    if (!debugIndicatorRef.current) {
      const debugIndicator = document.createElement('div');
      debugIndicator.style.position = 'fixed';
      debugIndicator.style.width = `${ballRadius * 2}px`;
      debugIndicator.style.height = `${ballRadius * 2}px`;
      debugIndicator.style.borderRadius = '50%';
      debugIndicator.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
      debugIndicator.style.border = '2px solid red';
      debugIndicator.style.pointerEvents = 'none';
      debugIndicator.style.zIndex = '9999';
      debugIndicator.style.transition = 'all 0.1s ease';
      debugIndicatorRef.current = debugIndicator;
      document.body.appendChild(debugIndicator);
    }

    // Get all card elements
    const cards = Array.from(document.querySelectorAll('.glass-effect')) as HTMLElement[];
    cardsRef.current = cards;

    // Initialize collision states
    cards.forEach(card => {
      collisionStatesRef.current.set(card, false);
    });

    // Function to check collision between ball and card
    const checkCollision = (ballPos: { x: number; y: number }, ballRad: number) => {
      // Update debug indicator position
      if (debugIndicatorRef.current) {
        const screenX = (ballPos.x + 5) * (window.innerWidth / 10);
        const screenY = window.innerHeight / 2 + ballPos.y * 100;
        debugIndicatorRef.current.style.left = `${screenX - ballRad}px`;
        debugIndicatorRef.current.style.top = `${screenY - ballRad}px`;
      }

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Convert ball position from Three.js coordinates to screen coordinates
        const screenX = (ballPos.x + 5) * (window.innerWidth / 10); // Convert from -5 to +5 range to screen width
        const screenY = window.innerHeight / 2 + ballPos.y * 100; // Convert from Three.js Y to screen Y
        
        // Calculate distance between ball center and card center
        const distanceX = Math.abs(screenX - cardCenterX);
        const distanceY = Math.abs(screenY - cardCenterY);
        
        // Check if ball overlaps with card (considering ball radius)
        const collisionX = distanceX < (rect.width / 2 + ballRad);
        const collisionY = distanceY < (rect.height / 2 + ballRad);
        
        const isColliding = collisionX && collisionY;
        const wasColliding = collisionStatesRef.current.get(card);
        
        if (isColliding && !wasColliding) {
          // Collision just started - add collision class
          card.classList.add('collision-active');
          
          // Add ripple effect
          addRippleEffect(card, screenX, screenY);
          
          // Update collision state
          collisionStatesRef.current.set(card, true);
        } else if (!isColliding && wasColliding) {
          // Collision ended - remove collision class
          card.classList.remove('collision-active');
          
          // Update collision state
          collisionStatesRef.current.set(card, false);
        }
      });
    };

    // Function to add ripple effect on collision
    const addRippleEffect = (card: HTMLElement, ballX: number, ballY: number) => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('div');
      
      ripple.className = 'collision-ripple';
      ripple.style.left = `${ballX - rect.left}px`;
      ripple.style.top = `${ballY - rect.top}px`;
      
      card.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 800);
    };

    // Check collision on every frame
    const checkCollisionInterval = setInterval(() => {
      checkCollision(ballPosition, ballRadius);
    }, 16); // ~60fps

    return () => {
      clearInterval(checkCollisionInterval);
      
      // Reset all cards to original state
      cards.forEach(card => {
        card.classList.remove('collision-active');
        
        // Remove any remaining ripple effects
        const ripples = card.querySelectorAll('.collision-ripple');
        ripples.forEach(ripple => ripple.remove());
      });
      
      // Remove debug indicator
      if (debugIndicatorRef.current && debugIndicatorRef.current.parentNode) {
        debugIndicatorRef.current.parentNode.removeChild(debugIndicatorRef.current);
        debugIndicatorRef.current = null;
      }
      
      // Clear collision states
      collisionStatesRef.current.clear();
    };
  }, [ballPosition, ballRadius]);

  return null; // This component doesn't render anything visible
};

export default CollisionDetector;
