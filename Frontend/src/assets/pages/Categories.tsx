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
        console.log("Backend URL:", import.meta.env.VITE_BACK_URL);
        fetch(import.meta.env.VITE_BACK_URL + "/categories")
            .then(res => res.json())
            .then(json => setCategories(json))
            .catch(err => console.error(err));
    }, []);

        const borderColors = [
        "rgba(124, 234, 255, 0.55)",
        "rgba(220, 205, 244, 0.8)",
        "rgba(145, 242, 190, 0.55)"
        ];

    return (
        <div className="categories-container">
            {categories.map((category, index) => (
                <div
                    key={category.id}
                    className="category-card"
                    style={{ border: `10px solid ${borderColors[index % borderColors.length]}` }}
                >
                    <Link to={`/categories/${category.id}`} className="category-link">
                        <div className="icon-wrapper">
                            {category.name === "Heli" && <img src={soundIcon} alt="Heli" className="icon" />}
                            {category.name === "Pilt" && <img src={imageIcon} alt="Pilt" className="icon" />}
                            {category.name === "Video" && <img src={videoIcon} alt="Video" className="icon" />}
                        <div className="category-info">
                            {category.name} 
                        </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Categories