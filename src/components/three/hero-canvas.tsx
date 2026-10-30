"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      // WebGL not supported or sandboxed
      return;
    }

    // Main Torus Knot / Complex Geometric Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Geometry 1: Wireframe Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    coreGroup.add(knotMesh);

    // Geometry 2: Inner Core Icosahedron with glowing vertex points
    const icoGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.3,
      metalness: 0.7,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(icoMesh);

    // Geometry 3: Orbiting Particle Cloud
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // sky blue
    const color2 = new THREE.Color(0x818cf8); // indigo

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    coreGroup.add(particleSystem);

    // Geometry 4: Concentric Gyroscopic Rings
    const ringGeo1 = new THREE.RingGeometry(2.1, 2.12, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(2.3, 2.32, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 20);
    pointLight2.position.set(-4, -3, -2);
    scene.add(pointLight2);

    // Mouse Tracking with dampening
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener("mousemove", onPointerMove);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse orientation dampening
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotations
      knotMesh.rotation.x = elapsedTime * 0.25;
      knotMesh.rotation.y = elapsedTime * 0.35;

      icoMesh.rotation.x = -elapsedTime * 0.3;
      icoMesh.rotation.z = elapsedTime * 0.2;

      particleSystem.rotation.y = elapsedTime * 0.1;
      particleSystem.rotation.x = elapsedTime * 0.05;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.12;

      coreGroup.rotation.y = currentX + elapsedTime * 0.05;
      coreGroup.rotation.x = -currentY;

      // Slight breathing pulse
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      coreGroup.scale.set(scale, scale, scale);

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, [isReducedMotion, isMobile]);

  // Reduced motion or mobile static fallback
  if (isReducedMotion || isMobile) {
    return (
      <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
        {/* Abstract Architectural Tech Composition */}
        <div className="relative size-72 sm:size-80 flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-transparent blur-2xl" />
          
          {/* Outer ring */}
          <div className="absolute size-72 sm:size-80 rounded-full border border-sky-500/20 animate-spin [animation-duration:45s]" />
          
          {/* Middle dashed ring */}
          <div className="absolute size-56 sm:size-64 rounded-full border border-dashed border-indigo-400/30 animate-spin [animation-duration:30s] [animation-direction:reverse]" />
          
          {/* Inner core */}
          <div className="relative size-36 sm:size-44 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-sky-400/30 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-2xl shadow-sky-500/10">
            <div className="size-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-2">
              <span className="text-sky-400 text-lg font-mono font-bold">RG</span>
            </div>
            <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
              Core Systems
            </span>
            <span className="text-[10px] text-zinc-400 font-mono mt-1">
              MERN • Next.js • React
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-300 font-mono">Engine Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      aria-label="Interactive 3D Engineering Core"
      role="img"
    />
  );
}
