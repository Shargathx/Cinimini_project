import { useParams } from "react-router-dom";
import type { Game } from "../models/Game";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import defaultGameIcon from '../icons/defaultGameIcon.svg';
import './CategoryGame.css';

function CategoryGame() {
    const { catid } = useParams();
    const [categoryGame, setCategoryGame] = useState<Game[]>([])

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${catid}`)
            .then(res => res.json())
            .then(json => setCategoryGame(json))
            .catch(err => console.error(err));
    }, [catid])

    function deleteGame(gameId: number) {
        fetch(import.meta.env.VITE_BACK_URL + `/games/${gameId}`, {
            method: "DELETE"
        }).then(res => res.json())
            .then(json => setCategoryGame(json))
    }


    return <div className="games-container">
        {categoryGame.map(game =>
            <>
                <Link
                    key={game.id}
                    to={`/categories/${catid}/${game.id}`}
                    className={
                        "game-card " +
                        (catid === "1" ? " heli" : "") +
                        (catid === "2" ? " video" : "") +
                        (catid === "3" ? " pilt" : "")
                    }
                >
                    <img src={defaultGameIcon} alt="DefaultIcon" className="game-icon" />

                    <div className="game-name">
                        {game.name}
                    </div>
                </Link>
                <button onClick={() => { deleteGame(Number(game.id)) }}>Delete game</button>
            </>
        )}
    </div>;
}

export default CategoryGame