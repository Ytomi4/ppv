export async function detectMidiDevices() {
  const midiAccess = await navigator.requestMIDIAccess();
  const availableDevices = Array.from(midiAccess.inputs).map(([_, input]) => input.name);
  return availableDevices;
}