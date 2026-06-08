import { useEffect, useState } from 'react'
import type { Category } from '../models/Category'
import type { CreateGameStep } from '../models/CreateGameStep'
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

  type GameStepForm = CreateGameStep & {
    questionInput: string;
    discussionInput: string;
  }


  const [steps, setSteps] = useState<GameStepForm[]>([
    {
      image: null,
      questions: [],
      discussionPoints: [],
      questionInput: "",
      discussionInput: ""
    }
  ]);

  //ChatGPT version

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
      questionInput: "",
      discussionInput: ""
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


    for (const value of formData.values()) {
      console.log(value);
    }
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

      setSteps([
        {
          image: null,
          questions: [],
          discussionPoints: [],
          questionInput: "",
          discussionInput: ""
        }
      ]);

    } catch (err) {
      console.error(err);
    }
  };

  /*
  function addDiscussionpoint(newPoint: string) {
    const newId = discussionPointsCounter + 1;

    setDiscussionPointsCounter(newId);

    setSteps(prev =>
      prev.map((step, index) =>
        index === 0 ? { ...step, discussionPoints: [...step.discussionPoints, { id: newId, discussionText: newPoint }] } : step));
    setNewpoint("");
  }
*/

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

    <div></div>
    <button type="button" onClick={addStep}>
      Lisa uus samm
    </button>

    {steps.map((step, stepIndex) => (
      <div key={stepIndex}>
        <h2>Samm {stepIndex + 1}</h2>

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

        <h3>Lisa küsimus</h3>

        <input
          value={step.questionInput}
          onChange={(e) =>
            updateQuestionInput(
              stepIndex,
              e.target.value
            )
          }
        />

        <button
          type="button"
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

        <h3>Lisa arutelupunkt</h3>

        <input
          value={step.discussionInput}
          onChange={(e) =>
            updateDiscussionInput(
              stepIndex,
              e.target.value
            )
          }
        />

        <button
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
        <hr />
      </div>
    ))}
    <button
      type="submit"
      onClick={handleSubmit}
    >
      SALVESTA
    </button>
  </>)

  /*
    //Form data
  
    useEffect(() => {
      fetch(import.meta.env.VITE_BACK_URL + "/categories")
        .then(res => res.json())
        .then(json => setCategories(json))
        .catch(err => console.error(err));
    }, []);
  
    function addQuestion(newQuestion: string) {
      const newId = questionCounter + 1;
  
      setQuestionCounter(newId);
  
      setSteps(prev =>
        prev.map((step, index) =>
          index === 0 ? { ...step, questions: [...step.questions, { id: newId, questionText: newQuestion }] } : step));
    }
  
    function deleteQuestion(id: number) {
      setSteps(prev =>
        prev.map((step, index) =>
          index === 0 ? { ...step, questions: step.questions.filter(q => q.id !== id) } : step));
    }
  
    const handleSubmit = () => {
  
      const missingImage = steps.some(step => !step.image);
  
      if (missingImage) {
        alert("Kõigil sammudel peab olema meediafail!");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("categoryId", String(category));
  
      steps.forEach((step, stepIndex) => {
        if (step.image) {
          formData.append(
            `steps[${stepIndex}].image`, step.image);
        }
  
        step.questions.forEach((question, questionIndex) => {
          formData.append(
            `steps[${stepIndex}].questions[${questionIndex}]`, question.questionText);
        });
  
        step.discussionPoints.forEach((discussion, discussionIndex) => {
          formData.append(
            `steps[${stepIndex}].discussionPoints[${discussionIndex}]`, discussion.discussionText
          );
        });
      });
  
      fetch(import.meta.env.VITE_BACK_URL + "/games/add-game", {
        method: "POST",
        body: formData
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to save game");
          }
          alert("Game saved!");
          setName("");
          setDescription("");
          setSteps([
            {
              image: null,
              questions: [],
              discussionPoints: []
            }
          ]);
        }).catch(err => console.error(err));
    }
  
    function addDiscussionpoint(newPoint: string) {
      const newId = discussionPointsCounter + 1;
  
      setDiscussionPointsCounter(newId);
  
      setSteps(prev =>
        prev.map((step, index) =>
          index === 0 ? { ...step, discussionPoints: [...step.discussionPoints, { id: newId, discussionText: newPoint }] } : step));
      setNewpoint("");
    }
  
    function deletePoint(id: number) {
      setSteps(prev =>
        prev.map((step, index) => index === 0 ? { ...step, discussionPoints: step.discussionPoints.filter(p => p.id !== id) } : step));
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
  
      <div>
  
        <h2 id='uploadImageTitle'>Lae üles pilt:</h2>
        <input id='uploadImageBtn' type="file"
          onChange={(e) =>
            setSteps(prev =>
              prev.map((step, index) => index === 0 ? { ...step, image: e.target.files?.[0] ?? null } : step))}
        />
  
        <h2 id='addQuestionTitle'>Lisa küsimus</h2>
        <input value={newQuestion} onChange={(e) => { setNewQuestion(e.target.value) }} id='addQuestion' name='addQuestion' type='text'></input><br />
        <button id='addQuestionBtn' type='button' onClick={() => { addQuestion(newQuestion) }}>Lisa Küsimus</button>
        <div id='questionsList'>Küsimused: </div>
        {
          steps[0].questions.map((question) =>
            (<div key={question.id}>{question.questionText} <button id='deleteQuestionBtn' onClick={() => { deleteQuestion(question.id) }}>Kustuta</button></div>)
          )
        }
  
        <h2 id='addDiscussionTitle'>Lisa Arutelu</h2>
        <input value={newPoint} onChange={(e) => { setNewpoint(e.target.value) }} id='addDiscussion' name='addQuestion' type='text'></input><br />
        <button id='addDiscussionBtn' type='button' onClick={() => { addDiscussionpoint(newPoint) }}>Lisa Arutelupunkt</button>
        <div id='discussionPointsList'>Arutelu punktid: </div>
        {
          steps[0].discussionPoints.map((discussionPoint) =>
            (<div key={discussionPoint.id}>{discussionPoint.discussionText} <button id='deleteDiscussionBtn' onClick={() => { deletePoint(discussionPoint.id) }}>Kustuta</button></div>)
          )
        }
        <hr></hr>
        <button id='saveGameBtn' onClick={() => { handleSubmit() }} type='submit'>SALVESTA</button>
  
      </div>
    </>
    )*/

}

export default AddGame