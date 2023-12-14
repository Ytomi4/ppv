import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three';

export default function Rectangles({space = 0.02, width = 0.01, height = 0.05, ...props}){
    const meshRef = useRef<THREE.InstancedMesh | null>(null);
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    let obj = new THREE.Object3D();

    useFrame(() => {
        for(let i = 0; i < 88; i++) {
            const time = performance.now() * 0.001;
            const deltaY = Math.sin(i + time) * 0.2 + 1;

            obj.position.x = (i - 44) * space;
            obj.position.y = (deltaY / 2) * height;
            obj.scale.y = deltaY;
            obj.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, obj.matrix);
                meshRef.current.instanceMatrix.needsUpdate = true;
            }
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[geometry, material, 88]}>
            <planeGeometry args={[width, height]} />
            <meshPhongMaterial color={0xffffff} /> 
        </instancedMesh>
    )
}