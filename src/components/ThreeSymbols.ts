import * as THREE from 'three';

// --- 3D OBJECT HELPERS ---
export function createWifiSymbol() {
  const group = new THREE.Group();
  const scale = 5;
  for (let i = 0; i < 3; i++) {
    const arcGeometry = new THREE.TorusGeometry(
      scale * (0.18 + i * 0.09),
      scale * 0.018,
      8,
      32,
      Math.PI
    );
    const arcMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.7 - i * 0.18,
      shininess: 100,
      depthTest: false,
    });
    const arc = new THREE.Mesh(arcGeometry, arcMaterial);
    arc.position.y = scale * (0.25 + i * 0.06);
    arc.rotation.x = Math.PI / 2;
    group.add(arc);
  }
  const wifiDotGeometry = new THREE.SphereGeometry(scale * 0.025, 12, 12);
  const wifiDotMaterial = new THREE.MeshPhongMaterial({
    color: 0x3b82f6,
    shininess: 100,
    depthTest: false,
  });
  const wifiDot = new THREE.Mesh(wifiDotGeometry, wifiDotMaterial);
  wifiDot.position.y = scale * 0.18;
  group.add(wifiDot);
  return group;
}

export function createMsgSymbol() {
  const group = new THREE.Group();
  const envelopeBodyGeometry = new THREE.BoxGeometry(0.65, 0.4, 0.1);
  const envelopeBodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x60a5fa,
    shininess: 80,
    depthTest: false,
  });
  const envelopeBody = new THREE.Mesh(envelopeBodyGeometry, envelopeBodyMaterial);
  group.add(envelopeBody);

  const flapShape = new THREE.Shape();
  flapShape.moveTo(-0.325, 0.2);
  flapShape.lineTo(0, 0.4);
  flapShape.lineTo(0.325, 0.2);
  flapShape.lineTo(-0.325, 0.2);
  const flapGeometry = new THREE.ShapeGeometry(flapShape);
  const flapMaterial = new THREE.MeshPhongMaterial({
    color: 0x3b82f6,
    shininess: 100,
    depthTest: false,
  });
  const flap = new THREE.Mesh(flapGeometry, flapMaterial);
  flap.position.z = 0.051;
  group.add(flap);

  return group;
}