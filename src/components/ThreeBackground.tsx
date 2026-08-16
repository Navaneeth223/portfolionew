'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check performance preferences & viewport width
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 100 : 200;
    const maxDistance = isMobile ? 3.5 : 4.2;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d0a, 0.04);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // --- 1. Nodes (Points) & Constellation Lines ---
    const basePositions = new Float32Array(count * 3);
    const currentPositions = new Float32Array(count * 3);

    const radius = 10;
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(currentPositions, 3)
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x7cff9e,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // Dynamic lines buffer between nearest neighbors
    const maxLineConnections = count * 6;
    const linePositions = new Float32Array(maxLineConnections * 6);
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x3e5c46,
      transparent: true,
      opacity: 0.35,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineSegments);

    // --- 2. Central Wireframe Icosahedron Core ---
    const icoGeometry = new THREE.IcosahedronGeometry(4.5, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoMaterial = new THREE.LineBasicMaterial({
      color: 0x7cff9e,
      transparent: true,
      opacity: 0.15,
    });
    const icoMesh = new THREE.LineSegments(icoWireframe, icoMaterial);
    scene.add(icoMesh);

    // --- 3. Interactive State & GSAP Scrub ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let burstFactor = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };

    const handleClick = () => {
      // Spike burst pulse outward and decay
      burstFactor = 1.6;
      gsap.to({ val: 1.6 }, {
        val: 0,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: function () {
          burstFactor = this.targets()[0].val;
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // GSAP ScrollTrigger for scene rotation tied to scroll
    const scrollObj = { rotationY: 0, rotationX: 0 };
    const trigger = gsap.to(scrollObj, {
      rotationY: Math.PI * 3,
      rotationX: Math.PI * 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });

    // --- 4. Animation Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Mouse Parallax Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Group rotation = scroll scrub + mouse parallax + gentle idle drift
      const currentRotY = scrollObj.rotationY + mouse.x * 0.5 + elapsedTime * 0.05;
      const currentRotX = scrollObj.rotationX - mouse.y * 0.5 + Math.sin(elapsedTime * 0.2) * 0.1;

      pointCloud.rotation.y = currentRotY;
      pointCloud.rotation.x = currentRotX;
      lineSegments.rotation.y = currentRotY;
      lineSegments.rotation.x = currentRotX;

      icoMesh.rotation.y = -currentRotY * 1.2;
      icoMesh.rotation.x = -currentRotX * 1.2;

      // Update node positions with burst pulse effect
      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];

        // Pulse offset calculation
        const distFromCenter = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const pulse = 1 + (burstFactor * 0.4 * Math.sin(distFromCenter - elapsedTime * 3));

        posAttr.setXYZ(i, bx * pulse, by * pulse, bz * pulse);
      }
      posAttr.needsUpdate = true;

      // Recalculate line connections between close neighbors
      let lineVertexIndex = 0;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        for (let j = i + 1; j < count; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance && lineVertexIndex < maxLineConnections * 6) {
            linePositions[lineVertexIndex++] = x1;
            linePositions[lineVertexIndex++] = y1;
            linePositions[lineVertexIndex++] = z1;
            linePositions[lineVertexIndex++] = x2;
            linePositions[lineVertexIndex++] = y2;
            linePositions[lineVertexIndex++] = z2;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineVertexIndex / 3);
      (linesGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 5. Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      trigger.kill();

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      icoGeometry.dispose();
      icoWireframe.dispose();
      icoMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
