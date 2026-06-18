import './Footer.css';
import logo from "../assets/TLULogo.png";


function Footer() {
    const names = ["Martin Saareväli", "Anette Aruorg", "Roland Piperal", "Carolina Treu", "Õnne-Elisabeth Maripu"]
    return (
        <footer className="footer">
            <div className="footer-left">
                {names.map((name, index) => (
                    <div key={index} className="footer-name">
                        {name}
                    </div>
                ))}
            </div>

            <div className="footer-right">
                <img src={logo} alt="Logo" />
            </div>
        </footer>
    );
}

export default Footer;