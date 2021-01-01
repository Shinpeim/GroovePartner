import { Component, OnInit } from '@angular/core';
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
  bpm: number = 120

  constructor() {
    this.noteLengthOptions = availableNoteLengthes.map((length) => {
      return {
        label: `1/${length}`,
        value: length
      }
    })
    this.selectedNoteLength = sequencerState.noteLength.getValue()
  }

  ngOnInit(): void {
  }

  noteLengthChanged(){
    sequencerState.setNoteLength(this.selectedNoteLength)
  }
}
