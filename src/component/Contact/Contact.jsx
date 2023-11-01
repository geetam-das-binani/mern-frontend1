import React from 'react'
import "./Contact.css";
import Button from "@mui/material/Button";

export default function Contact() {
  return (
    <div className="contact__container">
      <a className="mail__btn" 
      href="mailto:geetambinani6@gmail.com">
        <Button>Contact: mymailforgeetambinani6@gmail.com</Button>
      </a>
    </div>
  )
}
