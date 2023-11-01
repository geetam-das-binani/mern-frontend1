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
              src="https://instagram.fccu11-1.fna.fbcdn.net/v/t51.2885-19/239650888_344357554058468_2537498755271523435_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fccu11-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=E7BWcWDLzTwAX-8wYOi&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCFVSdlUnjlUElQnZCx2lbRP01b1jCqS0wbbbP-gy8LgA&oe=65474197&_nc_sid=8b3546"
              alt="Founder"
            />
            <Typography>Geetam Das Binani</Typography>
            <Button onClick={visitInstagram} color="secondary">
              Visit Instagram
            </Button>
            <Button onClick={visitFacebook} color="primary">
              Visit Facebook
            </Button>
            <span>This is a sample wesbite made by @megeetamdasbinani.</span>
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
