import type { RefObject } from 'react';

interface VideoControlsProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    reverseIntervalRef: RefObject<number | null>;
    speed: number;
}

export function useVideoController({
    videoRef,
    reverseIntervalRef,
    speed,
}: VideoControlsProps) {

    function progressLoop() {
        const video = videoRef.current;
        if (!video) return;

        const timer = document.getElementById("timer") as HTMLElement | null;
        const progressBar = document.getElementById("progress") as HTMLProgressElement | null;

        if (!timer || !progressBar) return;

        setInterval(() => {
            progressBar.value = video.currentTime / video.duration;
            timer.innerHTML = Math.round(video.currentTime).toString();
        });
    }

    function stopPlay() {
        const video = videoRef.current;
        if (!video) return;

        if (!video.paused) {
            video.pause();
        } else {
            video.play();
            progressLoop();
        }
    }

    function changePosition(
        e: React.MouseEvent<HTMLProgressElement>
    ) {
        const video = videoRef.current;
        if (!video || !video.duration) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();

        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;

        video.currentTime = percent * video.duration;

        progressLoop();
    }

    function playReverse() {
        if (reverseIntervalRef.current) {
            clearInterval(reverseIntervalRef.current);
        }

        const video = videoRef.current;
        if (!video) return;

        video.pause();

        reverseIntervalRef.current = window.setInterval(() => {
            if (video.currentTime <= 0) {
                video.pause();

                if (reverseIntervalRef.current) {
                    clearInterval(reverseIntervalRef.current);
                }

                return;
            }

            video.currentTime -= 0.04 * speed;
        }, 40);
    }

    function playFast() {
        if (reverseIntervalRef.current) {
            clearInterval(reverseIntervalRef.current);
        }

        const video = videoRef.current;
        if (!video) return;

        video.defaultPlaybackRate = speed;
        video.playbackRate = speed;
        video.load();
        video.play();
    }

    return {
        stopPlay,
        progressLoop,
        changePosition,
        playReverse,
        playFast,
    };
}