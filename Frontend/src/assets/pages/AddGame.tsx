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
  //Media
  const [media, setMedia] = useState<Media[]>([])

  const [steps, setSteps] = useState<CreateGameStep[]>([
    {
      image: null,
      questions: [],
      discussionPoints: []
    }
  ])
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
    console.log(formData)


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
      <input multiple id='uploadImageBtn' type="file"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);

          setMedia((prev) => [...prev, ...files] || [prev]);
          console.log(media)
          setSteps(prev =>
            prev.map((step, index) => index === 0 ? { ...step, image: media } : step))
          console.log(steps)
        }}
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
  )
}

export default AddGame