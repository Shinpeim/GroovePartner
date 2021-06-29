import { Component, OnInit } from '@angular/core';
import { playerState } from 'src/app/domain/player/state';
import { loadFromPreset, loadPresetNames, removePreset, saveAs } from 'src/app/domain/presetService';
import { AvailableNoteLength, availableNoteLengthes, sequencerState } from 'src/app/domain/sequencer/state';

type NoteLengthOption = {
  label: string
  value: AvailableNoteLength
}

type PresetOption = {
  label: string
  value: string
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

  presetsOptions:Array<PresetOption>
  selectedPreset: string

  playButtonDisabled = false
  isPlaying = false

  constructor() {
    this.noteLengthOptions = availableNoteLengthes.map((length) => {
      return {
        label: `1/${length}`,
        value: length
      }
    })
    this.selectedNoteLength = sequencerState.noteLength.getValue()
    this.bpm = playerState.bpm.getValue()

    playerState.bpm.subscribe((bpm) => {
      this.bpm = bpm
    })
    playerState.playingState.subscribe((isPlaying) => {
      this.isPlaying = isPlaying
    })

    const presetNames = loadPresetNames()
    presetNames.unshift('')
    this.presetsOptions = presetNames.map((v) => {
      return {label: v, value: v}
    })
    this.selectedPreset = ''
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

  removePreset(){
    let key = ''
    while (key == '') {
        const ret =  prompt('preset name')
        key = ret == null ? '' : ret
    }
    removePreset(key)

    const presetNames = loadPresetNames()
    presetNames.unshift('')
    this.presetsOptions = presetNames.map((v) => {
      return {label: v, value: v}
    })
    this.selectedPreset = ''
  }

  saveAs() {
    let key = ''
    while (key == '') {
        const ret =  prompt('preset name')
        key = ret == null ? '' : ret
    }
    saveAs(key, sequencerState, playerState)

    const presetNames = loadPresetNames()
    presetNames.unshift('')
    this.presetsOptions = presetNames.map((v) => {
      return {label: v, value: v}
    })
    this.selectedPreset = key
  }

  presetSelected(){
    if (this.selectedPreset == '') {
      return
    }

    loadFromPreset(this.selectedPreset, sequencerState, playerState)
  }
}
