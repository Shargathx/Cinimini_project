import { useEffect, useState } from 'react'
import type { Category } from '../models/Category'
import type { CreateGameStep } from '../models/CreateGameStep'
import type { Media } from '../models/Media';
import './AddGame.css';

function AddGame() {
  const [categories, setCategories] = useState<Category[]>([])
  //Game file, name and category
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<number>(1);
  //Game questions
  const [newQuestion, setNewQuestion] = useState("")
  const [questionCounter, setQuestionCounter] = useState(0)
  //Discussion points
  const [newPoint, setNewpoint] = useState("")
  const [discussionPointsCounter, setDiscussionPointsCounter] = useState(0)
  //Teacher text
  const [teacherText, setTeacherText] = useState("")
  const [teacherTextCounter, setTeacherTextCounter] = useState(0);

  const [steps, setSteps] = useState<CreateGameStep[]>([
    {
      image: null,
      questions: [],
      discussionPoints: [],
      teacherTexts: [],
      questionInput:"",
      discussionInput:"",
      teacherTextInput:""
    }
  ])

  type TeacherText = {
    id: number;
    teacherText: string;
  };

  type GameStepForm = {
    image: File | null;

    questions: {
      id: number;
      questionText: string;
    }[];

    discussionPoints: {
      id: number;
      discussionText: string;
    }[];

    teacherTexts: TeacherText[];

    questionInput: string;
    discussionInput: string;
    teacherTextInput: string;
  };
  //Form data

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
      .catch(err => console.error(err));
  }, []);

  function createEmptyStep(): GameStepForm {
    return {
      image: null,

      questions: [],
      discussionPoints: [],
      teacherTexts: [],

      questionInput: "",
      discussionInput: "",
      teacherTextInput: ""
    };
  }

  function addStep() {
    setSteps(prev => [...prev, createEmptyStep()]);
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
    console.log(text)

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
        index === stepIndex
          ? {
            ...step,
            teacherTexts: step.teacherTexts.filter(
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

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("categoryId", String(category));

    steps.forEach((step, stepIndex) => {

      // image
      if (step.image) {
        formData.append(
          `steps[${stepIndex}].image`,
          step.image
        );
      }

      // questions
      step.questions.forEach((question, questionIndex) => {
        formData.append(
          `steps[${stepIndex}].questions[${questionIndex}]`,
          question.questionText
        );
      });

      step.teacherTexts.forEach(
        (teacherText, teacherTextIndex) => {
          formData.append(
            `steps[${stepIndex}].teacherTexts[${teacherTextIndex}]`,
            teacherText.teacherText
          );
        }
      );

      // discussion points
      step.discussionPoints.forEach(
        (discussion, discussionIndex) => {
          formData.append(
            `steps[${stepIndex}].discussionPoints[${discussionIndex}]`,
            discussion.discussionText
          );
        }
      );
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    console.log(formData.entries())

    try {
      const response = await fetch(
        import.meta.env.VITE_BACK_URL + "/games/add-game",
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save game");
      }

      alert("Game saved!");

      setName("");
      setDescription("");

      setSteps([
        {
          image: null,
          questions: [],
          discussionPoints: [],
          teacherTexts: [],
          questionInput:"",
          discussionInput:"",
          teacherTextInput:""
        }
      ]);

    } catch (err) {
      console.error(err);
    }
  };

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

  return (<>

    <h1 id='addGameTitle'>Loo mäng</h1>
    <label id='gameNameLabel'>Mängu nimi: </label>
    <input id='gameName' onChange={(e) => { setName(e.target.value) }}></input><br></br>
    <label id='gameCatLabel'>kategooria: </label>
    <select onChange={(e) => { setCategory(Number(e.target.value)) }} id='gameCat' name='gameCat' >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select><br />

    <label id='gameDescriptionLabel'>Kirjeldus: </label><br />
    <textarea id='gameDescriptionBox' onChange={(e) => { setDescription(e.target.value) }}></textarea>
    <hr></hr>
    <button type="button" onClick={addStep}>
      Lisa uus samm
    </button>

    {steps.map((step, stepIndex) => (
      <div key={stepIndex}>
        <h2 id='stepTitle'>Samm {stepIndex + 1}</h2>

        <input
          type="file"
          onChange={(e) =>
            setSteps(prev =>
              prev.map((s, index) =>
                index === stepIndex
                  ? {
                    ...s,
                    image: e.target.files?.[0] ?? null
                  }
                  : s
              )
            )
          }
        />

        <h3 id='addQuestionTitle'>Lisa küsimus</h3>

        <input
          value={step.questionInput}
          onChange={(e) =>
            updateQuestionInput(
              stepIndex,
              e.target.value
            )
          }id='addQuestion'
        />

        <button
          type="button"
          id='addQuestionBtn'
          onClick={() => addQuestion(stepIndex)}
        >
          Lisa küsimus
        </button>

        {step.questions.map(question => (
          <div key={question.id}>
            {question.questionText}

            <button
              type="button"
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

        <h3 id='addDiscussionTitle'>Lisa arutelupunkt</h3>

        <input
          value={step.discussionInput}
          onChange={(e) =>
            updateDiscussionInput(
              stepIndex,
              e.target.value
            )
          } id='addDiscussion'
        />

        <button id='addDiscussionBtn'
          type="button"
          onClick={() =>
            addDiscussionPoint(stepIndex)
          }
        >
          Lisa arutelupunkt
        </button>

        {step.discussionPoints.map(point => (
          <div key={point.id}>
            {point.discussionText}

            <button
              type="button"
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

        <h3 id='addTeacherTextTitle'>Õpetaja tekst</h3>

        <input
          type="text"
          value={step.teacherTextInput}
          onChange={(e) =>
            updateTeacherTextInput(
              stepIndex,
              e.target.value
            )
          } id='addTeachText'
        />

        <button id='addTeachTextBtn'
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

        <hr />
      </div>
    ))}

    <button id='saveGameBtn'
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