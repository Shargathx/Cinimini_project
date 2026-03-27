import { useNavigate } from "react-router-dom";
import gameStartIcon from '../icons/startGame.svg';
import './Home.css';
import gameLogo from '../logos/logo.svg';

<div>
</div>

function Home() {
    const navigate = useNavigate();

    function handleStart() {
        navigate("/categories");
    }

    return (
        <div className="game-start-container">
            <img src={gameLogo} alt="Minikino logo" className="game-logo" />
            <button id="gameStart" onClick={handleStart}>
                <img src={gameStartIcon} alt="Alusta mängimist" />
            </button>
            <h1>Alusta Mängimist</h1>
        </div>
    )
}

export default Home