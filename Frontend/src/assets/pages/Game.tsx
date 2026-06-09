import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Game.css';
import type { Game } from '../models/Game'
import type { Question } from '../models/Question'
import type { Discussion } from '../models/Discussion'
import ImageGreyscale from '../../components/ImageGreyscale';


function Game() {

    //Praegu veel "barebones"

    const { id } = useParams()
    const { catid } = useParams() // TODO: on vaja?
    const [data, setData] = useState<Game | null>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [points, setPoints] = useState<Discussion[]>([])
    // const [img, setImg] = useState<string>("")
    // const [toggle, setToggle] = useState(false)
    const img = data?.gameSteps[0]?.mediaElements?.[0]?.fileData ?? ""

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${id}/steps`)
            .then(res => res.json())
            .then(json => { setData(json) })
            .catch(err => console.error(err));
    }, [id])

    function getQuestions() {
        if (data) {
            setQuestions(data.gameSteps[0].questions)
        }
    }

    function getPoints() {
        if (data) {
            setPoints(data.gameSteps[0].discussionPoints)
        }
    }
    /*
        function createImg() {
            let isMounted = false // commented out for now (not used anywhere?)
            if (data && !toggle) {
                setToggle(true)
                if (data.gameSteps[0].mediaElements[0] === undefined) {
                    alert("No media data")
                }
                else {
                    let imgData = data.gameSteps[0].mediaElements[0].fileData
                    setImg(imgData)
                }
            }
        }
            */


    return (<>
        {/* {createImg()} */}

        {img && (
            <ImageGreyscale imageData={img} />
        )}


        {/* {img && (
            <img
                src={`data:image/png;base64,${img}`}
                alt="Game"
            />
        )} */}


        <h1>Mängu nimi: {data?.name}</h1>
        <h3>Kirjeldus: {data?.description}</h3>
        <button onClick={() => { getQuestions() }}>Questions</button>
        <div>Küsimused: </div>
        {questions.map((question) => (
            <div key={question.id}>{question.questionText}</div>
        ))}

        <button onClick={() => { getPoints() }}>Discussion points</button>
        <div>Arutelu punktid: </div>
        {points.map((point) => (
            <div key={point.id}>{point.discussionText}</div>
        ))}
    </>
    )
}

export default Game
