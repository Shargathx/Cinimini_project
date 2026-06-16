import { useEffect, useState } from "react"
import type { Category } from "../../assets/models/Category";
import type { CreateGameStep } from "../../assets/models/CreateGameStep";
import "../../assets/pages/AddGame.css";
import type { Game } from "../../assets/models/Game";
import { useFetch } from '../../components/hooks/useFetch';
import EditGame from "./EditGame";

function EditView() {
    const [categories, setCategories] = useState<Category[]>([])
    //Game file, name and category
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("");
    const { data } = useFetch<Game>(`${import.meta.env.VITE_BACK_URL}/games/${localStorage.getItem("catid")}/${localStorage.getItem("id")}`, []);
    //Game questions
    // const [newQuestion, setNewQuestion] = useState("")

    const game = data;
    const currId = localStorage.getItem("id") ?? "";

    const [steps, setSteps] = useState<CreateGameStep[]>([createEmptyStep()])

    function createEmptyStep(): CreateGameStep {
        return {
            id: undefined, // siia tuleb suvaline stepId number testimiseks
            images: [],
            questions: [],
            discussionPoints: [],
            teacherTexts: [],
            questionInput: "",
            discussionInput: "",
            teacherTextInput: ""
        };
    }


    //Form data
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        if (!game) return;

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
    }, [game]);


    function addStep() {
        setSteps(prev => [...prev, createEmptyStep()]);
    }

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
        <div id="generalContainer">
            <h1 id="addGameTitle">Uuenda mängu</h1>
            <button onClick={() => { console.log(game) }}>Get editable</button>
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
        {<button type="button" id="stepBtn" onClick={addStep}>
            Lisa uus samm
        </button>}
        <div id="step-container">
            {steps.map((step, stepIndex) => (
                <div key={step.id} id="singleStep">
                    <h2 id="stepTitle">Samm {stepIndex + 1}</h2>

                    {/* {<button
                        type="button"
                        onClick={() => deleteStep(stepIndex)}
                    >
                        Kustuta samm
                    </button>} */}

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

                            // allow selecting same files again
                            e.target.value = "";
                        }}
                    />

                    <div>
                        {(step.images ?? []).map((img, i) => (
                            <div key={i}>{img.name}</div>
                        ))}
                    </div>

                    <h3 id="addQuestionTitle">Lisa küsimus</h3>

                    <div>Küsimused:</div>
                    {step.questions.map(question => (
                        <div key={question.id}>
                            <input
                                value={question.questionText}
                                onChange={(e) =>
                                    updateQuestionText(
                                        stepIndex,
                                        question.id,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}

                    <h3 id="addDiscussionTitle">Arutelupunktid</h3>


                    <div>Arutelu punktid:</div>
                    {step.discussionPoints.map(point => (
                        <div key={point.id}>
                            <input
                                value={point.discussionText}
                                onChange={(e) =>
                                    updateDiscussionText(
                                        stepIndex,
                                        point.id,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}

                    <h3 id="addTeacherTextTitle">Õpetaja tekst</h3>


                    <div>Õpetaja tekstid:</div>

                    {step.teacherTexts.map(text => (
                        <div key={text.id}>
                            <input
                                value={text.teacherText}
                                onChange={(e) =>
                                    updateTeacherText(
                                        stepIndex,
                                        text.id,
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <hr />
        <button id="saveGameBtn"
            type="button"
            onClick={() =>
                handleSubmit()
            }
        >
            SALVESTA
        </button>



    </>
    )
}

export default EditView