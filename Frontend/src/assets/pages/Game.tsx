import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


function Game() {

    //Praegu veel "barebones"

    const { id } = useParams()
    const { catid } = useParams()
    const [data, setData] = useState([])
    const [questions, setQuestions] = useState([])
    const [points, setPoints] = useState([])
    const [img, setImg] = useState()
    const [toggle, setToggle] = useState("false")

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${id}/steps`)
            .then(res => res.json())
            .then(json => { setData(json)})
            .catch(err => console.error(err));
    }, [id])

    function getQuestions() {
        setQuestions(data.gameSteps[0].questions)
    }

    function getPoints() {
        setPoints(data.gameSteps[0].discussionPoints)
    }

    function createImg() {
        let isMounted = false
        if (data.length != 0 && toggle == "false") {
            setToggle("true")
            if (data.gameSteps[0].mediaElements[0] === undefined) {
                alert("No media data")
            }
            else {
                let imgData = data.gameSteps[0].mediaElements[0].fileData
                setImg(imgData)
            }
        }
    }


    return (<>
        {createImg()}
        <img src={`data:image/png;base64,${img}`} />
        <h1>Nimi: {data.name}</h1>
        <h3>Kirjeldus: {data.description}</h3>
        <button onClick={() => { getQuestions() }}>Questions</button>
        <div>Küsimused: </div>
        {questions.map((question) => (
            <div key={question.id}>{question.questionText}</div>
        ))}

        <button onClick={() => { getPoints() }}>Discussion points</button>
        <div>Küsimused: </div>
        {points.map((point) => (
            <div key={point.id}>{point.discussionText}</div>
        ))}
    </>
    )
}

export default Game
