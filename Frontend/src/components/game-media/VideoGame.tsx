import { useState, useRef, useEffect } from 'react';
import '../../assets/pages/Game.css';

interface VideoGameProps {
    media: string;
}

export default function VideoGame({ media }: VideoGameProps) {
    const [speed, setSpeed] = useState<number>(1);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const reverseIntervalRef = useRef<number | null>(null);

    const videoSrc = `data:video/mp4;base64,${media}`;

    useEffect(() => {
        return () => {
            if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
        };
    }, []);

    function playReverse() {
        if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
        
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        reverseIntervalRef.current = window.setInterval(() => {
            if (video.currentTime <= 0) {
                video.pause();
                if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
                return;
            }
            video.currentTime -= 0.04 * speed;
        }, 40);
    }

    function playFast() {
        if (reverseIntervalRef.current) clearInterval(reverseIntervalRef.current);
        
        const video = videoRef.current;
        if (!video) return;

        video.defaultPlaybackRate = speed;
        video.playbackRate = speed;
        video.load();
        video.play();
    }

    return (
        <div className="video-game-container">
            <video ref={videoRef} width="320" height="240" controls src={videoSrc} />
            <div className="video-actions" style={{ marginTop: '10px' }}>
                <button onClick={playReverse}>Reverse</button>
                <button onClick={playFast}>Fast</button>
            </div>

            <div style={{ marginTop: '15px' }}>
                <label style={{ display: "inline-block", width: "160px", fontVariantNumeric: "tabular-nums" }}>
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
                        // Trigger fast play immediately upon configuration sliding
                        setTimeout(() => playFast(), 0);
                    }}
                />
            </div>
        </div>
    );
}