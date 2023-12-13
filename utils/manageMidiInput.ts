export interface MidiMessage {
    noteOn: boolean;
    note: number;
    velocity: number;
}

export function parseMIDIMessageData(midiMessageData: number[]) {
    let command = midiMessageData[0];
    let note = midiMessageData[1];
    let velocity = (midiMessageData.length > 2) ? midiMessageData[2] : 0; // a velocity value might not be included with a noteOff command
  
    let noteOn = false;
    if (command === 144 && velocity > 0) {
        noteOn = true;
    }
    const message: MidiMessage = {noteOn: noteOn, note: note, velocity: velocity};
    return message;
  }