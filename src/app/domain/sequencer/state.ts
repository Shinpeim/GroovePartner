import {BehaviorSubject, Subject} from 'rxjs'
import { SoundType } from "../soundType";

export type AvailableNoteLength = 4 | 8 | 12 | 16 | 24

class SequencerState {
    // 16分音符なら16, 8分音符なら8
    public noteLength: Subject<AvailableNoteLength>
    public notes: Array<BehaviorSubject<SoundType>>

    constructor(length: AvailableNoteLength) {
        this.noteLength = new Subject<AvailableNoteLength>()
        this.notes = []

        this.setNoteLength(length)
    }

    public setNoteLength(length: AvailableNoteLength) {
        this.noteLength.next(length)
        this.initNotes(length)
    }

    private initNotes(length: AvailableNoteLength) {
        this.notes = []
        const size = length / 4
        for (let i = 0; i < size; i++) {
            this.notes.push(new BehaviorSubject<SoundType>("none") )
        }
    }
}

export const sequencerState = new SequencerState(16)