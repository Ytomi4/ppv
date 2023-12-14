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
                    console.log(midiMessage);

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
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<div>Loading...</div>}>
            <Rectangles velocities={velocities} />
        </Suspense>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    );
}