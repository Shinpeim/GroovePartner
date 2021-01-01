import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AvailableNoteLength, sequencerState } from 'src/app/domain/sequencer/state';
import { SoundType } from 'src/app/domain/soundType';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.less']
})
export class SequencerComponent implements OnInit {

  highNotes: Array<boolean> = []
  lowNotes: Array<boolean> = []
  noneNotes: Array<boolean> = []

  noteSubscriptions: Array<Subscription> = []

  constructor() { 
  }

  ngOnInit(): void {
    sequencerState.noteLength.subscribe((length) => 
      this.initNoteSubscriptions()
    )
  }

  setNoteHigh(index: number): void {
    sequencerState.setNoteHigh(index)
  }
  setNoteLow(index: number): void {
    sequencerState.setNoteLow(index)
  }
  setNoteNone(index: number): void {
    sequencerState.setNoteNone(index)
  }

  initNoteSubscriptions(): void {
    this.noteSubscriptions.forEach(s => s.unsubscribe())

    this.highNotes = sequencerState.notes.map((subject) => {
      return subject.getValue() == 'high'
    })

    this.lowNotes = sequencerState.notes.map((subject) => {
      return subject.getValue() == 'low'
    })

    this.noneNotes = sequencerState.notes.map((subject) => {
      return subject.getValue() == 'none'
    })

    this.noteSubscriptions = sequencerState.notes.map((subject, i) => {
      return subject.subscribe((noteType) => {
          this.highNotes[i] = noteType == 'high'
          this.lowNotes[i] = noteType == 'low'
          this.noneNotes[i] = noteType == 'none'
      })
    })
  }
}
