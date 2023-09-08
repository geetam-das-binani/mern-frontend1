import React, { Fragment, useState, useEffect } from "react";
import './Updateprofile.css'
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import FaceIcon from "@mui/icons-material/Face";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "../../actions/userActions";
import { clearProfileError } from "../../Slices/profileSlice";

export default function UpdateProfile() {
    const { user} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
//   const registerSubmit = (e) => {
//     e.preventDefault();
//     const myform = new FormData();
//     myform.set("name", user.name);
//     myform.set("email", user.email);
    
//     myform.set("avatar", avatar);
   
//     register(dispatch, myform);
//   };

//   const registerDateChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(reader.result);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser((prev) => {
//         return { ...prev, [e.target.name]: e.target.value };
//       });
//     }
//   };
//   useEffect(() => {
   
    
//   }, [dispatch]);
  return (
    <Fragment>
        
        </Fragment>
  )
}
