'use client'

import { useEffect, useState } from 'react';
import { MidiMessage, parseMIDIMessageData } from '../utils/manageMidiInput';

export default function MidiVisualizer() {
    const [midiInputMessages, setMidiInputMessages] = useState<MidiMessage[]>([]);

    useEffect(() => {
        console.log('messages', midiInputMessages, 'length', midiInputMessages.length);
    }, [midiInputMessages]);

    useEffect(() => {
      const midiAccess = navigator.requestMIDIAccess();
      midiAccess.then(access => {
        const inputs = Array.from(access.inputs.values());
        inputs.forEach(input => {
          input.onmidimessage = (message) => {
            const data: number[] = Array.from(message.data);
            setMidiInputMessages([parseMIDIMessageData(data)]);
            //setMidiInputMessages(prevMessages => [...prevMessages, parseMIDIMessageData(data)]);
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
      <div>
        {midiInputMessages.length > 0 ? midiInputMessages.map((message) => (
          <div>
              <div>--------------------</div>
              <p>Note: {message.note}</p>
              <p>Note On: {message.noteOn ? 'True' : 'False'}</p>
              <p>Velocity: {message.velocity}</p>
              <div>--------------------</div>
          </div>
        )) : <p>No message</p>}
      </div>
    );
}