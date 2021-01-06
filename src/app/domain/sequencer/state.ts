import {BehaviorSubject, Subject} from 'rxjs'
import { SoundType } from "../soundType";

export const availableNoteLengthes = [12, 16, 24] as const
export type AvailableNoteLength = typeof availableNoteLengthes[number]

export type SerializedSequencerState = {
    noteLength: AvailableNoteLength
    notes: Array<SoundType>
}

class SequencerStateImpl {
    // 16分音符なら16, 8分音符なら8
    public noteLength: BehaviorSubject<AvailableNoteLength>
    public notes: Array<BehaviorSubject<SoundType>>

    constructor(length: AvailableNoteLength) {
        this.noteLength = new BehaviorSubject<AvailableNoteLength>(length)
        this.notes = []

        this.initNotes(length)
    }

    public setNoteLength(length: AvailableNoteLength) {
        this.initNotes(length)
        this.noteLength.next(length)
    }

    public setNoteHigh(index: number) {
        this.notes[index].next('high')
    }
    public setNoteLow(index: number) {
        this.notes[index].next('low')
    }
    public setNoteNone(index: number) {
        this.notes[index].next('none')
    }

    private initNotes(length: AvailableNoteLength) {
        this.notes = []
        const size = length / 4
        for (let i = 0; i < size; i++) {
            this.notes.push(new BehaviorSubject<SoundType>("none") )
        }
    }

    public unload(): SerializedSequencerState{
        return {
            noteLength: this.noteLength.getValue(),
            notes: this.notes.map((s) => s.getValue())
        }
    }

    public load(json: SerializedSequencerState): void {
        this.setNoteLength(json.noteLength)
        json.notes.forEach((s, i) => {
            switch (s) {
                case 'high':
                    this.setNoteHigh(i)
                    break
                case 'low':
                    this.setNoteLow(i)
                    break;
                case 'none':
                    this.setNoteNone(i)
                    break
            }
        })
    }
}

export type SequencerState = SequencerStateImpl

export const sequencerState = new SequencerStateImpl(16)