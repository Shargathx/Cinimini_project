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

    function deleteGame(gameId: number) {
        fetch(import.meta.env.VITE_BACK_URL + `/games/${gameId}`, {
            method: "DELETE"
        }).then(()=>{window.location.reload()})
    }

    return (
        <div className="games-container">
            {gamesList.map(game => (
                <>
                    <Link
                        key={game.id}
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

                    <button onClick={() => { deleteGame(Number(game.id)) }}>Delete game</button>
                    <Link to={`/update-game/${game.id}`}><button onClick={()=>{ localStorage.setItem("mode", "edit");
                                                                                localStorage.setItem("id", String(game.id)),
                                                                                localStorage.setItem("catid", String(catid))}}>Edit</button></Link>
                </>

            ))}
        </div>
    );
}

export default CategoryGame;