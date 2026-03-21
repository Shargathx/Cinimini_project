import { useNavigate } from "react-router-dom";

<div>
</div>

function Home() {
    const navigate = useNavigate();

    function handleStart() {
        navigate("/categories");
    }

    return (
        <div>
            <button id="gameStart" onClick={handleStart}>Alusta mängimist</button>

        </div>
    )
}

export default Home