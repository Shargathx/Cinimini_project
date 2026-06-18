import { useEffect, useState } from "react"
import type { Category } from "../models/Category"
import "./AddGame.css";
import type { Game } from "../models/Game";
import { useFetch } from '../../components/hooks/useFetch';
import QuestionManager from "../../components/game-components/useQuestions";
import TeacherTextManager from "../../components/game-components/useTeacher";
import DiscussionPointManager from "../../components/game-components/useDiscussionPointManager";
import { useGameSteps } from "../../components/hooks/useGameSteps";

function AddGame() {
  const [categories, setCategories] = useState<Category[]>([])
  //Game file, name and category
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("");

  const { data } = useFetch<Game>(`${import.meta.env.VITE_BACK_URL}/games/${localStorage.getItem("catid")}/${localStorage.getItem("id")}`, []);
  //Game questions

  const game = data;
  const mode = localStorage.getItem("mode")

  const {
    steps,
    setSteps,

    addStep,
    deleteStep,

    addQuestion,
    deleteQuestion,
    updateQuestionInput,

    addDiscussionPoint,
    deletePoint,
    updateDiscussionInput,

    addTeacherText,
    deleteTeacherText,
    updateTeacherTextInput
  } = useGameSteps();

  //Form data
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
      .catch(err => console.error(err));
  }, []);


  const handleSubmit = async () => {
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
        step.images?.forEach((file: File) => {
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
      })

      if (!response.ok) throw new Error("Failed to save game");
      alert("Game saved!");
    } catch (err) {
      console.error(err);

    };
  }

  return (<>

    <div id="generalContainer">
      <h1 id="addGameTitle">Loo mäng</h1>
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
            id="bigEraseBtn"
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
          <QuestionManager
            value={step.questionInput}
            questions={step.questions}
            onInputChange={(value) =>
              updateQuestionInput(stepIndex, value)
            }
            onAdd={() => addQuestion(stepIndex)}
            onDelete={(id) =>
              deleteQuestion(stepIndex, id)
            }
          />

          <DiscussionPointManager
            value={step.discussionInput}
            points={step.discussionPoints}
            onInputChange={(value) =>
              updateDiscussionInput(stepIndex, value)
            }
            onAdd={() => addDiscussionPoint(stepIndex)}
            onDelete={(id) =>
              deletePoint(stepIndex, id)
            }
          />

          <TeacherTextManager
            value={step.teacherTextInput}
            texts={step.teacherTexts}
            onInputChange={(value) =>
              updateTeacherTextInput(stepIndex, value)
            }
            onAdd={() => addTeacherText(stepIndex)}
            onDelete={(id) =>
              deleteTeacherText(stepIndex, id)
            }
          />
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