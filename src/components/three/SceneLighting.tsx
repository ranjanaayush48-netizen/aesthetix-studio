import { Environment, SoftShadows } from '@react-three/drei';

export function SceneLighting() {
  return (
    <>
      {/* <SoftShadows size={25} samples={10} focus={0.5} /> */}
      <ambientLight intensity={0.8} />
      
      {/* Key Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>

      {/* Rim Light */}
      <pointLight position={[-5, -2, 2]} intensity={0.5} color="#8B9A6E" />
      
      {/* Fill Light */}
      <pointLight position={[0, 5, -5]} intensity={0.2} />

      <Environment preset="studio" />
    </>
  );
}
