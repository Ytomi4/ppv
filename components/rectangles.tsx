import { useFrame } from '@react-three/fiber'
import { useRef, useContext, useEffect, useState } from 'react'
import * as THREE from 'three';
import { UserSettingContext } from '@/contexts/userSettingsProvider';
import { ColName2RectangleColor } from '@/utils/colorNameParser';

export default function Rectangles({space = 0.015, width = 0.01, height = 0.05, velocities  = new Array(88).fill(0), ...props}){
    const meshRef = useRef<THREE.InstancedMesh | null>(null);
    const geometry = new THREE.BufferGeometry();
    let material = new THREE.MeshBasicMaterial();

    const userSettings = useContext(UserSettingContext);
  
    if (!userSettings) {
      throw new Error("UserSettingContext is undefined. Make sure the context provider is set up correctly.");
    }
  
    const [colorName, setColorName] = useState("");
  
    useEffect(() => {
      if (userSettings) {
        setColorName(userSettings.colorName.toString());
      }
    }, [userSettings]);

    useEffect(() => {
        const colCode = "0x".concat(ColName2RectangleColor(colorName));
        console.log(colCode);
        material.color.set(parseInt(colCode, 16));
    },[colorName])

    let obj = new THREE.Object3D();
    const intensitiesRef = useRef(new Array(88).fill(0)); 

    useFrame(() => {
        for(let i = 0; i < 88; i++) {
            intensitiesRef.current[i] += velocities[i] * 0.002; 
            intensitiesRef.current[i] = Math.max(0, Math.min(intensitiesRef.current[i], 3)); 

            const deltaY = intensitiesRef.current[i] + 1; 

            obj.position.x = (i - 44) * space;
            obj.position.y = (deltaY / 2) * height;
            //obj.scale.y = deltaY;
            obj.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, obj.matrix);
                meshRef.current.instanceMatrix.needsUpdate = true;
            }
        }
    })

    return (
        <instancedMesh castShadow ref={meshRef} args={[geometry, material, 88]}>
            <boxGeometry args={[width, height, 0.001]} />
        </instancedMesh>
    )
}