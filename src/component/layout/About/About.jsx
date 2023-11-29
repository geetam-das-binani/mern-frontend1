import React from "react";
import "./aboutSection.css";
import Button from "@mui/material/Button";
import { Typography, Avatar } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function About() {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/_g.e.e.t.a.m_/?hl=en";
  };
  const visitFacebook = () => {
    window.location = "https://www.facebook.com/geetamdas.binani.1/";
  };

  return (
    <div className="about__section">
      <div></div>
      <div className="about__section__gradient"></div>
      <div className="about__section__container">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://scontent.fccu2-2.fna.fbcdn.net/v/t1.6435-9/136692676_1259289137768933_8353816766435441811_n.jpg?stp=dst-jpg_s851x315&_nc_cat=101&ccb=1-7&_nc_sid=c21ed2&_nc_ohc=SvytvoL5JHsAX_XWTxl&_nc_ht=scontent.fccu2-2.fna&oh=00_AfCpEfCqMdRp2eEz2sWRlO7IYu95gF7BWjLt-EXv8MZCHQ&oe=6575C08B"
              alt="Founder"
            />
            <Typography>Geetam Das Binani</Typography>
            <Button onClick={visitInstagram} color="secondary">
              Visit Instagram
            </Button>
            <Button onClick={visitFacebook} color="primary">
              Visit Facebook
            </Button>
            <span>This is a e-commerce wesbite made by @megeetamdasbinani.</span>
          </div>
          <div className="about__section__container2">
            <Typography component="h2">Our Brands</Typography>

            <a href="https://www.instagram.com/_g.e.e.t.a.m_/?hl=en" target="blank">
              <InstagramIcon className="instagram__svg__icon" />
            </a>
            <a
              href="https://www.facebook.com/geetamdas.binani.1/"
              target="blank"
            >
              <FacebookIcon className="facebook__svg__icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
