import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Game.css';
import type { Game } from '../models/Game';
import type { Question } from '../models/Question';
import type { Discussion } from '../models/Discussion';
import type { TeacherText } from '../models/TeacherText';
import ImageGame from '../../components/game-media/ImageGame';
import AudioGame from '../../components/game-media/AudioGame';
import VideoGame from '../../components/game-media/VideoGame';

import ImageSaturation from '../../components/ImageSaturation';
import ImageContrast from '../../components/ImageContrast';
import ImageExposure from '../../components/ImageExposure';
import ImageZoom from '../../components/ImageZoom';

function Game() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Game | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [points, setPoints] = useState<Discussion[]>([]);
    const [teacherTexts, setTeacherText] = useState<TeacherText[]>([]);

    const [saturation, setSaturation] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [exposure, setExposure] = useState(100);
    const [zoom, setZoom] = useState(100);

    const step = data?.gameSteps?.[0];
    const media = step?.mediaElements?.[0]?.fileData ?? "";
    const fileFormat = step?.mediaElements?.[0]?.mediaType ?? "";

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/category/games/${id}/steps`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err));
    }, [id]);

    function getQuestions() {
        if (step) setQuestions(step.questions);
    }

    function getPoints() {
        if (step) setPoints(step.discussionPoints);
    }

    function getTeacherText() {
        if (step) setTeacherText(step.teacherTexts);
    }

    function renderMediaComponent() {
        if (!media) return null;

        switch (fileFormat) {
            case "image/png":
            case "image/jpeg":
                return (
                    <ImageGame
                        media={media}
                        saturation={saturation} setSaturation={setSaturation}
                        contrast={contrast} setContrast={setContrast}
                        exposure={exposure} setExposure={setExposure}
                        zoom={zoom} setZoom={setZoom}
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

    return (
        <div className="game-grid-container">
            <div className="game-content">
                {renderMediaComponent()}
            </div>

            <div className="game-function">
                {fileFormat.startsWith("image/") && (
                    <>
                        <ImageSaturation value={saturation} onChange={setSaturation} />
                        <ImageContrast value={contrast} onChange={setContrast} />
                        <ImageExposure value={exposure} onChange={setExposure} />
                        <ImageZoom value={zoom} onChange={setZoom} />
                    </>
                )}
            </div>

            <div className="name-and-description">
                <h3 className="game-description">Kirjeldus: {data?.description}</h3>
                <h1 className="game-name">Mängu nimi: {data?.name}</h1>
            </div>

            <div className="game-info-buttons">
                <button onClick={getQuestions}>Questions</button>
                <div>Küsimused:</div>
                {questions.map((question) => (
                    <div key={question.id}>{question.questionText}</div>
                ))}

                <button onClick={getPoints}>Discussion points</button>
                <div>Arutelu punktid:</div>
                {points.map((point) => (
                    <div key={point.id}>{point.discussionText}</div>
                ))}

                <button onClick={getTeacherText}>Info õpetajale</button>
                <div>Ideed, mõtted:</div>
                {teacherTexts.map((teacherText) => (
                    <div key={teacherText.id}>{teacherText.teacherText}</div>
                ))}
            </div>
        </div>
    );
}

export default Game;