import { ThisReceiver } from "@angular/compiler"
import { Ticker } from './ticker'
import { BehaviorSubject } from "rxjs"
import { sequencerState } from "../sequencer/state"
import { sound } from "../sound"

class PlayerState {
    public bpm: BehaviorSubject<number>
    public playingState: BehaviorSubject<boolean>
    private sequencerState = sequencerState
    private playingIndex = 0

    private ticker: Ticker

    constructor(bpm: number){
        this.bpm = new BehaviorSubject(bpm)
        this.playingState = new BehaviorSubject<boolean>(false)

        this.ticker = new Ticker(bpm, sequencerState.notes.length)

        this.ticker.tickEvent.subscribe(() => {
            if (sequencerState.notes.length <= this.playingIndex) {
                this.playingIndex = 0
            }
            const soundType = sequencerState.notes[this.playingIndex].getValue()
            if (soundType == 'high') {
                sound.playHigh();
            }
            if (soundType == 'low') {
                sound.playLow();
            }
            this.playingIndex += 1
        })

        this.sequencerState.noteLength.subscribe(() => {
            this.ticker.setNoteSize(this.sequencerState.notes.length)
        })
    }

    setBpm(bpm: number) {
        this.bpm.next(bpm)
        this.ticker.setBpm(bpm)
    }

    play(){
        sound.resume();
        this.playingIndex = 0
        if (this.playingState.getValue()) {
            return;
        }
        this.playingState.next(true)
        this.ticker.start()
    }

    stop(){
        this.playingIndex = 0
        this.playingState.next(false)
        this.ticker.stop()
    }
}

export const playerState = new PlayerState(120)