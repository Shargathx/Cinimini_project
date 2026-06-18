import { useState } from "react";

import type { Question } from "../../assets/models/Question";
import type { Discussion } from "../../assets/models/Discussion";
import type { TeacherText } from "../../assets/models/TeacherText";

import discussionImg from "../../assets/icons/discussion.svg";
import questionImg from "../../assets/icons/question.svg";
import teacherImg from "../../assets/icons/teacherTextImg.svg";

type ActivePopup = "questions" | "points" | "teacher" | null;

interface GameStepLike {
    questions?: Question[];
    discussionPoints?: Discussion[];
    teacherTexts?: TeacherText[];
}

interface InfoPanelsProps {
    step: GameStepLike | undefined;
}

export default function InfoPanels({ step }: InfoPanelsProps) {
    const [activePopup, setActivePopup] = useState<ActivePopup>(null);

    return (
        <>
            <div className="game-info-buttons">
                <button
                    onClick={() => setActivePopup("questions")}
                    id="gameInfoButtons"
                >
                    <img src={questionImg} alt="Küsimused" />
                </button>

                <button
                    onClick={() => setActivePopup("points")}
                    id="gameInfoButtons"
                >
                    <img src={discussionImg} alt="Arutelupunktid" />
                </button>

                <button
                    onClick={() => setActivePopup("teacher")}
                    id="gameInfoButtons"
                >
                    <img src={teacherImg} alt="Info õpetajale" />
                </button>
            </div>

            {activePopup && (
                <div className="side-popup">
                    <button
                        className="close-popup"
                        onClick={() => setActivePopup(null)}
                    >
                        x
                    </button>

                    {activePopup === "questions" && (
                        <>
                            <h2>Küsimused</h2>
                            <div className="side-popup-content">
                                <ul>
                                    {step?.questions?.map((question) => (
                                        <li key={question.id}>
                                            {question.questionText}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {activePopup === "points" && (
                        <>
                            <h2>Arutelupunktid</h2>
                            <div className="side-popup-content">
                                <ul>
                                    {step?.discussionPoints?.map((point) => (
                                        <li key={point.id}>
                                            {point.discussionText}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {activePopup === "teacher" && (
                        <>
                            <h2>Info õpetajale</h2>
                            <div className="side-popup-content">
                                <ul>
                                    {step?.teacherTexts?.map((teacherText) => (
                                        <li key={teacherText.id}>
                                            {teacherText.teacherText}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}