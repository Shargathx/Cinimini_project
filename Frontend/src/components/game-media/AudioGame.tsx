import { useState } from 'react';
import '../../assets/pages/Game.css';

interface AudioGameProps {
    media: string;
    
}

export default function AudioGame({ media }: AudioGameProps) {
    const [reverb, setReverb] = useState<number>(0);
    const audioSrc = `data:audio/mpeg;base64,${media}`;

    async function playReversed(url: string) {
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            audioBuffer.getChannelData(channel).reverse();
        }

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    }

    async function playWithReverb(url: string) {
        const audioContext = new AudioContext();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        const convolver = audioContext.createConvolver();
        convolver.buffer = createImpulseResponse(audioContext, 3, 4);

        const dryGain = audioContext.createGain();
        const wetGain = audioContext.createGain();
        dryGain.gain.value = 0.7;
        wetGain.gain.value = reverb / 100; // Scaled to ratio 0.0 - 1.0

        source.connect(dryGain);
        source.connect(convolver);
        convolver.connect(wetGain);

        dryGain.connect(audioContext.destination);
        wetGain.connect(audioContext.destination);
        source.start();
    }

    function createImpulseResponse(context: AudioContext, duration = 3, decay = 4) {
        const length = context.sampleRate * duration;
        const impulse = context.createBuffer(2, length, context.sampleRate);
        for (let channel = 0; channel < 2; channel++) {
            const data = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
            }
        }
        return impulse;
    }

    return (
        <div className="audio-game-container">
            <audio controls src={audioSrc} />
            <div className="audio-controls" style={{ marginTop: '10px' }}>
                <button onClick={() => playReversed(audioSrc)}>Reverse</button>
                <button onClick={() => playWithReverb(audioSrc)}>Reverb</button>
            </div>

            <div style={{ marginTop: '15px' }}>
                <label style={{ display: "inline-block", width: "160px", fontVariantNumeric: "tabular-nums" }}>
                    Reverb amount: {reverb}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={reverb}
                    onChange={(e) => setReverb(Number(e.target.value))}
                />
            </div>
        </div>
    );
}