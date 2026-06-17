import { useState } from 'react';
import '../../assets/pages/Game.css';
import { useAudioController } from '../hooks/useAudioController';

interface AudioGameProps {
    media: string;
}

export default function AudioGame({
    media,
}: AudioGameProps) {

    const [reverb, setReverb] = useState<number>(0);

    const audioSrc = `data:audio/mpeg;base64,${media}`;

    const {playReversed,playWithReverb,} = useAudioController({reverb});

    return (
        <div className="audio-game-container">
            <audio
                controls
                src={audioSrc}
            />

            <div
                className="audio-controls"
                style={{ marginTop: '10px' }}
            >
                <button
                    onClick={() =>
                        playReversed(audioSrc)
                    }
                >
                    Reverse
                </button>

                <button
                    onClick={() =>
                        playWithReverb(audioSrc)
                    }
                >
                    Reverb
                </button>
            </div>

            <div style={{ marginTop: '15px' }}>
                <label
                    style={{
                        display: "inline-block",
                        width: "160px",
                        fontVariantNumeric:
                            "tabular-nums"
                    }}
                >
                    Reverb amount: {reverb}%
                </label>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={reverb}
                    onChange={(e) =>
                        setReverb(
                            Number(e.target.value)
                        )
                    }
                />
            </div>
        </div>
    );
}