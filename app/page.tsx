
import SelectMidiInput from '../components/selectMidiInput';
import MidiVisualizer from '@/components/midiVisualizer';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Available Device:</h1>
      <SelectMidiInput />
      <h1>MIDI Message</h1>
      <MidiVisualizer />
    </div>
  )
}
