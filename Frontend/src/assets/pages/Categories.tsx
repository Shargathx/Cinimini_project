import { useEffect, useState } from "react";
import type { Category } from "../models/Category";
import { Link } from "react-router-dom";
import soundIcon from '../icons/sound.svg';
import imageIcon from '../icons/picture.svg';
import videoIcon from '../icons/video.svg';
import './Categories.css';



function Categories() {
    // renderdamine -> esmakordne komponendi pealetulek (nt uuele lehele minnes tehakse üldine lehe renderdus)
    // re-renderdamine -> komponendi HTMLs muutujate olekute muutmine (nt rippmenüüst millegi valimine uuendab ainult valitud asju või menüüd)

    const [categories, setCategories] = useState<Category[]>([]);
    // uef -> enter
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="categories-container">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className={
                        "category-card category-link" +
                        (category.name === "Heli" ? " heli" : "") +
                        (category.name === "Pilt" ? " pilt" : "") +
                        (category.name === "Video" ? " video" : "")
                    }
                >
                    {category.name === "Heli" && <img src={soundIcon} alt="Heli" className="icon" />}
                    {category.name === "Pilt" && <img src={imageIcon} alt="Pilt" className="icon" />}
                    {category.name === "Video" && <img src={videoIcon} alt="Video" className="icon" />}

                    <div className="category-info">
                        {category.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Categories