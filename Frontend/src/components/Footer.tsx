import './Footer.css';
import logo from "../assets/vite.svg";

// meie nimed
// TLÜ logo?

// kui tahta nt nimed vasakule, logo paremale serva, siis tuleks vist teha midagi row-dega (row) ja columnitega (col). 
// Vasakusse col-i läheb 5 rowd tekstina (meie nimed)
// Paremasse col-i ainsa elemendina logo
// Kõik kuidagi centered ka viisakalt

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-left">
                nimi 1, nimi 2, nimi 3
            </div>

            <div className="footer-right">
                {/* korralik logo hiljem siia */}
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </div>
        </footer>

    );
}

export default Footer;