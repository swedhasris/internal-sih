import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Atom3D, Bond3D } from '../../types/chemist';
import { RotateCcw, Maximize2, Layers, Info } from 'lucide-react';

interface MoleculeViewer3DProps {
  atoms: Atom3D[];
  bonds: Bond3D[];
  chemicalName: string;
  formula: string;
}

type RenderMode = 'ball-and-stick' | 'space-filling' | 'wireframe';

const CPK_COLORS: Record<string, number> = {
  C: 0x333333,
  H: 0xf8fafc,
  O: 0xdc2626,
  N: 0x2563eb,
  Cl: 0x16a34a,
  Na: 0x9333ea,
  S: 0xeab308,
  P: 0xf97316,
};

const ATOM_RADII: Record<string, { ball: number; space: number }> = {
  H: { ball: 0.25, space: 0.5 },
  C: { ball: 0.45, space: 0.85 },
  N: { ball: 0.42, space: 0.82 },
  O: { ball: 0.40, space: 0.80 },
  Cl: { ball: 0.52, space: 0.95 },
  Na: { ball: 0.58, space: 1.1 },
  S: { ball: 0.50, space: 0.90 },
  P: { ball: 0.48, space: 0.88 },
};

export const MoleculeViewer3D: React.FC<MoleculeViewer3DProps> = ({
  atoms,
  bonds,
  chemicalName,
  formula,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('ball-and-stick');
  const [hoveredAtom, setHoveredAtom] = useState<Atom3D | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const reqAnimationRef = useRef<number | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 350;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a); // Dark Lab Canvas
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Clear previous canvas
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00c2c2, 0.5); // Teal rim light
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // 5. Molecule Group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Rebuild Molecule Mesh
    rebuildMolecule(renderMode, atoms, bonds, moleculeGroup);

    // Center camera on molecule center of mass
    const bbox = new THREE.Box3().setFromObject(moleculeGroup);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    moleculeGroup.position.sub(center); // Recenter molecule group

    // Animation Loop
    const animate = () => {
      reqAnimationRef.current = requestAnimationFrame(animate);

      if (isRotating && !isDraggingRef.current && moleculeGroupRef.current) {
        moleculeGroupRef.current.rotation.y += 0.008;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimationRef.current) cancelAnimationFrame(reqAnimationRef.current);
      renderer.dispose();
    };
  }, [atoms, bonds, renderMode]);

  // Handle Molecule Mesh Construction
  const rebuildMolecule = (
    mode: RenderMode,
    atomList: Atom3D[],
    bondList: Bond3D[],
    group: THREE.Group
  ) => {
    // Clear group
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }

    // Map atoms to THREE Vector3
    const atomPositions: Record<number, THREE.Vector3> = {};

    atomList.forEach((atom) => {
      const pos = new THREE.Vector3(atom.x, atom.y, atom.z);
      atomPositions[atom.id] = pos;

      const color = CPK_COLORS[atom.element] || 0x00a6a6;
      const radiusInfo = ATOM_RADII[atom.element] || { ball: 0.4, space: 0.8 };
      const radius = mode === 'space-filling' ? radiusInfo.space : radiusInfo.ball;

      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      let material: THREE.Material;

      if (mode === 'wireframe') {
        material = new THREE.MeshBasicMaterial({ color, wireframe: true });
      } else {
        material = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.25,
          metalness: 0.1,
        });
      }

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(pos);
      sphere.userData = { atom };
      group.add(sphere);
    });

    // Draw Bonds if not Space-Filling
    if (mode !== 'space-filling') {
      bondList.forEach((bond) => {
        const p1 = atomPositions[bond.source];
        const p2 = atomPositions[bond.target];
        if (!p1 || !p2) return;

        const distance = p1.distanceTo(p2);
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        const isMultiple = bond.order > 1;
        const bondCount = bond.order === 2 ? 2 : bond.order === 3 ? 3 : 1;

        for (let i = 0; i < bondCount; i++) {
          const cylinderRadius = mode === 'wireframe' ? 0.04 : 0.08;
          const geometry = new THREE.CylinderGeometry(
            cylinderRadius,
            cylinderRadius,
            distance,
            16
          );
          const material = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.4,
          });

          const cylinder = new THREE.Mesh(geometry, material);
          cylinder.position.copy(midPoint);

          // Calculate offset for double/triple bonds
          if (isMultiple) {
            const offsetAmount = (i - (bondCount - 1) / 2) * 0.15;
            cylinder.position.x += offsetAmount;
          }

          // Orient cylinder between p1 and p2
          const orientation = new THREE.Matrix4();
          orientation.lookAt(p1, p2, new THREE.Object3D().up);
          orientation.multiply(
            new THREE.Matrix4().makeRotationX(Math.PI / 2)
          );
          cylinder.setRotationFromMatrix(orientation);

          group.add(cylinder);
        }
      });
    }
  };

  // Mouse drag handler for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !moleculeGroupRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    moleculeGroupRef.current.rotation.y += deltaX * 0.01;
    moleculeGroupRef.current.rotation.x += deltaY * 0.01;

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z += e.deltaY * 0.005;
    cameraRef.current.position.z = Math.max(3, Math.min(20, cameraRef.current.position.z));
  };

  const resetCamera = () => {
    if (cameraRef.current && moleculeGroupRef.current) {
      cameraRef.current.position.set(0, 0, 9);
      moleculeGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full h-[380px] bg-[#0A0A0A] rounded-xl overflow-hidden border border-[#292D29] shadow-lg group font-tight">
      {/* Viewport Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Top Left Overlay Header */}
      <div className="absolute top-3 left-3 bg-[#151515]/90 backdrop-blur-md border border-[#292D29] rounded-lg px-3 py-1.5 flex items-center gap-2 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-[#4F8F3A] animate-pulse" />
        <span className="text-xs font-semibold text-white tracking-wide">{chemicalName}</span>
        <span className="text-xs font-mono text-[#78A85A]">{formula}</span>
      </div>

      {/* Top Right Render Mode Switcher */}
      <div className="absolute top-3 right-3 flex items-center bg-[#151515]/90 backdrop-blur-md border border-[#292D29] p-1 rounded-lg gap-1">
        <button
          onClick={() => setRenderMode('ball-and-stick')}
          className={`px-2 py-1 text-xs font-medium rounded transition-all ${
            renderMode === 'ball-and-stick'
              ? 'bg-[#4F8F3A] text-white shadow-xs'
              : 'text-[#9AA397] hover:text-white'
          }`}
          title="Ball and Stick Representation"
        >
          Ball & Stick
        </button>
        <button
          onClick={() => setRenderMode('space-filling')}
          className={`px-2 py-1 text-xs font-medium rounded transition-all ${
            renderMode === 'space-filling'
              ? 'bg-[#4F8F3A] text-white shadow-xs'
              : 'text-[#9AA397] hover:text-white'
          }`}
          title="Space Filling Representation"
        >
          Space Filling
        </button>
        <button
          onClick={() => setRenderMode('wireframe')}
          className={`px-2 py-1 text-xs font-medium rounded transition-all ${
            renderMode === 'wireframe'
              ? 'bg-[#4F8F3A] text-white shadow-xs'
              : 'text-[#9AA397] hover:text-white'
          }`}
          title="Wireframe Mesh Representation"
        >
          Wireframe
        </button>
      </div>

      {/* Bottom Left Controls */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg backdrop-blur-md border border-[#292D29] transition-all flex items-center gap-1.5 ${
            isRotating
              ? 'bg-[#24451F] text-[#78A85A] border-[#4F8F3A]/30'
              : 'bg-[#151515] text-[#9AA397] hover:text-white'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          {isRotating ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
        </button>

        <button
          onClick={resetCamera}
          className="p-1.5 bg-[#151515] hover:bg-[#24451F] text-[#9AA397] hover:text-white rounded-lg border border-[#292D29] text-xs"
          title="Reset View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Right Legend */}
      <div className="absolute bottom-3 right-3 bg-[#151515]/90 backdrop-blur-md border border-[#292D29] rounded-lg px-3 py-1.5 flex items-center gap-3 text-[11px] text-[#9AA397]">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#333333] border border-slate-600 inline-block" />
          <span>C</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400 inline-block" />
          <span>H</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" />
          <span>O</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] inline-block" />
          <span>N</span>
        </div>
      </div>
    </div>
  );
};
