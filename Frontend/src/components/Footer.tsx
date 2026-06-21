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
            <div className='copyright-info'>
             <span>This work is licensed under</span>

                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                    CC BY-SA 4.0
                </a>

                <img
                    src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                    alt="Creative Commons"
                    style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }}
                />

                <img
                    src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                    alt="Attribution"
                    style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }}
                />

                <img
                    src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"
                    alt="Share Alike"
                    style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }}
                />
                </div>


            <div className="footer-right">
               
                <img src={logo} alt="Logo" />
            </div>
        </footer>
    );
}

export default Footer;