import React, { Fragment, useState } from "react";
import "./Header.css";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../../../actions/userActions";
export default function UserOptions({ avatar, role }) {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const dashboard = () => {
    navigate("/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const logoutUser = async () => {
    logout(dispatch);
  };

  const goToCart = () => {
    navigate("/cart");
  };
  const options = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: account,
    },
    {
      icon: <ShoppingCartIcon />,
      name: `Cart(${cartItems.length})`,
      func: goToCart,
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutUser,
    },
  ];
  if (role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="Speeddial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speed__dial"
        style={{ zIndex: "11" }}
        icon={
          <img
            src={avatar?.url}
            alt="Profile"
            className="speed__dial__icon"
          ></img>
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}
