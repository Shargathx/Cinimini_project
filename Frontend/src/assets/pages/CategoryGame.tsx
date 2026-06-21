import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultGameIcon from '../icons/defaultGameIcon.svg';
import './CategoryGame.css';
import type { Game } from "../models/Game";

import archiveIcon from "../icons/Archive.svg";
import deleteIcon from "../icons/Delete.svg";
import editIcon from "../icons/Edit.svg";


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
        fetch(import.meta.env.VITE_BACK_URL + `/games/${gameId}`, {
            method: "DELETE"
        }).then(() => { window.location.reload() })
    }

    function hardDelete(gameId: number) {
        fetch(import.meta.env.VITE_BACK_URL + `/games/delete-permanently/${gameId}`, {
            method: "DELETE"
        }).then(() => { window.location.reload() })
    }

    return (<>
        <div className="category-game-page">
            <h1>VALI MÄNG</h1>
            <div className="active-inactive-buttons">
                <button onClick={() => { setGames(activegames) }}>AKTIIVSED MÄNGUD</button>
                <button onClick={() => { setGames(inactivegames) }}>ARHIVEERITUD MÄNGUD</button>
            </div>
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
                                className="archiveBtn"
                                onClick={() => softDelete(Number(game.id))}
                            >
                                <img src={archiveIcon} alt="Archive" />
                            </button>
                            <button
                                className="deleteBtn"
                                onClick={() => hardDelete(Number(game.id))}
                            >
                                <img src={deleteIcon} alt="Delete" />
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
                                    <img src={editIcon} alt="Edit" />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default CategoryGame;