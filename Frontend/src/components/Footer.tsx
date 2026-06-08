import './Footer.css';
import logo from "../assets/TLULogo.png";

// meie nimed
// TLÜ logo?

// kui tahta nt nimed vasakule, logo paremale serva, siis tuleks vist teha midagi row-dega (row) ja columnitega (col). 
// Vasakusse col-i läheb 5 rowd tekstina (meie nimed)
// Paremasse col-i ainsa elemendina logo
// Kõik kuidagi centered ka viisakalt

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