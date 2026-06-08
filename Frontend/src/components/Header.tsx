import './Header.css';
import  '../index.css';
// menüüriba (avalehe element (igal pool, viib tagasi avalehele), infonupp (kas headerisse või eraldi elemendina)
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const path = location.pathname;

    const showAddGame = ["/", "/categories"].includes(path);
    const showHomePage = ["/categories", "/add-game", "/categories/1", "/categories/2", "/categories/3", "/categories/1/1", "/categories/2/1", "/categories/3/1"].includes(path);
    const showCategories = ["/add-game", "/categories/1", "/categories/2", "/categories/3", "/categories/1/1", "/categories/1/1", "/categories/2/1", "/categories/3/1"].includes(path);
    const showPageInfo = ["/"].includes(path);
    const showAbout = ["/"].includes(path);
    const showCategoriesInfo = ["/categories"].includes(path);

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
                    <button className="page-info-button">
                        MIS ON MINIKINO?
                    </button>
                )}

                {showAbout && (
                    <button className="about-button">
                        MEIST
                    </button>
                )}

                {showCategoriesInfo && (
                    <button className="categories-info-button">
                        TUTVU KATEGOORIATEGA
                    </button>
                )}

            </nav>
        </header>
    );
}

export default Header;