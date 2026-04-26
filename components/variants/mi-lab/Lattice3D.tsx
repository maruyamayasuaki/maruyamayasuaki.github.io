"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Perovskite-like ABO3 lattice (PbTiO3 schematic — relevant to Maruyama-san's
// research on ferroelectric strain engineering).
function buildAtoms() {
  const a = 1; // lattice param (visual)
  const N = 2; // 2x2x2 supercell visualization
  const atoms: { pos: [number, number, number]; type: "A" | "B" | "O" }[] = [];

  for (let i = -N; i <= N; i++) {
    for (let j = -N; j <= N; j++) {
      for (let k = -N; k <= N; k++) {
        // A-site (corners): Pb-like — large, warm color
        atoms.push({ pos: [i * a, j * a, k * a], type: "A" });
      }
    }
  }
  // B-site (body center) and O (face centers) per cell
  for (let i = -N; i <= N - 1; i++) {
    for (let j = -N; j <= N - 1; j++) {
      for (let k = -N; k <= N - 1; k++) {
        const cx = i + 0.5;
        const cy = j + 0.5;
        const cz = k + 0.5;
        atoms.push({ pos: [cx, cy, cz], type: "B" });
        atoms.push({ pos: [cx, cy, k], type: "O" });
        atoms.push({ pos: [cx, cy, k + 1], type: "O" });
        atoms.push({ pos: [cx, j, cz], type: "O" });
        atoms.push({ pos: [cx, j + 1, cz], type: "O" });
        atoms.push({ pos: [i, cy, cz], type: "O" });
        atoms.push({ pos: [i + 1, cy, cz], type: "O" });
      }
    }
  }
  return atoms;
}

const COLOR: Record<"A" | "B" | "O", string> = {
  A: "#fbbf24", // amber
  B: "#22d3ee", // cyan
  O: "#ef4444", // red
};
const RADIUS: Record<"A" | "B" | "O", number> = {
  A: 0.16,
  B: 0.13,
  O: 0.08,
};

function Atoms() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
  });

  const atoms = useMemo(() => buildAtoms(), []);

  // Use instanced mesh per atom type for perf
  const groups = (["A", "B", "O"] as const).map((type) => {
    const sel = atoms.filter((x) => x.type === type);
    return { type, items: sel };
  });

  return (
    <group ref={ref}>
      {/* atoms */}
      {groups.map((g) => (
        <group key={g.type}>
          {g.items.map((a, i) => (
            <mesh key={`${g.type}-${i}`} position={a.pos}>
              <sphereGeometry args={[RADIUS[g.type], 16, 16]} />
              <meshStandardMaterial color={COLOR[g.type]} roughness={0.35} metalness={0.1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* bonds: connect each B to its 6 nearest O */}
      {atoms
        .filter((a) => a.type === "B")
        .flatMap((b, bi) => {
          const neighbors = atoms
            .filter((o) => o.type === "O")
            .map((o) => {
              const d = Math.hypot(o.pos[0] - b.pos[0], o.pos[1] - b.pos[1], o.pos[2] - b.pos[2]);
              return { o, d };
            })
            .filter((x) => x.d < 0.6 && x.d > 0.01)
            .slice(0, 6);
          return neighbors.map((n, ni) => {
            const start = new THREE.Vector3(...b.pos);
            const end = new THREE.Vector3(...n.o.pos);
            const mid = start.clone().add(end).multiplyScalar(0.5);
            const dir = end.clone().sub(start);
            const length = dir.length();
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              dir.clone().normalize(),
            );
            return (
              <mesh
                key={`b-${bi}-${ni}`}
                position={mid.toArray()}
                quaternion={quaternion}
              >
                <cylinderGeometry args={[0.012, 0.012, length, 6]} />
                <meshBasicMaterial color="#94a3b8" transparent opacity={0.45} />
              </mesh>
            );
          });
        })}
    </group>
  );
}

export default function Lattice3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [3.4, 2.4, 3.4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <pointLight position={[-3, -2, -3]} intensity={0.6} color="#7c3aed" />
        <Atoms />
        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={2.5}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
