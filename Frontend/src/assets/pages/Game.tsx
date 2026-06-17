import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './Game.css';
import './GameImage.css';
import './GameFullscreen.css';
import { useFetch } from '../../components/hooks/useFetch';
import type { Game } from '../models/Game';
import type { Question } from '../models/Question';
import type { Discussion } from '../models/Discussion';
import type { TeacherText } from '../models/TeacherText';

import discussionImg from "../icons/discussion.svg";
import questionImg from "../icons/question.svg";
import teacherImg from "../icons/teacherTextImg.svg";


import ImageGame from '../../components/game-media/ImageGame';

import AudioGame from '../../components/game-media/AudioGame';
import VideoGame from '../../components/game-media/VideoGame';
import ImageSaturation from '../../components/ImageSaturation';
import ImageContrast from '../../components/ImageContrast';
import ImageExposure from '../../components/ImageExposure';
import ImageZoom from '../../components/ImageZoom';

import LessThanB from '../icons/LessThanB.svg';
import GreaterThanB from '../icons/GreaterThanB.svg';

function Game() {
    const { id } = useParams<{ id: string }>();
    const { data, loading } = useFetch<Game>(`${import.meta.env.VITE_BACK_URL}/category/games/${id}/steps`, [id]);
    // const [data, setData] = useState<Game | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [points, setPoints] = useState<Discussion[]>([]);
    const [teacherTexts, setTeacherText] = useState<TeacherText[]>([]);


    const [saturation, setSaturation] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [exposure, setExposure] = useState(100);
    const [zoom, setZoom] = useState(100);
    const [currentStep, setCurrentStep] = useState(0);

    const step = data?.gameSteps?.[currentStep];
    const media = step?.mediaElements?.[0]?.fileData ?? "";
    const fileFormat = step?.mediaElements?.[0]?.mediaType ?? "";

    // 1. Calculate media count on the fly during render
    const mediaCount = data?.gameSteps?.length ?? 0;

    function getQuestions() {
        setQuestions(step?.questions ?? []);
    }

    function getPoints() {
        setPoints(step?.discussionPoints ?? []);
    }

    function getTeacherText() {
        setTeacherText(step?.teacherTexts ?? []);
    }

    function renderMediaComponent() {
        if (!media) return null;

        switch (fileFormat) {
            case "image/png":
            case "image/jpeg":
                return (
                    <ImageGame
                        media={media}
                        saturation={saturation}
                        setSaturation={setSaturation}
                        contrast={contrast}
                        setContrast={setContrast}
                        exposure={exposure}
                        setExposure={setExposure}
                        zoom={zoom}
                        setZoom={setZoom}
                    />
                );
            case "audio/mpeg":
            case "audio/mp3":
                return <AudioGame media={media} />;
            case "video/mp4":
                return <VideoGame media={media} />;
            default:
                return <p>Unsupported format: {fileFormat}</p>;
        }
    }

    if (loading) {
        return (
            <div className="game-loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p>Laeb mängu asju...</p>
            </div>
        );
    }

    function nextStep() {
        if (!data?.gameSteps) return;

        setCurrentStep(prev =>
            Math.min(prev + 1, data.gameSteps.length - 1)
        );

        setQuestions([]);
        setPoints([]);
        setTeacherText([]);
    }

    function previousStep() {
        setCurrentStep(prev =>
            Math.max(prev - 1, 0)
        );

        setQuestions([]);
        setPoints([]);
        setTeacherText([]);
    }

    return (
        <div className="game-grid-container">

            <div className="counter-and-media">
                <span className="media-count">
                    {currentStep + 1}/{mediaCount}
                </span>

                <div className="steps-and-media">
                    <button
                        className="previous-step"
                        onClick={previousStep}
                        disabled={currentStep === 0}
                    >
                        <img src={LessThanB} alt="less-than-sign-black" />
                    </button>

                    <div className="game-content">
                        {renderMediaComponent()}
                    </div>

                    <button
                        className="next-step"
                        onClick={nextStep}
                        disabled={currentStep >= mediaCount - 1}
                    >
                        <img src={GreaterThanB} alt="greater-than-sign-black" />
                    </button>
                </div>
            </div>

            <div className="game-function">
                {fileFormat.startsWith("image/") && (
                    <div className="image-function">
                        <ImageSaturation
                            value={saturation}
                            onChange={setSaturation}
                        />

                        <ImageContrast
                            value={contrast}
                            onChange={setContrast}
                        />

                        <ImageExposure
                            value={exposure}
                            onChange={setExposure}
                        />

                        <ImageZoom
                            value={zoom}
                            onChange={setZoom}
                        />
                    </div>

                )}
            </div>

            <h3 className="game-name">{data?.name}</h3>
            <h3 className="game-description">Kirjeldus: {data?.description}</h3>

            <div className="game-info-buttons">
                <button onClick={getQuestions} id="gameInfoButtons">
                    <img src={questionImg} alt="Küsimused" /></button>
                {questions.map((question) => (
                    <div key={question.id}>{question.questionText}</div>
                ))}

                <button onClick={getPoints} id="gameInfoButtons">
                    <img src={discussionImg} alt="Arutelupunktid" /></button>
                {points.map((point) => (
                    <div key={point.id}>{point.discussionText}</div>
                ))}

                <button onClick={getTeacherText} id="gameInfoButtons">
                    <img src={teacherImg} alt="Info Õpetajale" /></button>
                {teacherTexts.map((teacherText) => (
                    <div key={teacherText.id}>{teacherText.teacherText}</div>
                ))}
            </div>
        </div>
    );
}

export default Game;