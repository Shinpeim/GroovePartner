const AudioContext = window.AudioContext || (<any>window).webkitAudioContext
class Sound {
    private context: AudioContext = new AudioContext({sampleRate: 48000})
    private lowBuffer: AudioBuffer
    private highBuffer: AudioBuffer
    
    constructor() {
        this.lowBuffer = this.context.createBuffer(1, 500 , 48000);
        const lowData = this.lowBuffer.getChannelData(0);
        // 矩形波を書き込み
        for (let i = 0; i < lowData.length;i++) {
        	if ((i % 80) < 40) {
        		lowData[i] = 0.4;
        	} else {
        		lowData[i] = -0.4;
        	}
        }

        this.highBuffer = this.context.createBuffer(1, 500 , 48000);
        const highData = this.highBuffer.getChannelData(0);
        // 矩形波を書き込み
        for (let i = 0; i < highData.length;i++) {
        	if ((i % 40) < 20) {
        		highData[i] = 0.6;
        	} else {
        		highData[i] = -0.6;
        	}
        }
    }

    resume(){
        this.context.resume()
    }

    playLow(){
        const src = this.context.createBufferSource();
        src.buffer = this.lowBuffer;
        src.connect(this.context.destination);
        src.start();
    }

    playHigh(){
        const src = this.context.createBufferSource();
        src.buffer = this.highBuffer;
        src.connect(this.context.destination);
        src.start();
    }

    playNone(){}
}

export const sound = new Sound()