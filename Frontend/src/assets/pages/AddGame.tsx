import React from 'react'
import { useEffect, useState } from 'react'

function AddGame() {
  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState()
  const [newPoint, setNewpoint] = useState()
  const [questionCounter, setQuestionCounter] = useState(0)
  const [steps, setSteps] = useState([])
  const [stepCounter, setStepCounter] = useState(1)
  const [discussionPoints, setDiscussionPoints] = useState([])
  const [discussionPointsCounter, setDiscussionPointsCounter] = useState(0)


  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
      .catch(err => console.error(err));
  }, []);

  function addQuestion(newQuestion) {
    setQuestionCounter(questionCounter + 1)
    if (questions.length == 0) {
      setQuestions([{ id: questionCounter, question: newQuestion }])
    }
    else {
      setQuestions([...questions, { id: questionCounter, question: newQuestion }])
    }
  }

  function deleteQuestion(id) {
    setQuestions(questions.filter(a => a.id != id))
  }

  function addDiscussionpoint(newPoint) {
    setDiscussionPointsCounter(discussionPointsCounter + 1)
    if (discussionPoints.length == 0) {
      console.log("Test")
      setDiscussionPoints([{ id: discussionPointsCounter, point: newPoint }])
    }
    else {
      setDiscussionPoints([...discussionPoints, { id: discussionPointsCounter, point: newPoint }])
    }
  }

  function deletePoint(id) {
    setDiscussionPoints(discussionPoints.filter(a => a.id != id))
  }

  return (<>
    <h1>Loo mäng</h1>
    <label>Mängu nimi: </label>
    <input id='gameName'></input><br></br>
    <label>kategooria: </label>
    <select id='gameCat'>
      {categories.map((category) => (
        <option value={category.id}>{category.name}</option>
      ))}
    </select><br />

    <label>Kirjeldus: </label><br />
    <textarea></textarea>
    <hr></hr>

    <h1>Mängu sammud</h1>

    <h2>Lae ülesse pilt:</h2>
    <input type='file'></input>
      
    <h2>Lisa küsimus</h2>
    <input onChange={(e) => { setNewQuestion(e.target.value) }} id='addQuestion' name='addQuestion' type='text'></input><br />
    <button onClick={() => { addQuestion(newQuestion) }}>Lisa Küsimus</button>
    <div>Küsimused: </div>
    {questions.map((question) =>
      (<div>{question.question} <button onClick={() => { deleteQuestion(question.id) }}>Kustuda</button></div>)
    )}

    <h2>Lisa Arutelu</h2>
    <input onChange={(e) => { setNewpoint(e.target.value) }} id='addQuestion' name='addQuestion' type='text'></input><br />
    <button onClick={() => { addDiscussionpoint(newPoint) }}>Lisa Arutelupunkt</button>
    <div>Arutelu punktid: </div>
    {discussionPoints.map((discussionPoint) =>
      (<div>{discussionPoint.point} <button onClick={() => { deletePoint(discussionPoint.id) }}>Kustuda</button></div>)
    )}
  </>
  )
}

export default AddGame