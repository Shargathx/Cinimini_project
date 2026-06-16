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
    const [questionCounter, setQuestionCounter] = useState(0)
    //Discussion points
    // const [newPoint, setNewpoint] = useState("")
    const [discussionPointsCounter, setDiscussionPointsCounter] = useState(0)
    //Teacher text
    // const [teacherText, setTeacherText] = useState("")
    const [teacherTextCounter, setTeacherTextCounter] = useState(0);

    const game = data;

    const [steps, setSteps] = useState<CreateGameStep[]>([createEmptyStep()])

    function createEmptyStep(): CreateGameStep {
        return {
            id: Math.random().toString(36).substring(2, 9), // siia tuleb suvaline stepId number testimiseks
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
        function fillEditableDate() {
            if (!game) return;

            setName(game.name);
            setDescription(game.description);
            setCategory(String(localStorage.getItem("catid")));

            setSteps(
                game.gameSteps.map(step => ({
                    // Add the ID here. If game steps have an ID from your backend, 
                    // use it (e.g., step.id). Otherwise, generate a new one.
                    id: step.id || Math.random().toString(36).substring(2, 9),

                    images: [],

                    questions: step.questions.map(q => ({
                        id: q.id,
                        questionText: q.questionText
                    })),

                    discussionPoints: step.discussionPoints.map(dp => ({
                        id: dp.id,
                        discussionText: dp.discussionText
                    })),

                    teacherTexts: step.teacherTexts.map(tt => ({
                        id: tt.id,
                        teacherText: tt.teacherText
                    })),

                    questionInput: "",
                    discussionInput: "",
                    teacherTextInput: ""
                }))
            );
        }
        fillEditableDate()

    }, [game])


    function addStep() {
        setSteps(prev => [...prev, createEmptyStep()]);
    }


    function deleteStep(stepIndex: number) {
        setSteps(prev =>
            prev.filter((_, index) => index !== stepIndex)
        );
    }

    function updateQuestionInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? { ...step, questionInput: value }
                    : step
            )
        );
    }

    function updateDiscussionInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? { ...step, discussionInput: value }
                    : step
            )
        );
    }

    function addQuestion(stepIndex: number) {
        const questionText =
            steps[stepIndex].questionInput.trim();

        if (!questionText) return;

        const newId = questionCounter + 1;
        setQuestionCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questionInput: "",
                        questions: [
                            ...step.questions,
                            {
                                id: newId,
                                questionText
                            }
                        ]
                    }
                    : step
            )
        );
    }
    function updateTeacherTextInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTextInput: value
                    }
                    : step
            )
        );
    }

    function addTeacherText(stepIndex: number) {
        const text =
            steps[stepIndex].teacherTextInput.trim();

        if (!text) return;

        const newId = teacherTextCounter + 1;
        setTeacherTextCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTextInput: "",

                        teacherTexts: [
                            ...step.teacherTexts,
                            {
                                id: newId,
                                teacherText: text
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function deleteTeacherText(
        stepIndex: number,
        teacherTextId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex ? {
                    ...step, teacherTexts: step.teacherTexts.filter(
                        t => t.id !== teacherTextId
                    )
                }
                    : step
            )
        );
    }

    function deleteQuestion(
        stepIndex: number,
        questionId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questions: step.questions.filter(
                            q => q.id !== questionId
                        )
                    }
                    : step
            )
        );
    }

    function addDiscussionPoint(
        stepIndex: number
    ) {
        const discussionText =
            steps[stepIndex].discussionInput.trim();

        if (!discussionText) return;

        const newId = discussionPointsCounter + 1;
        setDiscussionPointsCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionInput: "",
                        discussionPoints: [
                            ...step.discussionPoints,
                            {
                                id: newId,
                                discussionText
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function deletePoint(
        stepIndex: number,
        pointId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionPoints: step.discussionPoints.filter(
                            p => p.id !== pointId
                        )
                    }
                    : step
            )
        );
    }

    const handleSubmit = async () => {
        EditGame(name, category, description, steps)
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

                    {<button
                        type="button"
                        onClick={() => deleteStep(stepIndex)}
                    >
                        Kustuta samm
                    </button>}

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
                        onClick={() => addQuestion(stepIndex)}
                    >
                        Lisa küsimus
                    </button>

                    <div>Küsimused:</div>
                    {step.questions.map(question => (
                        <div key={question.id}>
                            {question.questionText}

                            <button
                                type="button"
                                id="eraseBtn"
                                onClick={() =>
                                    deleteQuestion(
                                        stepIndex,
                                        question.id
                                    )
                                }
                            >
                                Kustuta
                            </button>
                        </div>
                    ))}

                    <h3 id="addDiscussionTitle">Lisa arutelupunkt</h3>

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
                            addDiscussionPoint(stepIndex)
                        }
                    >
                        Lisa arutelupunkt
                    </button>

                    <div>Arutelu punktid:</div>
                    {step.discussionPoints.map(point => (
                        <div key={point.id}>
                            {point.discussionText}

                            <button
                                type="button"
                                id="eraseBtn"
                                onClick={() =>
                                    deletePoint(
                                        stepIndex,
                                        point.id
                                    )
                                }
                            >
                                Kustuta
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
                        onClick={() => addTeacherText(stepIndex)}
                    >
                        Lisa õpetaja tekst
                    </button>

                    <div>Õpetaja tekstid:</div>

                    {step.teacherTexts.map(text => (
                        <div key={text.id}>
                            {text.teacherText}

                            <button
                                type="button"
                                id="eraseBtn"
                                onClick={() =>
                                    deleteTeacherText(
                                        stepIndex,
                                        text.id
                                    )
                                }
                            >
                                Kustuta
                            </button>
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