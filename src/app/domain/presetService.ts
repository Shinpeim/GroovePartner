import { PlayerState, SerializedPlayerState } from "./player/state"
import { SequencerState, SerializedSequencerState } from "./sequencer/state"

const localStorageKey = 'presets'

const currentPresetsVersion = 1

export type Preset = {
    version: number
    playerState: SerializedPlayerState
    sequencerState: SerializedSequencerState
}

type Presets = {[key: string]: Preset;}

const fallback: Preset = {
    version: currentPresetsVersion,
    playerState: {
        bpm: 120,
    },
    sequencerState: {
        noteLength: 16,
        notes: [
            'none', 'none', 'none', 'none',
            'none', 'none', 'none', 'none',
            'none', 'none', 'none', 'none',
            'none', 'none', 'none', 'none'
        ]
    }
}

export function saveAs(key: string, sequencer: SequencerState, player: PlayerState): void{
    const presets = loadPresetsFromLocalStarage()
    presets[key] = {
        version: currentPresetsVersion,
        playerState: player.unload(),
        sequencerState: sequencer.unload()
    }
    localStorage.setItem(localStorageKey, JSON.stringify(presets))
}

export function removePreset(key: string): void{
    const presets = loadPresetsFromLocalStarage()
    delete presets[key]
    localStorage.setItem(localStorageKey, JSON.stringify(presets))
}

export function loadFromPreset(key: string, sequencer: SequencerState, player: PlayerState):void{
    const preset = loadPresetsFromLocalStarage()[key]
    sequencer.load(preset.sequencerState)
    player.load(preset.playerState)
}

export function loadPresetNames(): Array<string> {
    const presets = loadPresetsFromLocalStarage()
    const names: Array<string> = []
    for (const k in presets) {
        names.push(k)
    }
    return names;
}

function loadPresetsFromLocalStarage(): Presets{
    const presetsFromStorage: Presets = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
   
    const presets: Presets = {}
    for (const key in presetsFromStorage) {
        presets[key] = {
            version: restoreVersion(presetsFromStorage[key]),
            playerState: restorePlayerState(presetsFromStorage[key]),
            sequencerState: restoreSequencerState(presetsFromStorage[key])
        }
    }

    return presets
}

function restoreVersion(presetesFromStorage: any): number {
    // todo: ちゃんとfallbackする
    return presetesFromStorage.version
}

function restorePlayerState(presetsFromStorage: any): SerializedPlayerState{
    // todo: ちゃんとfallbackする
    return presetsFromStorage.playerState
}

function restoreSequencerState(presetsFromStorage: any): SerializedSequencerState{
    // todo: ちゃんとfallbackする
    return presetsFromStorage.sequencerState
}