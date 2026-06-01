import { useEffect, useState } from 'react'

function AddGame() {
  const [categories, setCategories] = useState([])
  //Game file, name and category
  const [imgFile, setImgFile] = useState()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("1")
  //Game questions
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState()
  const [questionCounter, setQuestionCounter] = useState(0)
  //Discussion points
  const [newPoint, setNewpoint] = useState()
  const [discussionPoints, setDiscussionPoints] = useState([])
  const [discussionPointsCounter, setDiscussionPointsCounter] = useState(0)
  //Form data
  const formData = new FormData()

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
      .catch(err => console.error(err));
  }, []);

  function addQuestion(newQuestion: string) {
    setQuestionCounter(questionCounter + 1)
    if (questions.length == 0) {
      setQuestions([{ id: questionCounter, question: newQuestion }])
    }
    else {
      setQuestions([...questions, { id: questionCounter, question: newQuestion }])
    }
  }

  function deleteQuestion(id: number) {
    setQuestions(questions.filter(a => a.id != id))
  }

  const handleSubmit = (id: number) => {
    formData.append("name", name)
    formData.append("description", description)
    formData.append("categoryId", category)
    formData.append(`steps[${id}].image`, imgFile)
    for (let i = 0; i < questions.length; i++) {
      formData.append(`steps[${id}].questions[${i}]`, questions[i].question)
    }
    for (let i = 0; i < discussionPoints.length; i++) {
      formData.append(`steps[${id}].discussionPoints[${i}]`, discussionPoints[i].point)
    }
    for (let pair of formData.entries()) {
      localStorage.setItem("formdata", pair[0] + ', ' + pair[1]);
    }
    fetch(import.meta.env.VITE_BACK_URL + "/games/add-game", {
      method: "POST",
      body: formData
    })
  }

  function addDiscussionpoint(newPoint: string) {
    setDiscussionPointsCounter(discussionPointsCounter + 1)
    if (discussionPoints.length == 0) {
      setDiscussionPoints([{ id: discussionPointsCounter, point: newPoint }])
    }
    else {
      setDiscussionPoints([...discussionPoints, { id: discussionPointsCounter, point: newPoint }])
    }
  }

  function deletePoint(id: number) {
    setDiscussionPoints(discussionPoints.filter(a => a.id != id))
  }

  return (<>
    <h1>Loo mäng</h1>
    <label>Mängu nimi: </label>
    <input id='gameName' onChange={(e) => { setName(e.target.value) }}></input><br></br>
    <label>kategooria: </label>
    <select onChange={(e) => { setCategory(e.target.value) }} id='gameCat' name='gameCat' >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select><br />

    <label>Kirjeldus: </label><br />
    <textarea onChange={(e) => { setDescription(e.target.value) }}></textarea>
    <hr></hr>

    <div>

      <h2>Lae ülesse pilt:</h2>
      <input onChange={(e) => { setImgFile(e.target.files[0]) }} type='file'></input>

      <h2>Lisa küsimus</h2>
      <input onChange={(e) => { setNewQuestion(e.target.value), console.log(e.target.value) }} id='addQuestion' name='addQuestion' type='text'></input><br />
      <button type='button' onClick={() => { addQuestion(newQuestion) }}>Lisa Küsimus</button>
      <div>Küsimused: </div>
      {
        questions.map((question) =>
          (<div key={question.id}>{question.question} <button onClick={() => { deleteQuestion(question.id) }}>Kustuda</button></div>)
        )
      }

      <h2>Lisa Arutelu</h2>
      <input onChange={(e) => { setNewpoint(e.target.value) }} id='addQuestion' name='addQuestion' type='text'></input><br />
      <button type='button' onClick={() => { addDiscussionpoint(newPoint) }}>Lisa Arutelupunkt</button>
      <div>Arutelu punktid: </div>
      {
        discussionPoints.map((discussionPoint) =>
          (<div key={discussionPoint.id}>{discussionPoint.point} <button onClick={() => { deletePoint(discussionPoint.id) }}>Kustuda</button></div>)
        )
      }
      <hr></hr>
      <button onClick={() => { handleSubmit(stepCounter) }} type='submit'>SALVESTA</button>

    </div>
  </>
  )
}

export default AddGame