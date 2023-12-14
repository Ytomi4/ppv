'use client'

import { Suspense, useEffect, useState, useRef } from 'react';
import { MidiMessage, parseMIDIMessageData } from '../utils/manageMidiInput';
import { Canvas } from '@react-three/fiber';
import Rectangles from './rectangles';

export default function MidiVisualizer() {
    const [midiInputMessages, setMidiInputMessages] = useState<MidiMessage[]>([]);
    const [noteIntensities, setNoteIntensities] = useState<number[]>(new Array(88).fill(0));
    const decayRate = 0.1;
    const lastUpdateTime = useRef(Date.now());

    useEffect(() => {
        console.log('messages', midiInputMessages, 'length', midiInputMessages.length);
    }, [midiInputMessages]);

    useEffect(() => {
        const now = Date.now();
        const elapsed = (now - lastUpdateTime.current) / 1000; // convert ms to s
        lastUpdateTime.current = now;

        setNoteIntensities(prevIntensities =>
            prevIntensities.map(intensity => Math.max(0, intensity - decayRate * elapsed))
        );
    }, []);

    useEffect(() => {
        const midiAccess = navigator.requestMIDIAccess();
        midiAccess.then(access => {
            const inputs = Array.from(access.inputs.values());
            inputs.forEach(input => {
                input.onmidimessage = (message) => {
                    const data: number[] = Array.from(message.data);
                    const midiMessage = parseMIDIMessageData(data);

                    setMidiInputMessages(prevMessages => [...prevMessages, midiMessage]);

                    setNoteIntensities(prevIntensities => {
                        const newIntensities = [...prevIntensities];
                        if (midiMessage.noteOn) {
                            newIntensities[midiMessage.note - 21] = midiMessage.velocity;
                        } else {
                            newIntensities[midiMessage.note - 21] = 0;
                        }
                        return newIntensities;
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
            <Rectangles space={0.02} intensities={noteIntensities} />
        </Suspense>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]}>
            <planeGeometry />
            <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    );
}