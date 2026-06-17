import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultGameIcon from '../icons/defaultGameIcon.svg';
import './CategoryGame.css';
import type { Game } from "../models/Game";


function CategoryGame() {
    const { catid } = useParams<{ catid: string }>();
    const [activegames, setActivegames] = useState<Game[]>([])
    const [inactivegames, setInactivegames] = useState<Game[]>([])
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/category/games/${catid}`, {
            method: "GET"
        }).then(res => res.json()).then(json => { setActivegames(json); setGames(json) })

    }, [catid])


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}/category/inactive-games`, {
            method: "GET"
        }).then(res => res.json()).then(json => setInactivegames(json))

    }, [catid])


    function softDelete(gameId: number) {
        fetch(import.meta.env.VITE_BACK_URL + `/ games / ${gameId}`, {
            method: "DELETE"
        }).then(() => { window.location.reload() })
    }

    function hardDelete(gameId: number) {
        fetch(import.meta.env.VITE_BACK_URL + `/ games / delete -permanently / ${gameId}`, {
            method: "DELETE"
        }).then(() => { window.location.reload() })
    }




    return (<>
        <button onClick={() => { setGames(activegames) }}>Active games</button>
        <button onClick={() => { setGames(inactivegames) }}>Inactive games</button>
        <div id="gameContainer" className="games-container">
            {games.map((game) => (
                <div className="game-item" key={game.id}>
                    <Link
                        to={`/categories/${catid}/${game.id}`}
                        className={
                            "game-card" +
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

                    <div className="gameButtons">
                        <button
                            className="deleteBtn"
                            onClick={() => softDelete(Number(game.id))}
                        >
                            SOFT DELETE
                        </button>
                        <button
                            className="deleteBtn"
                            onClick={() => hardDelete(Number(game.id))}
                        >
                            HARD DELETE
                        </button>

                        <Link to={`/update-game/${game.id}`}>
                            <button
                                className="editBtn"
                                onClick={() => {
                                    localStorage.setItem("mode", "edit");
                                    localStorage.setItem("id", String(game.id));
                                    localStorage.setItem("catid", String(catid));
                                }}
                            >
                                EDIT
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </>
    );
}

export default CategoryGame;