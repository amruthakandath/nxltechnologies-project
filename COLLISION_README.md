# Collision Detection System

This project implements a real-time collision detection system between a moving 3D Earth wireframe ball and interactive cards.

## How It Works

### 1. Ball Movement
- The Earth wireframe moves across the screen based on scroll position
- Horizontal movement: -5 to +5 range across screen width
- Vertical movement: Sinusoidal wave pattern
- Position updates are sent to the collision detector in real-time

### 2. Collision Detection
- **Real-time monitoring**: Collision checks run at ~60fps (16ms intervals)
- **Coordinate conversion**: Three.js 3D coordinates are converted to screen coordinates
- **Distance calculation**: Uses center-to-center distance between ball and cards
- **Collision threshold**: Ball radius + card dimensions determine collision area

### 3. Visual Effects
When a collision is detected:
- **Background change**: Card background becomes white with blue text
- **Scale effect**: Card scales up to 1.08x size
- **Glow effect**: Blue glow around the card
- **Ripple effect**: Animated ripple from collision point
- **Smooth transitions**: All effects use CSS transitions for smooth animation

### 4. Components

#### `EarthWireframe.tsx`
- Renders the 3D Earth wireframe
- Tracks ball position and sends updates to parent
- Handles scroll-based movement

#### `CollisionDetector.tsx`
- Monitors ball position changes
- Detects collisions with `.glass-effect` cards
- Applies visual effects and manages collision states
- Includes debug indicator (red circle) showing ball position

#### `App.tsx`
- Manages ball position state
- Coordinates between EarthWireframe and CollisionDetector

### 5. CSS Classes

#### `.collision-active`
Applied when collision is detected:
```css
.glass-effect.collision-active {
  background: rgba(255, 255, 255, 0.95) !important;
  color: #2563eb !important;
  border-color: #2563eb !important;
  transform: scale(1.08) !important;
  box-shadow: 0 0 40px rgba(37, 99, 235, 0.8) !important;
}
```

#### `.collision-ripple`
Animated ripple effect on collision:
```css
.collision-ripple {
  animation: ripple-expand 0.8s ease-out forwards;
}
```

### 6. Performance Optimizations

- **State tracking**: Only triggers effects when collision state changes
- **CSS classes**: Uses CSS classes instead of inline styles
- **Efficient queries**: Caches card references
- **Cleanup**: Properly removes effects and event listeners

### 7. Debug Features

- **Visual indicator**: Red circle shows exact ball position
- **Real-time updates**: Ball position updates with movement
- **Collision feedback**: Immediate visual response on collision

## Usage

1. Scroll the page to move the Earth ball
2. Watch for collisions with cards (they turn white with blue glow)
3. Observe ripple effects and smooth transitions
4. Use debug indicator to see exact ball position

## Customization

- **Ball radius**: Adjust `ballRadius` prop in App.tsx
- **Collision sensitivity**: Modify collision detection logic in CollisionDetector
- **Visual effects**: Customize CSS classes in App.css
- **Animation timing**: Adjust transition durations and easing functions
