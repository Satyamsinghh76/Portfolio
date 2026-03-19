"use client";

interface LightingProps {
  reduced?: boolean;
}

export default function Lighting({ reduced = false }: LightingProps) {
  if (reduced) {
    // 2 lights instead of 5 — massive GPU savings
    return (
      <>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
        <pointLight position={[-4, 2, 1]} intensity={1} color="#818cf8" distance={18} decay={2} />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} intensity={1.2} color="#818cf8" distance={16} decay={2} />
      <pointLight position={[5, -1, -3]} intensity={0.8} color="#a78bfa" distance={14} decay={2} />
      <pointLight position={[0, -2, -10]} intensity={0.5} color="#c084fc" distance={20} decay={2} />
    </>
  );
}
