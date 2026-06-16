import { useEffect, useState } from "react"
import type { Category } from "../models/Category"
import type { CreateGameStep } from "../models/CreateGameStep"
import "./AddGame.css";
import type { Game } from "../models/Game";
import { useFetch } from '../../components/hooks/useFetch';

function AddGame() {
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
  const mode = localStorage.getItem("mode")

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

    if (localStorage.getItem("mode") == "add") {
      try {
        const formData = new FormData();

        // 1. Convert your state to the exact structure the backend expects
        const gameData = {
          name,
          categoryId: Number(category),
          description,

          steps: steps.map((step) => ({
            questions: step.questions.map(q => ({
              questionText: q.questionText
            })),

            discussionPoints: step.discussionPoints.map(dp => ({
              discussionText: dp.discussionText
            })),

            teacherTexts: step.teacherTexts.map(tt => ({
              teacherText: tt.teacherText
            }))
          }))
        };

        // 2. Append the JSON string
        formData.append("gameRequest", JSON.stringify(gameData));

        // 3. Append the files using the expected index keys
        steps.forEach((step, stepIndex) => {
          step.images?.forEach((file) => {
            formData.append(
              `steps[${stepIndex}].image`,
              file
            );
          });
        });
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        // 4. Send
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/games/add-game`, {
          method: "POST",
          body: formData
        });

        if (!response.ok) throw new Error("Failed to save game");
        alert("Game saved!");
      } catch (err) {
        console.error(err);
      }
    };
  }

  return (<>
    <div id="generalContainer">
      <h1 id="addGameTitle">Loo mäng</h1>
      <h2>Mode: {mode}</h2>
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

export default AddGame