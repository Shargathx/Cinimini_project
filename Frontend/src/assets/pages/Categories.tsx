import { useEffect, useState } from "react";
import type { Category } from "../models/Category";

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
        <div>
            {categories.map(category =>
                <div key={category.id}>
                    {category.id} - {category.name} - {category.description} - {category.active ? "Active" : "Inactive"}
                </div>)}
        </div>
    )
}

export default Categories