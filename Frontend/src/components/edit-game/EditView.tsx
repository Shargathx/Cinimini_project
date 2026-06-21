import { useEffect, useState } from "react"
import type { Category } from "../../assets/models/Category";
import "./EditGame.css";
import type { Game } from "../../assets/models/Game";
import { useFetch } from '../../components/hooks/useFetch';
import EditGame from "./EditGame";
import { useGameSteps } from "../../components/hooks/useGameSteps";

function EditView() {
    const [categories, setCategories] = useState<Category[]>([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");

    const { data } = useFetch<Game>(`${import.meta.env.VITE_BACK_URL}/games/${localStorage.getItem("catid")}/${localStorage.getItem("id")}`, []);

    const game = data;
    const currId = localStorage.getItem("id") ?? "";

    const {
        steps,
        setSteps,

        addStep,
        deleteStep,

        // addQuestion,
        deleteQuestion,
        updateQuestionInput,
        addQuestionEdit,

        // addDiscussionPoint,
        deletePoint,
        updateDiscussionInput,
        addDiscussionPointEdit,

        // addTeacherText,
        deleteTeacherText,
        updateTeacherTextInput,
        addTeacherTextEdit
    } = useGameSteps();

    //Form data
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!game) return;

        //See error confusing, kui soovi siis parandage
        setName(game.name);
        setDescription(game.description);
        setCategory(String(localStorage.getItem("catid") ?? ""));

        setSteps(
            game.gameSteps.map(step => ({
                id: step.stepId,

                images: [],

                questions: step.questions.map(q => ({
                    id: q.id,
                    questionText: q.questionText,
                })),

                discussionPoints: step.discussionPoints.map(dp => ({
                    id: dp.id,
                    discussionText: dp.discussionText,
                })),

                teacherTexts: step.teacherTexts.map(tt => ({
                    id: tt.id,
                    teacherText: tt.teacherText,
                })),

                questionInput: "",
                discussionInput: "",
                teacherTextInput: "",
            }))
        );
    }, [game, setSteps]);

    function updateQuestionText(
        stepIndex: number,
        questionId: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questions: step.questions.map(q =>
                            q.id === questionId
                                ? { ...q, questionText: value }
                                : q
                        )
                    }
                    : step
            )
        );
    }

    function updateDiscussionText(
        stepIndex: number,
        pointId: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionPoints: step.discussionPoints.map(p =>
                            p.id === pointId
                                ? { ...p, discussionText: value }
                                : p
                        )
                    }
                    : step
            )
        );
    }

    function updateTeacherText(
        stepIndex: number,
        textId: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTexts: step.teacherTexts.map(t =>
                            t.id === textId
                                ? { ...t, teacherText: value }
                                : t
                        )
                    }
                    : step
            )
        );
    }

    const handleSubmit = async () => {
        EditGame(currId, name, category, description, steps)
    }

    return (<>
        <div className="edit-game-page">
            <div id="generalContainer">
                <h1 id="addGameTitle">Uuenda mängu</h1>
                <label id="gameNameLabel">Mängu nimi: </label>
                <input id="gameName" value={name} onChange={(e) => { setName(e.target.value) }}></input><br></br>
                <label id="gameCatLabel">Kategooria: </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="gameCat"
                    name="gameCat"
                >
                    <option value="" disabled>
                        Vali kategooria
                    </option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <br />

                <label id="gameDescriptionLabel">Kirjeldus: </label>
                <textarea
                    id="gameDescriptionBox"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>ˇ
            <hr></hr>
            {/*Ei taha lisada uut steppi*/}
            {<button type="button" id="stepBtn" onClick={addStep}>
                Lisa uus samm
            </button>}
            <div id="step-container">
                {steps.map((step, stepIndex) => (
                    <div key={`q-${step.id}-${stepIndex}`} id="singleStep">
                        <h2 id="stepTitle">Samm {stepIndex + 1}</h2>

                        {<button
                            id="bigEraseBtn"
                            type="button"
                            onClick={() => deleteStep(stepIndex)}
                        >
                            Kustuta samm
                        </button>}
                        <p>NB! Muuda faili lisades file explorer'is "image files" valik "all files" valikuks kui soovid lisada videot või heli.</p>


                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);

                                setSteps(prev =>
                                    prev.map((s, index) => {
                                        if (index !== stepIndex) return s;

                                        return {
                                            ...s,

                                            images: [
                                                ...(s.images ?? []),
                                                ...files
                                            ]
                                        };
                                    })
                                );

                                e.target.value = "";
                            }}
                        />

                        <div>
                            {(step.images ?? []).map((img, i) => (
                                <div key={i}>{img.name}</div>
                            ))}
                        </div>

                        <h3 id="addQuestionTitle">Lisa küsimus</h3>

                        <input
                            value={step.questionInput}
                            onChange={(e) =>
                                updateQuestionInput(
                                    stepIndex,
                                    e.target.value
                                )
                            } id="addQuestion"
                        />

                        <button
                            type="button"
                            id="addQuestionBtn"
                            onClick={() => addQuestionEdit(stepIndex)}
                        >
                            Lisa küsimus
                        </button>

                        <div>Küsimused:</div>
                        {step.questions.map((question, index) => (
                            <div key={`q-${question.id}-${index}`}>
                                <input
                                    value={question.questionText}
                                    onChange={(e) =>
                                        updateQuestionText(
                                            stepIndex,
                                            Number(question.id),
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    id="eraseBtn"
                                    onClick={() =>
                                        deleteQuestion(
                                            stepIndex,
                                            Number(question.id)
                                        )
                                    }
                                >
                                    x
                                </button>
                            </div>
                        ))}

                        <h3 id="addDiscussionTitle">Arutelupunktid</h3>

                        <input
                            value={step.discussionInput}
                            onChange={(e) =>
                                updateDiscussionInput(
                                    stepIndex,
                                    e.target.value
                                )
                            } id="addDiscussion"
                        />

                        <button id="addDiscussionBtn"
                            type="button"
                            onClick={() =>
                                addDiscussionPointEdit(stepIndex)
                            }
                        >
                            Lisa arutelupunkt
                        </button>


                        <div>Arutelu punktid:</div>
                        {step.discussionPoints.map((point, index) => (
                            <div key={`dp-${point.id}-${index}`}>
                                <input
                                    value={point.discussionText}
                                    onChange={(e) =>
                                        updateDiscussionText(
                                            stepIndex,
                                            Number(point.id),
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    id="eraseBtn"
                                    onClick={() =>
                                        deletePoint(
                                            stepIndex,
                                            Number(point.id)
                                        )
                                    }
                                >
                                    x
                                </button>
                            </div>
                        ))}

                        <h3 id="addTeacherTextTitle">Õpetaja tekst</h3>

                        <input
                            type="text"
                            value={step.teacherTextInput}
                            onChange={(e) =>
                                updateTeacherTextInput(
                                    stepIndex,
                                    e.target.value
                                )
                            } id="addTeachText"
                        />

                        <button id="addTeachTextBtn"
                            type="button"
                            onClick={() => addTeacherTextEdit(stepIndex)}
                        >
                            Lisa õpetaja tekst
                        </button>


                        <div>Õpetaja tekstid:</div>

                        {step.teacherTexts.map((text, index) => (
                            <div key={`tt-${text.id}-${index}`}>
                                <input
                                    value={text.teacherText}
                                    onChange={(e) =>
                                        updateTeacherText(
                                            stepIndex,
                                            Number(text.id),
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    id="eraseBtn"
                                    onClick={() =>
                                        deleteTeacherText(
                                            stepIndex,
                                            Number(text.id)
                                        )
                                    }
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div >
            <hr />
            <button id="saveGameBtn"
                type="button"
                onClick={() =>
                    handleSubmit()
                }
            >
                SALVESTA
            </button>
        </div>
    </>
    )
}

export default EditView