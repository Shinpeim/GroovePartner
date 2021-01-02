import { Component, OnInit } from '@angular/core';
import { playerState } from 'src/app/domain/player/state';
import { AvailableNoteLength, availableNoteLengthes, sequencerState } from 'src/app/domain/sequencer/state';

type NoteLengthOption = {
  label: string
  value: AvailableNoteLength
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  noteLengthOptions:Array<NoteLengthOption>
  selectedNoteLength:AvailableNoteLength
  bpm: number

  constructor() {
    this.noteLengthOptions = availableNoteLengthes.map((length) => {
      return {
        label: `1/${length}`,
        value: length
      }
    })
    this.selectedNoteLength = sequencerState.noteLength.getValue()
    this.bpm = playerState.bpm.getValue()
  }

  ngOnInit(): void {
  }

  play(){
    playerState.play()
  }

  stop(){
    playerState.stop()
  }

  noteLengthChanged(){
    sequencerState.setNoteLength(this.selectedNoteLength)
  }

  bpmChanged(){
    playerState.setBpm(this.bpm)
  }
}
