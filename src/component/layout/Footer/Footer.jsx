import React from "react";
import playstore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import { Link } from "react-router-dom";
import './footer.css' 
export default function Footer() {
  return (
    <footer id="footer">
      <div className="left_footer">
        <h4>Download our App</h4>
        <p>Download App for ios and Android mobile phone</p>
        <img src={playstore} alt="playstore" />
        <img src={Appstore} alt="Appstore" />
      </div>
      <div className="middle_footer">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyright,2023 &copy; MeGeetam</p>
      </div>
      <div className="right_footer">
        <h4>Follow us</h4>
        <Link to="https://www.facebook.com">Facebook</Link>
        <Link to="https://www.instagram.com">Instagram</Link>
        <Link to="https://www.telegram.com">Telegram</Link>
      </div>
    </footer>
  );
}
