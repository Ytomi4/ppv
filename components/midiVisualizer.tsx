'use client'

import { Suspense, useEffect, useState, useRef } from 'react';
import { MidiMessage, parseMIDIMessageData } from '../utils/manageMidiInput';
import { Canvas } from '@react-three/fiber';
import Rectangles from './rectangles';

export default function MidiVisualizer() {
    const [velocities, setVelocities] = useState<number[]>(new Array(88).fill(0));

    useEffect(() => {
        const midiAccess = navigator.requestMIDIAccess();
        midiAccess.then(access => {
            const inputs = Array.from(access.inputs.values());
            inputs.forEach(input => {
                input.onmidimessage = (message) => {
                    const data: number[] = Array.from(message.data);
                    const midiMessage = parseMIDIMessageData(data);

                    setVelocities(prevVelocities => {
                        const newVelocities = [...prevVelocities];
                        if (midiMessage.noteOn) {
                            newVelocities[midiMessage.note - 21] = midiMessage.velocity;
                        } else {
                            newVelocities[midiMessage.note - 21] = -50;
                        }
                        return newVelocities;
                    });
                };
            });

            return () => {
                inputs.forEach(input => {
                    input.onmidimessage = () => {};
                });
            };
        });
    }, []);

    return (
      <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
        <spotLight position={[-4, 8, -4]} angle={0.1} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
        <Suspense fallback={<div>Loading...</div>}>
            <Rectangles velocities={velocities} />
        </Suspense>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[5, 5]} />
            <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    );
}