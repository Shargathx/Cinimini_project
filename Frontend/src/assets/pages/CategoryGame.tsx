import { useParams } from "react-router-dom";
import type { Game } from "../models/Game";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function CategoryGame() {
    const { catid } = useParams();
    const [categoryGame, setCategoryGame] = useState<Game[]>([])

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${catid}`)
            .then(res => res.json())
            .then(json => setCategoryGame(json))
            .catch(err => console.error(err));
    }, [catid])


    return <div>
        {categoryGame.map(game =>
            <div key={game.id}>
                <Link to={`/categories/${catid}/${game.id}`}>
                    id: {game.id}<br/> Name: {game.name}<br/> Description: {game.description}<hr/>
                </Link>
            </div>)}
    </div>;
}

export default CategoryGame