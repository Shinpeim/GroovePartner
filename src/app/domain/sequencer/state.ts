import {BehaviorSubject, Subject} from 'rxjs'
import { SoundType } from "../soundType";

export const availableNoteLengthes = [12, 16, 24] as const
export type AvailableNoteLength = typeof availableNoteLengthes[number]

class SequencerState {
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
}

export const sequencerState = new SequencerState(16)