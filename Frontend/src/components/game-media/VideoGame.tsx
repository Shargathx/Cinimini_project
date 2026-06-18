import { useState, useRef, useEffect } from 'react';
import '../../assets/pages/Game.css';
import { useVideoController } from '../hooks/useVideoController';

interface VideoGameProps {
    media: string;
}

export default function VideoGame({ media }: VideoGameProps) {
    const [speed, setSpeed] = useState<number>(1);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const reverseIntervalRef = useRef<number | null>(null);

    const videoSrc = `data:video/mp4;base64,${media}`;

    const { stopPlay, changePosition, playReverse, playFast, } = useVideoController({ videoRef, reverseIntervalRef, speed, });

    useEffect(() => {
        return () => {
            if (reverseIntervalRef.current) {
                clearInterval(reverseIntervalRef.current);
            }
        };
    }, []);

    return (
        <div className="video-game-container">
            <div className="video-container">
            <video
                ref={videoRef}
                width="320"
                height="240"
                src={videoSrc}
            />
            </div>

            <div
                className="video-actions"
                style={{ marginTop: '10px' }}
            >
                <button onClick={playReverse}>
                    Play in Reverse
                </button>
            </div>

            <div style={{ marginTop: '15px' }}>
                <label
                    style={{
                        display: 'inline-block',
                        width: '160px',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    Speed amount: {speed}
                </label>

                <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => {
                        const newSpeed = Number(e.target.value);
                        setSpeed(newSpeed);

                        setTimeout(() => playFast(), 0);
                    }}
                />

                <figure>
                    <figcaption>
                        <button
                            onClick={stopPlay}
                            id="play"
                            aria-label="Play"
                            role="button"
                        >
                            ►
                        </button>

                        <progress
                            id="progress"
                            value={0}
                            max={1}
                            onClick={changePosition}
                        >
                            Progress
                        </progress>

                        <label
                            id="timer"
                            role="timer"
                        >
                            0
                        </label>
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}