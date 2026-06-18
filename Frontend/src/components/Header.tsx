import './Header.css';
import '../index.css';
import ReactMarkdown from "react-markdown";
import CloseBtn from "../assets/icons/closePopup.svg";
import { useState } from 'react';
// menüüriba (avalehe element (igal pool, viib tagasi avalehele), infonupp (kas headerisse või eraldi elemendina)
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const path = location.pathname;

    const showAddGame = path === "/categories" || 
        path.startsWith("/categories/");
    const showHomePage =
        path === "/categories" ||
        path === "/add-game" ||
        path.startsWith("/update-game/")||
        path === "/register" ||
        path === "/login" ||
        path.startsWith("/categories/");
    const showCategories =
        path === "/add-game" ||
         path.startsWith("/update-game/") ||
        path.startsWith("/categories/");
    const showPageInfo = path === "/";
    const showAbout = path === "/";
    const showCategoriesInfo = path === "/categories";
    const showLogin = path === "/" ||
        path === "/register";
    const showRegister = path === "/" ||
        path === "/login";

    const [text, setText] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState("");

    const openPopup = async (file: string, type: string) => {
        console.log("open popup clicked:", file);
        const response = await fetch(file);
        const data = await response.text();

        setText(data);
        setPopupType(type);
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
                
                {showLogin && (
                        <a href="/login" className="login-link">
                            LOGI SISSE
                        </a>

                )}

                {showRegister && (
                    <a href="/register" className="register-link">
                            REGISTREERI
                        </a>

                )}

                {showAddGame && (
                    <a onClick={() => { localStorage.setItem("mode", "add") }} href="/add-game" className="add-game-link">
                        LISA MÄNG
                    </a>
                )}

                {showCategories && (
                    <a href="/categories" className="categories-link">
                        KATEGOORIAD
                    </a>
                )}

                {showPageInfo && (
                    <button className="page-info-button" onClick={() => openPopup('/texts/page-info.txt', 'page-info')}>
                        MIS ON MINIKINO?
                    </button>
                )}

                {showAbout && (
                    <button className="about-button" onClick={() => openPopup('/texts/about.txt', 'about')}>
                        MEIST
                    </button>
                )}

                {showCategoriesInfo && (
                    <button className="categories-info-button" onClick={() => openPopup('/texts/categories-info.txt', 'categories-info')}>
                        TUTVU KATEGOORIATEGA
                    </button>
                )}
            </nav>

            {showPopup && (
                <div className='popup-overlay'
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowPopup(false);
                        }
                    }}>

                    <div className={`popup-container popup-${popupType}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="popup-close-button"
                            onClick={() => {
                                setShowPopup(false);
                            }}
                        >
                            <img src={CloseBtn} alt="Close" />
                        </button>
                        <div className='popup-scroll-area'>
                            <div className="popup-text-container">
                                <ReactMarkdown>{text}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </header>

    );

}

export default Header;