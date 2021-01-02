import { Subject } from "rxjs"

export class Ticker {
    private bpm: number
    private playing: boolean
    private noteSize: number

    public tickEvent: Subject<void>

    constructor(initialBpm: number, initialNoteSize: number){
        this.bpm = initialBpm
        this.noteSize = initialNoteSize
        this.playing = false
        this.tickEvent = new Subject()
    }

    setBpm(bpm: number){
        this.bpm = bpm
    }

    setNoteSize(size: number) {
        this.noteSize = size
    }

    start(){
        this.playing = true
        this.tick()
    }

    stop(){
        this.playing = false
    }

    private tick(){
        const tickPerSecond = (this.bpm / 60.0) * this.noteSize

        if ( this.playing ) {
            this.tickEvent.next()
            setTimeout(() => {this.tick()}, ( 1.0 / tickPerSecond ) * 1000)
        }
    }
}