import { useState, useEffect } from 'react';
import fullscreenIcon from '../../../src/assets/icons/fullscreen_icon.svg';
import ImageSaturation from '../../components/ImageSaturation';
import ImageContrast from '../../components/ImageContrast';
import ImageExposure from '../../components/ImageExposure';
import ImageZoom from '../../components/ImageZoom';

interface ImageGameProps {
    media: string;
    saturation: number; setSaturation: (v: number) => void;
    contrast: number; setContrast: (v: number) => void;
    exposure: number; setExposure: (v: number) => void;
    zoom: number; setZoom: (v: number) => void;
}

export default function ImageGame({
    media,
    saturation,
    setSaturation,
    contrast,
    setContrast,
    exposure,
    setExposure,
    zoom,
    setZoom
}: ImageGameProps) {
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (!fullscreen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setFullscreen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [fullscreen]);

    const filterStyles = {
        filter: `saturate(${saturation}%) contrast(${contrast}%) brightness(${exposure}%)`,
        transform: `scale(${zoom / 100})`,
        transformOrigin: "center"
    };

    const controls = (
        <>
            <ImageSaturation value={saturation} onChange={setSaturation} />
            <ImageContrast value={contrast} onChange={setContrast} />
            <ImageExposure value={exposure} onChange={setExposure} />
            <ImageZoom value={zoom} onChange={setZoom} />
        </>
    );

    return (
        <>
            <div className="image-container">
                <img
                    src={`data:image/png;base64,${media}`}
                    alt="Game Visual"
                    style={filterStyles}
                />
                {/* Single button tied to the correct state */}
                <button className="fullscreen-btn" onClick={() => setFullscreen(true)}>
                    <img src={fullscreenIcon} alt="Fullscreen" />
                </button>
            </div>

            {fullscreen && (
                <div className="fullscreen-overlay" onClick={() => setFullscreen(false)}>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <div className="fullscreen-image-wrapper">
                            <img
                                src={`data:image/png;base64,${media}`}
                                className="fullscreen-image"
                                style={{ ...filterStyles, transform: `scale(${zoom / 100})` }}
                                alt="Fullscreen Game Visual"
                            />
                        </div>
                        <button className="close-btn" onClick={() => setFullscreen(false)}>✕</button>
                        <div className="fullscreen-controls">
                            {controls}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}