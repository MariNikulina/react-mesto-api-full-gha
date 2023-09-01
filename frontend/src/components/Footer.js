import React from "react";

function Footer() {

  const year = new Date().getFullYear();

    return (
        <footer className="footer container__section">
      <p className="footer__info">&copy; {year} Mesto Russia</p>
    </footer>
    )
}

export default Footer;