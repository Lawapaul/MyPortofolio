import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export interface MascotSceneProps {
  variant?: "hero" | "companion";
  frameless?: boolean;
  className?: string;
}

interface PointerVector {
  x: number;
  y: number;
}

/**
 * Custom Procedural 3D AI Engineer Mascot Model
 * Rotates smoothly in 3D space when the cursor moves across the screen.
 */
const ProceduralRobotMascot: React.FC<{
  pointerRef: React.MutableRefObject<PointerVector>;
  isHovered: boolean;
  greeted: boolean;
  variant: "hero" | "companion";
}> = ({ pointerRef, isHovered, greeted, variant }) => {
  const rootGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const bodyGroup = useRef<THREE.Group>(null);
  const leftHandGroup = useRef<THREE.Group>(null);
  const rightHandGroup = useRef<THREE.Group>(null);
  const coreCrystalRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);
  const ringInnerRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  // Orbiting 3D neural nodes
  const orbitNodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const radius = 1.65 + (i % 3) * 0.28;
        const yOffset = ((i % 5) - 2) * 0.42;
        return {
          angle,
          radius,
          yOffset,
          speed: 0.45 + (i % 4) * 0.14,
          size: i % 3 === 0 ? 0.065 : 0.045,
          color: i % 2 === 0 ? "#E86A33" : "#F29A4A",
        };
      }),
    []
  );

  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;

    // 1. Full 3D Model Rotation following cursor position
    if (rootGroup.current) {
      const targetRootY = px * 0.42 + Math.sin(t * 0.65) * 0.06;
      const targetRootX = -py * 0.22 + Math.cos(t * 0.5) * 0.03;
      const targetRootZ = -px * 0.05;

      rootGroup.current.rotation.y = THREE.MathUtils.lerp(
        rootGroup.current.rotation.y,
        targetRootY,
        Math.min(1, delta * 7.5)
      );
      rootGroup.current.rotation.x = THREE.MathUtils.lerp(
        rootGroup.current.rotation.x,
        targetRootX,
        Math.min(1, delta * 7.5)
      );
      rootGroup.current.rotation.z = THREE.MathUtils.lerp(
        rootGroup.current.rotation.z,
        targetRootZ,
        Math.min(1, delta * 6)
      );
    }

    // 2. Articulated 3D Head extra cursor tracking + subtle nod
    if (headGroup.current) {
      const targetHeadY = px * 0.32;
      const targetHeadX = -py * 0.2 + Math.sin(t * 1.8) * 0.03;
      const targetHeadZ = -px * 0.08 + (greeted ? Math.sin(t * 6) * 0.08 : 0);

      headGroup.current.rotation.y = THREE.MathUtils.lerp(
        headGroup.current.rotation.y,
        targetHeadY,
        Math.min(1, delta * 10)
      );
      headGroup.current.rotation.x = THREE.MathUtils.lerp(
        headGroup.current.rotation.x,
        targetHeadX,
        Math.min(1, delta * 10)
      );
      headGroup.current.rotation.z = THREE.MathUtils.lerp(
        headGroup.current.rotation.z,
        targetHeadZ,
        Math.min(1, delta * 8)
      );
    }

    // 3. Eye pupil shift & natural periodic blink
    const blinkCycle = Math.sin(t * 1.65) > 0.985 ? 0.12 : 1;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x,
        -0.27 + px * 0.07,
        0.2
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y,
        0.06 + py * 0.05,
        0.2
      );
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        blinkCycle,
        0.35
      );

      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x,
        0.27 + px * 0.07,
        0.2
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y,
        0.06 + py * 0.05,
        0.2
      );
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        blinkCycle,
        0.35
      );
    }

    // 4. Torso breathing & hover lift
    if (bodyGroup.current) {
      bodyGroup.current.position.y = -0.68 + Math.sin(t * 2.1) * 0.04;
    }

    // 5. Articulated Floating Hands (Right hand waves when hovered/greeted)
    if (rightHandGroup.current) {
      const waveAngle =
        isHovered || greeted
          ? Math.sin(t * 7.5) * 0.38 + 0.45
          : Math.sin(t * 2.0) * 0.08;
      rightHandGroup.current.position.y =
        -0.52 +
        (isHovered || greeted ? 0.25 : 0) +
        Math.cos(t * 2.4) * 0.06;
      rightHandGroup.current.rotation.z = THREE.MathUtils.lerp(
        rightHandGroup.current.rotation.z,
        waveAngle,
        0.15
      );
    }

    if (leftHandGroup.current) {
      leftHandGroup.current.position.y = -0.58 + Math.sin(t * 2.2 + 1) * 0.05;
      leftHandGroup.current.rotation.y = 0.35 + px * 0.2;
    }

    // 6. Chest Neural Core Crystal & Gyroscopic Rings
    if (coreCrystalRef.current) {
      coreCrystalRef.current.rotation.y += delta * (isHovered ? 2.8 : 1.4);
      coreCrystalRef.current.rotation.x += delta * 0.9;
    }
    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z += delta * 0.32;
      ringOuterRef.current.rotation.x = Math.PI * 0.38 + Math.sin(t * 0.7) * 0.12;
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.y -= delta * 0.48;
      ringInnerRef.current.rotation.z = Math.PI * 0.18 + Math.cos(t * 0.6) * 0.1;
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = t * 0.25 + px * 0.35;
      orbitGroupRef.current.rotation.x = -py * 0.2;
    }
  });

  // Reduced scale so the mascot fits well inside the box
  const modelScale = variant === "hero" ? 0.78 : 0.72;

  return (
    <group ref={rootGroup} scale={modelScale} position={[0, 0.05, 0]}>
      <Float speed={2.2} rotationIntensity={0.12} floatIntensity={0.35}>
        {/* ==================== 1. ARTICULATED 3D ROBOT HEAD ==================== */}
        <group ref={headGroup} position={[0, 0.56, 0]}>
          {/* Outer Sculpted Titanium-Obsidian Helmet Shell */}
          <RoundedBox args={[1.38, 1.06, 1.12]} radius={0.32} smoothness={6}>
            <meshStandardMaterial
              color="#1A202C"
              metalness={0.78}
              roughness={0.24}
            />
          </RoundedBox>

          {/* Brushed Metallic Crown / Forehead Brow */}
          <RoundedBox
            args={[1.18, 0.22, 1.15]}
            radius={0.09}
            smoothness={4}
            position={[0, 0.42, 0.02]}
          >
            <meshStandardMaterial
              color="#C8C2BC"
              metalness={0.85}
              roughness={0.2}
            />
          </RoundedBox>

          {/* Burnt-Orange Forehead Neural Crest Indicator */}
          <RoundedBox
            args={[0.42, 0.06, 0.08]}
            radius={0.025}
            smoothness={3}
            position={[0, 0.42, 0.58]}
          >
            <meshStandardMaterial
              color="#E86A33"
              emissive="#E86A33"
              emissiveIntensity={2.2}
            />
          </RoundedBox>

          {/* Recessed Dark Glass Visor Screen */}
          <RoundedBox
            args={[1.16, 0.68, 0.16]}
            radius={0.2}
            smoothness={5}
            position={[0, 0.02, 0.51]}
          >
            <meshPhysicalMaterial
              color="#06080E"
              metalness={0.2}
              roughness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.06}
            />
          </RoundedBox>

          {/* Visor Metallic Rim Bezel */}
          <RoundedBox
            args={[1.22, 0.74, 0.08]}
            radius={0.22}
            smoothness={4}
            position={[0, 0.02, 0.5]}
          >
            <meshStandardMaterial
              color="#E86A33"
              metalness={0.75}
              roughness={0.25}
            />
          </RoundedBox>

          {/* Left Expressive Glowing 3D LED Eye */}
          <group ref={leftEyeRef} position={[-0.27, 0.06, 0.6]}>
            <RoundedBox args={[0.24, 0.28, 0.04]} radius={0.09} smoothness={4}>
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={2.8}
              />
            </RoundedBox>
            <mesh position={[0.03, 0.04, 0.025]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial
                color="#FFF7ED"
                emissive="#F29A4A"
                emissiveIntensity={3}
              />
            </mesh>
          </group>

          {/* Right Expressive Glowing 3D LED Eye */}
          <group ref={rightEyeRef} position={[0.27, 0.06, 0.6]}>
            <RoundedBox args={[0.24, 0.28, 0.04]} radius={0.09} smoothness={4}>
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={2.8}
              />
            </RoundedBox>
            <mesh position={[0.03, 0.04, 0.025]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial
                color="#FFF7ED"
                emissive="#F29A4A"
                emissiveIntensity={3}
              />
            </mesh>
          </group>

          {/* Friendly Glowing Smile Arc on Visor */}
          <mesh position={[0, -0.15, 0.6]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.13, 0.022, 12, 28, Math.PI]} />
            <meshStandardMaterial
              color="#F29A4A"
              emissive="#F29A4A"
              emissiveIntensity={2.4}
            />
          </mesh>

          {/* Left & Right Acoustic / Neural Ear Pods */}
          <group position={[-0.74, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.28, 0.16, 24]} />
              <meshStandardMaterial
                color="#252B3B"
                metalness={0.85}
                roughness={0.22}
              />
            </mesh>
            <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 16, 32]} />
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={2.2}
              />
            </mesh>
          </group>

          <group position={[0.74, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.24, 0.28, 0.16, 24]} />
              <meshStandardMaterial
                color="#252B3B"
                metalness={0.85}
                roughness={0.22}
              />
            </mesh>
            <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 16, 32]} />
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={2.2}
              />
            </mesh>
          </group>

          {/* Dual Top Telemetry Antennae */}
          <group position={[0.38, 0.65, -0.05]} rotation={[0, 0, -0.18]}>
            <mesh position={[0, 0.14, 0]}>
              <cylinderGeometry args={[0.025, 0.045, 0.34, 16]} />
              <meshStandardMaterial
                color="#C8C2BC"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0.34, 0]}>
              <sphereGeometry args={[0.075, 20, 20]} />
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={3}
              />
            </mesh>
          </group>

          <group position={[-0.38, 0.62, -0.05]} rotation={[0, 0, 0.18]}>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.02, 0.04, 0.24, 16]} />
              <meshStandardMaterial
                color="#C8C2BC"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0.24, 0]}>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial
                color="#F29A4A"
                emissive="#F29A4A"
                emissiveIntensity={2.4}
              />
            </mesh>
          </group>
        </group>

        {/* ==================== 2. ARTICULATED 3D TORSO & AI REACTOR CORE ==================== */}
        <group ref={bodyGroup} position={[0, -0.68, 0]}>
          {/* Neck Magnetic Joint */}
          <mesh position={[0, 0.64, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.2, 24]} />
            <meshStandardMaterial
              color="#2A3142"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>

          {/* Main Sculpted Chest Chassis */}
          <RoundedBox args={[1.18, 1.02, 0.86]} radius={0.28} smoothness={6}>
            <meshStandardMaterial
              color="#161B26"
              metalness={0.8}
              roughness={0.24}
            />
          </RoundedBox>

          {/* Brushed Silver Shoulder Pauldrons */}
          <RoundedBox
            args={[1.44, 0.28, 0.92]}
            radius={0.12}
            smoothness={4}
            position={[0, 0.34, 0]}
          >
            <meshStandardMaterial
              color="#C8C2BC"
              metalness={0.82}
              roughness={0.22}
            />
          </RoundedBox>

          {/* Central Glowing AI Neural Reactor Chamber */}
          <mesh position={[0, 0.04, 0.44]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.04, 16, 36]} />
            <meshStandardMaterial
              color="#E86A33"
              emissive="#E86A33"
              emissiveIntensity={1.8}
            />
          </mesh>

          {/* Spinning Octahedral Neural Core Inside Chest */}
          <mesh ref={coreCrystalRef} position={[0, 0.04, 0.44]}>
            <octahedronGeometry args={[0.17, 0]} />
            <meshStandardMaterial
              color="#F29A4A"
              emissive="#E86A33"
              emissiveIntensity={3.2}
              wireframe={false}
            />
          </mesh>

          {/* Lower Thruster / Anti-Gravity Base Cone */}
          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.38, 0.16, 0.26, 24]} />
            <meshStandardMaterial
              color="#232938"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.03, 12, 32]} />
            <meshStandardMaterial
              color="#E86A33"
              emissive="#E86A33"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* ==================== 3. FLOATING 3D HANDS & HOLOGRAPHIC CODE PAD ==================== */}
        <group ref={leftHandGroup} position={[-1.02, -0.58, 0.28]}>
          <RoundedBox args={[0.28, 0.34, 0.28]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color="#202634"
              metalness={0.82}
              roughness={0.22}
            />
          </RoundedBox>
          <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.022, 12, 24]} />
            <meshStandardMaterial
              color="#E86A33"
              emissive="#E86A33"
              emissiveIntensity={2}
            />
          </mesh>
          <group position={[0.08, 0.36, 0.22]} rotation={[-0.3, 0.35, 0]}>
            <RoundedBox args={[0.52, 0.34, 0.025]} radius={0.04} smoothness={3}>
              <meshStandardMaterial
                color="#E86A33"
                emissive="#E86A33"
                emissiveIntensity={1.6}
                transparent
                opacity={0.82}
              />
            </RoundedBox>
          </group>
        </group>

        <group ref={rightHandGroup} position={[1.02, -0.52, 0.26]}>
          <RoundedBox args={[0.28, 0.34, 0.28]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color="#202634"
              metalness={0.82}
              roughness={0.22}
            />
          </RoundedBox>
          <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.022, 12, 24]} />
            <meshStandardMaterial
              color="#F29A4A"
              emissive="#F29A4A"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>

        {/* ==================== 4. GYROSCOPIC 3D ORBITAL RINGS ==================== */}
        <mesh ref={ringOuterRef} position={[0, -0.1, -0.15]}>
          <torusGeometry args={[1.68, 0.016, 16, 90]} />
          <meshStandardMaterial
            color="#E86A33"
            emissive="#E86A33"
            emissiveIntensity={1.4}
            transparent
            opacity={0.7}
          />
        </mesh>

        <mesh ref={ringInnerRef} position={[0, -0.1, -0.1]}>
          <torusGeometry args={[1.38, 0.012, 16, 80]} />
          <meshStandardMaterial
            color="#C8C2BC"
            metalness={0.9}
            roughness={0.15}
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* ==================== 5. 3D ORBITING NEURAL DATA NODES ==================== */}
        <group ref={orbitGroupRef}>
          {orbitNodes.map((node, index) => (
            <mesh
              key={index}
              position={[
                Math.cos(node.angle) * node.radius,
                node.yOffset,
                Math.sin(node.angle) * node.radius,
              ]}
            >
              <octahedronGeometry args={[node.size, 0]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={2.2}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};

/**
 * Interactive 3D Model Mascot Stage (`MascotScene.tsx`)
 * Inside its rounded box with reduced size so it fits well inside the box, and zero text overlays.
 */
export const MascotScene: React.FC<MascotSceneProps> = ({
  variant = "hero",
  frameless = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<PointerVector>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [greeted, setGreeted] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const vw = Math.max(1, window.innerWidth);
      const vh = Math.max(1, window.innerHeight);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (vw * 0.45)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (vh * 0.45)));
        pointerRef.current = { x: nx, y: ny };
      } else {
        pointerRef.current = {
          x: (e.clientX / vw) * 2 - 1,
          y: (e.clientY / vh) * 2 - 1,
        };
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const isHero = variant === "hero";

  return (
    <div
      ref={containerRef}
      onClick={() => setGreeted((prev) => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing group ${
        isHero
          ? "h-[360px] xs:h-[400px] sm:h-[460px] lg:h-[520px]"
          : "h-[290px] xs:h-[320px] sm:h-[360px]"
      } ${className}`}
      role="img"
      aria-label="Interactive 3D AI Engineer Mascot Model — Rotates with cursor"
    >
      {frameless ? (
        <>
          {/* Frameless: Warm Radial Spotlight on Floor Under Robot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-8 sm:h-11 rounded-[100%] bg-[#E86A33]/50 blur-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[#E86A33]/65"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-4 sm:h-5 rounded-[100%] bg-[#FFA450]/80 blur-md"
          />

          {/* Three.js Canvas Seamlessly Integrated Over Page Waves */}
          <div className="relative w-full h-full overflow-visible">
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0.1, 4.35], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.9} />
              <directionalLight
                position={[4, 6, 5]}
                intensity={2.4}
                color="#FFF5EB"
              />
              <directionalLight
                position={[-4, 3, -3]}
                intensity={1.6}
                color="#E86A33"
              />
              <pointLight position={[0, -2.5, 2.5]} intensity={1.5} color="#F29A4A" />
              <pointLight position={[0, 2.5, -2]} intensity={1.1} color="#60A5FA" />

              <ProceduralRobotMascot
                pointerRef={pointerRef}
                isHovered={isHovered}
                greeted={greeted}
                variant={variant}
              />
            </Canvas>
          </div>
        </>
      ) : (
        <>
          {/* Boxed Variant Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 rounded-[2rem] bg-gradient-radial from-[#E86A33]/22 via-[#F29A4A]/8 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-85"
          />

          {/* Boxed Canvas Container */}
          <div className="relative w-full h-full rounded-[1.85rem] sm:rounded-[2.1rem] overflow-hidden border border-[#E86A33]/35 bg-[#090C14]/85 shadow-[0_30px_80px_-18px_rgba(0,0,0,0.92)]">
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0.1, 4.35], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.85} />
              <directionalLight
                position={[4, 6, 5]}
                intensity={2.2}
                color="#FFF5EB"
              />
              <directionalLight
                position={[-4, 3, -3]}
                intensity={1.5}
                color="#E86A33"
              />
              <pointLight position={[0, -2.5, 2.5]} intensity={1.4} color="#F29A4A" />
              <pointLight position={[0, 2.5, -2]} intensity={1.1} color="#60A5FA" />

              <ProceduralRobotMascot
                pointerRef={pointerRef}
                isHovered={isHovered}
                greeted={greeted}
                variant={variant}
              />
            </Canvas>
          </div>
        </>
      )}
    </div>
  );
};
