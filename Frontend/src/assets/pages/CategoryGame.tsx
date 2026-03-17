import { useParams } from "react-router-dom";

function CategoryGame() {
    const { id } = useParams();

    return <h1>Category: {id}</h1>;
}

export default CategoryGame