import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


function Game() {


    const { id } = useParams()
    const { catid } = useParams()
    const [gameSteps, setGameSteps] = useState({})

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${id}/steps`)
            .then(res => res.json())
            .then(json => setGameSteps(json))
            .catch(err => console.error(err));
    }, [id])
    return (<>
    <div>{gameSteps.name}</div>

    </>
    )
}

export default Game