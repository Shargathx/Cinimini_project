import './Header.css';
import  '../index.css';
// menüüriba (avalehe element (igal pool, viib tagasi avalehele), infonupp (kas headerisse või eraldi elemendina)

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <a href="/" className="home-page-link"> AVALEHT </a>
                <a href="/categories" className="categories-link"> KATEGOORIAD </a>
            </nav>
        </header>

    );
}

export default Header;