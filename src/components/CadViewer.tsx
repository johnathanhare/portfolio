'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Layers, Pause, Play, RotateCcw } from 'lucide-react';

type ModelType = 'bar' | 'taranis4';

interface ModelMeta {
  name: string;
  badge: string;
  material: string;
  process: string;
  evolutionNotes: string;
}

const MODEL_DATA: Record<ModelType, ModelMeta> = {
  bar: {
    name: 'BAR Rocket',
    badge: 'Modular Airframe',
    material: 'PLA+',
    process: 'Blender & CAD • FDM 3D Printed',
    evolutionNotes: 'Bigger, better and more streamlined design sculpted in Blender & CAD. Worked flawlessly on its first flight with soft parachute recovery.'
  },
  taranis4: {
    name: 'Taranis IV',
    badge: 'Final Iteration',
    material: 'PLA+',
    process: 'Blender & CAD • FDM 3D Printed',
    evolutionNotes: 'Final iteration of the Taranis family. Swept-fin geometry tuned with OpenRocket calculations to establish a rock-solid 1.5-caliber apogee margin.'
  }
};

// Procedurally generated standard metric Cavendish banana (~18-20cm reference)
function createBananaMesh(modelType: ModelType = 'bar'): THREE.Group {
  const group = new THREE.Group();

  const points = [
    new THREE.Vector3(-0.18, -1.05, 0),
    new THREE.Vector3(-0.15, -1.0, 0),
    new THREE.Vector3(-0.05, -0.6, 0),
    new THREE.Vector3(0.22, -0.1, 0),
    new THREE.Vector3(0.32, 0.4, 0),
    new THREE.Vector3(0.2, 0.9, 0),
    new THREE.Vector3(-0.05, 1.3, 0),
    new THREE.Vector3(-0.18, 1.48, 0),
    new THREE.Vector3(-0.28, 1.62, 0)
  ];
  const curve = new THREE.CatmullRomCurve3(points);
  const tubularSegments = 36;
  const radialSegments = 7;
  const frames = curve.computeFrenetFrames(tubularSegments, false);

  const vertices: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const p = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    let r: number;
    if (u <= 0.02) {
      r = 0.01;
    } else if (u < 0.1) {
      r = 0.01 + ((u - 0.02) / 0.08) * 0.14;
    } else if (u > 0.92) {
      r = 0.045; // stem
    } else if (u > 0.85) {
      r = 0.045 + ((0.92 - u) / 0.07) * 0.12;
    } else {
      r = 0.22 * Math.pow(Math.sin(Math.PI * ((u - 0.08) / 0.82)), 0.42);
    }

    const color = new THREE.Color();
    if (u < 0.05) {
      color.setHex(0x2a1a08); // dark bottom tip
    } else if (u > 0.90) {
      color.setHex(0x403b1c); // stem
    } else if (u > 0.82) {
      color.setHex(0xbdc631); // greenish yellow shoulder
    } else {
      color.setHex(0xfacc15); // golden banana yellow
    }

    for (let j = 0; j <= radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);

      const vx = p.x + r * (cos * N.x + sin * B.x);
      const vy = p.y + r * (cos * N.y + sin * B.y);
      const vz = p.z + r * (cos * N.z + sin * B.z);

      vertices.push(vx, vy, vz);
      colors.push(color.r, color.g, color.b);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.35,
    metalness: 0.05,
    flatShading: true
  });

  const mesh = new THREE.Mesh(geometry, mat);
  mesh.castShadow = true;
  group.add(mesh);

  // Scaled to match physical ~18cm banana vs rocket airframe
  if (modelType === 'taranis4') {
    // Taranis IV was ~19cm tall, approximately the exact length of a standard banana (~18cm)
    // Scaled 1:1 with Taranis IV mesh in viewport (~7.5 units)
    group.scale.set(2.7, 2.7, 2.7);
    group.position.set(2.6, -0.85, 0);
    group.rotation.z = -0.06;
  } else {
    // BAR stands ~75cm tall (~4.2x the length of a standard 18cm banana)
    group.scale.set(0.78, 0.78, 0.78);
    group.position.set(2.4, -3.2, 0);
    group.rotation.z = -0.15;
  }

  return group;
}

export default function CadViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelType>('bar');
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showBanana, setShowBanana] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const currentMeshRef = useRef<THREE.Group | null>(null);
  const bananaMeshRef = useRef<THREE.Group | null>(null);
  const showBananaRef = useRef(false);
  const isRotatingRef = useRef(true);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    showBananaRef.current = showBanana;
    if (bananaMeshRef.current) {
      bananaMeshRef.current.visible = showBanana;
    }
  }, [showBanana]);

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 30;
    controls.minDistance = 3;
    controlsRef.current = controls;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.8);
    dirLight1.position.set(12, 18, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight2.position.set(-12, -8, -12);
    scene.add(dirLight2);

    // Grid base
    const gridHelper = new THREE.GridHelper(18, 18, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // 4. Load STL model
    const loadModel = (type: ModelType) => {
      setIsLoading(true);
      if (currentMeshRef.current) {
        scene.remove(currentMeshRef.current);
      }

      const group = new THREE.Group();
      const stlLoader = new STLLoader();

      const stlPaths: Record<ModelType, string> = {
        bar: '/models/BAR.stl',
        taranis4: '/models/taranis-4.stl'
      };

      const path = stlPaths[type] || stlPaths['bar'];

      const cyanMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.75,
        roughness: 0.3,
        wireframe: isWireframe
      });

      stlLoader.load(
        path,
        (geometry) => {
          geometry.computeVertexNormals();
          geometry.center();
          geometry.computeBoundingBox();

          const box = geometry.boundingBox!;
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetSize = 8;
          const scale = targetSize / maxDim;

          const mesh = new THREE.Mesh(geometry, cyanMat);
          mesh.scale.set(scale, scale, scale);
          
          // Vertical rocket orientation
          mesh.rotation.x = -Math.PI / 2;
          mesh.position.y = 0;

          group.add(mesh);

          // Standard Metric Banana for Scale (~18-20cm reference)
          const banana = createBananaMesh(type);
          banana.visible = showBananaRef.current;
          bananaMeshRef.current = banana;
          group.add(banana);

          currentMeshRef.current = group;
          scene.add(group);
          setIsLoading(false);
        },
        undefined,
        (err) => {
          console.error('Error loading STL:', err);
          setIsLoading(false);
        }
      );
    };

    loadModel(activeModel);

    // 5. Animation loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();

      if (currentMeshRef.current && isRotatingRef.current) {
        currentMeshRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize handling
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeModel, isWireframe]);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const meta = MODEL_DATA[activeModel] || MODEL_DATA['bar'];

  return (
    <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:p-6 technical-glow backdrop-blur-xl">
      {/* CAD Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-cyan-400 font-semibold">
              Interactive 3D WebGL CAD Viewport
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real physical rocket geometry • Click & drag to rotate, scroll to zoom
          </p>
        </div>

        {/* Model Switcher Tabs: BAR and Taranis IV only */}
        <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveModel('bar')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeModel === 'bar'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            01. BAR Rocket
          </button>
          <button
            onClick={() => setActiveModel('taranis4')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeModel === 'taranis4'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            02. Taranis IV
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative mt-4 h-[380px] md:h-[460px] w-full rounded-xl bg-slate-900/50 border border-slate-800/60 overflow-hidden">
        <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs font-mono text-xs text-cyan-400">
            <span>Loading STL Mesh Data...</span>
          </div>
        )}

        {/* Floating Viewport Tool HUD */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-lg p-1.5 z-10">
          <button
            onClick={() => setShowBanana(!showBanana)}
            title={showBanana ? 'Hide Banana for Scale' : 'Show Banana for Scale (~18cm Standard Cavendish)'}
            className={`px-2.5 py-1 rounded transition flex items-center gap-1.5 text-xs font-mono font-medium ${
              showBanana
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-amber-300'
            }`}
          >
            <span className="text-sm leading-none">🍌</span>
            <span>Banana Scale</span>
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
          >
            {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe Mesh"
            className={`p-1.5 rounded transition ${
              isWireframe ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Layers className="h-4 w-4" />
          </button>
          <button
            onClick={resetView}
            title="Reset Camera View"
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Clean HUD Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-400">
          <div className="text-cyan-400 font-bold flex items-center gap-2">
            <span>{meta.name}</span>
            <span className="text-[10px] uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/40 px-1.5 rounded">
              {meta.badge}
            </span>
            {showBanana && (
              <span className="text-[10px] uppercase bg-amber-950 text-amber-300 border border-amber-800/50 px-1.5 rounded font-bold flex items-center gap-1 animate-pulse">
                <span>🍌</span>
                <span>{activeModel === 'taranis4' ? '1:1 Banana Scale (~19cm)' : 'Cavendish Banana (~18cm)'}</span>
              </span>
            )}
          </div>
          <div className="text-slate-500 text-[10px] mt-0.5">
            {showBanana
              ? activeModel === 'taranis4'
                ? 'PHYSICAL SCALE: 1:1 WITH A STANDARD CAVENDISH BANANA (~19cm)'
                : 'METRIC SCALE: 1x STANDARD CAVENDISH BANANA (18cm / 7.1 in)'
              : 'ORBIT CONTROLS ACTIVE • ROTATE & ZOOM'}
          </div>
        </div>
      </div>

      {/* Technical CAD Specification Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
        <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-3">
          <span className="text-slate-500 block text-[10px] uppercase">Material Specification</span>
          <span className="text-cyan-400 font-semibold">{meta.material}</span>
        </div>
        <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-3">
          <span className="text-slate-500 block text-[10px] uppercase">Design & Process</span>
          <span className="text-slate-200 font-semibold">{meta.process}</span>
        </div>
      </div>

      {/* Evolution Note */}
      <div className="mt-3 rounded-lg bg-cyan-950/20 border border-cyan-800/30 px-3.5 py-2.5 text-xs text-slate-300 flex items-start gap-2">
        <span className="text-cyan-400 font-bold font-mono shrink-0">ITERATION NOTE:</span>
        <span className="leading-relaxed">{meta.evolutionNotes}</span>
      </div>

      {/* Banana for Scale Reference Note */}
      {showBanana && (
        <div className="mt-2.5 rounded-lg bg-amber-950/20 border border-amber-800/40 px-3.5 py-2 text-xs text-amber-200/90 flex items-center gap-2 font-mono">
          <span className="text-sm">🍌</span>
          <span>
            {activeModel === 'taranis4' ? (
              <>
                <strong>Physical Scale Reference:</strong> Taranis IV stood ~19cm (7.5 in) tall — about the exact length of a standard 18cm Cavendish banana (1:1 scale).
              </>
            ) : (
              <>
                <strong>Physical Scale Reference:</strong> Proportional to a standard 18cm (7.1 in) Cavendish banana. BAR stands ~75cm tall (~4.2 bananas tall).
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
