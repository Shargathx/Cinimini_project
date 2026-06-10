import './Header.css';
import  '../index.css';
import ReactMarkdown from "react-markdown";
import CloseBtn from "../assets/icons/closePopup.svg";
import { useState } from 'react';
// menüüriba (avalehe element (igal pool, viib tagasi avalehele), infonupp (kas headerisse või eraldi elemendina)
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const path = location.pathname;

    const showAddGame = ["/categories"].includes(path);
    const showHomePage =
        path === "/categories" ||
        path === "/add-game" ||
        path.startsWith("/categories/");
    const showCategories = 
        path === "/add-game" ||
        path.startsWith("/categories/");
    const showPageInfo = ["/"].includes(path);
    const showAbout = ["/"].includes(path);
    const showCategoriesInfo = ["/categories"].includes(path);

    const [text, setText] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = async (file: string) => {
        console.log("open popup clicked:", file);
        const response = await fetch(file);
        const data = await response.text();
        
        setText(data);
        setShowPopup(true);
    };

    return (
        <header className="header">
            <nav className="nav">

                {showHomePage && (
                    <a href="/" className="home-page-link">
                        AVALEHT
                    </a>
                )}

                {showAddGame && (
                    <a href="/add-game" className="home-page-link">
                        LISA MÄNG
                    </a>
                )}

                {showCategories && (
                    <a href="/categories" className="categories-link">
                        KATEGOORIAD
                    </a>
                )}

                {showPageInfo && (
                    <button className="page-info-button" onClick={() => openPopup('/texts/page-info.txt')}>
                        MIS ON MINIKINO?
                    </button>
                )}

                {showAbout && (
                    <button className="about-button" onClick={() => openPopup('/texts/about.txt')}>
                        MEIST
                    </button>
                )}

                {showCategoriesInfo && (
                    <button className="categories-info-button" onClick={() => openPopup('/texts/categories-info.txt')}>
                        TUTVU KATEGOORIATEGA
                    </button>
                )} 
                </nav>

                 {showPopup && (
                        <div className="popup-container">
                            <button 
                            className="popup-close-button" 
                            onClick={() => { setShowPopup(false);
                        }}
                        >
                        <img  src={CloseBtn} alt="Close" />
                    </button>
                    <div className="popup-text-container">
                    <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                </div>
                )}
           
        </header>
        
    );

}

export default Header;