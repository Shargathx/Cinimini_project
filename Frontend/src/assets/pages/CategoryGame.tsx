import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../components/hooks/useFetch"; // Double check this path matches your folder structure!
import type { Game } from "../models/Game";
import defaultGameIcon from '../icons/defaultGameIcon.svg';
import './CategoryGame.css';

function CategoryGame() {
    const { catid } = useParams<{ catid: string }>();
    const { data: categoryGames, loading } = useFetch<Game[]>(`${import.meta.env.VITE_BACK_URL}/category/games/${catid}`, [catid]);

    if (loading) {
        return (
            <div className="game-loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p>Laeb mänge...</p>
            </div>
        );
    }

    const gamesList = categoryGames ?? [];

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

    return (
        <div className="games-container">
            {gamesList.map((game) => (
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
    );
}

export default CategoryGame;