"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

export interface HalftonePortraitProps {
  imageSrc?: string;
  className?: string;
  density?: number;
  isMotionEnabled?: boolean;
}

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 res = uResolution;
  vec2 imgRes = uImageResolution;
  float screenAspect = res.x / res.y;
  float imgAspect = imgRes.x / imgRes.y;

  vec2 uv = vUv;
  if (screenAspect > imgAspect) {
    float s = imgAspect / screenAspect;
    uv.x = (uv.x - 0.5) / s + 0.5;
  } else {
    float s = screenAspect / imgAspect;
    uv.y = 1.0 - (1.0 - uv.y) / s;
  }

  // Outside image bounds -> transparent
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Mouse-responsive subtle CRT wave displacement (only active when motion is enabled)
  vec2 mouseDelta = uv - uMouse;
  float mouseDist = length(mouseDelta);
  float mouseInfluence = exp(-mouseDist * 6.5) * uMouseStrength;
  vec2 wave = normalize(mouseDelta + vec2(0.0001)) * mouseInfluence * 0.014 * sin(uTime * 2.2 + mouseDist * 14.0);
  vec2 distortedUv = uv + wave;

  // Sample the real studio photo with full optical clarity and sharpness
  vec4 photo = texture2D(uTexture, distortedUv);
  float lum = dot(photo.rgb, vec3(0.299, 0.587, 0.114));

  if (lum < 0.015) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // High-Frequency CRT Signal Raster & Micro-Phosphor Scanlines (subtle 8% texture, 92% photo clarity)
  float scanlineY = distortedUv.y * 280.0 + sin(distortedUv.x * 16.0 + uTime * 1.2) * 0.35;
  float scanline = sin(scanlineY * 3.14159) * 0.5 + 0.5;
  float dotMatrix = sin(distortedUv.x * 360.0) * sin(distortedUv.y * 360.0) * 0.5 + 0.5;

  float signalTexture = mix(0.94, 1.06, scanline * 0.65 + dotMatrix * 0.35);
  vec3 texturedPhoto = photo.rgb * signalTexture;

  // Directional warm amber rim light on the right edge
  float rightRim = smoothstep(0.62, 0.94, distortedUv.x);
  vec3 amberColor = vec3(1.0, 0.62, 0.18);
  vec3 finalRgb = mix(texturedPhoto, texturedPhoto + amberColor * 0.12 * rightRim, rightRim * 0.6);

  // Smooth vertical dissolve at the bottom into obsidian background
  float bottomFade = smoothstep(0.01, 0.18, distortedUv.y);
  float alpha = smoothstep(0.01, 0.05, lum) * bottomFade;

  gl_FragColor = vec4(finalRgb, alpha);
}
`;

export function HalftonePortrait({
  imageSrc = "/images/ridam-portrait.webp",
  className = "",
  density = 110,
  isMotionEnabled = true,
}: HalftonePortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const [isWebGLActive, setIsWebGLActive] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    const host = canvasHostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const width = host.clientWidth || 600;
    const height = host.clientHeight || 750;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.className = "w-full h-full object-contain pointer-events-none";
    host.appendChild(canvas);

    // Scene & Orthographic Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1000, 1250) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: isMotionEnabled ? 1.0 : 0.0 },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Texture Loading
    const textureLoader = new THREE.TextureLoader();
    let activeTexture: THREE.Texture | null = null;

    textureLoader.load(
      imageSrc,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        activeTexture = tex;
        material.uniforms.uTexture.value = tex;
        if (tex.image && tex.image.width && tex.image.height) {
          material.uniforms.uImageResolution.value.set(
            tex.image.width,
            tex.image.height
          );
        }
        setIsWebGLActive(true);
      },
      undefined,
      () => {
        // Fallback remains visible
      }
    );

    // Mouse Tracking with smooth lerping
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse.targetX = Math.max(0, Math.min(1, x));
      mouse.targetY = Math.max(0, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!host || !renderer) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number | null = null;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(host);

    const clock = new THREE.Clock();

    const animate = () => {
      if (isVisible) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        material.uniforms.uMouse.value.set(mouse.x, mouse.y);

        if (isMotionEnabled) {
          material.uniforms.uTime.value = clock.getElapsedTime();
          material.uniforms.uMouseStrength.value = 1.0;
        } else {
          material.uniforms.uMouseStrength.value = 0.0;
        }

        renderer?.render(scene, camera);
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      geometry.dispose();
      material.dispose();
      if (activeTexture) activeTexture.dispose();
      renderer?.dispose();

      if (renderer?.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc, density, isMotionEnabled]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 
        High-definition studio portrait:
        ALWAYS VISIBLE on both motion on & off with unoptimized direct loading so it NEVER fails or disappears!
      */}
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt="Ridam Grover — Executive Studio Portrait"
          fill
          unoptimized
          priority
          sizes="(max-width: 768px) 90vw, 680px"
          className="object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* WebGL Canvas Host Container: overlays smooth CRT ripple when motion is enabled */}
      <div
        ref={canvasHostRef}
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${
          isMotionEnabled && isWebGLActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Ambient Backlight Rim Glow */}
      <div className="absolute right-[10%] top-[18%] w-72 h-72 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* Bottom Dissolve Gradient Mask */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent pointer-events-none" />
    </div>
  );
}
