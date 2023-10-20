import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../layout/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";
import { clearAllUsersFail } from "../../Slices/adminAllUsersSlice";
import {
  resetAdminDeleteUserSuccess,
  clearAdminDeleteUserFail,
} from "../../Slices/deleteUpdateUserAdminSlice";
import { deleteUser, getAllUsersAdmin } from "../../actions/userActions";
import CancelIcon from "@mui/icons-material/Cancel";
import { Typography } from "@mui/material";

export default function Userslist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, error, loading } = useSelector(
    (state) => state.adminGetAllUsers
  );


  const {
    isDeleted,
    error: deleteError,
    message,
  } = useSelector((state) => state.deleteUpdateUserAdmin);
  const deleteUserHandler = (id) => {
  deleteUser(dispatch,id)
  };
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minwidth: 180,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minwidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minwidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minwidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "green_Color" : "red_Color";
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      minwidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        role: item.role,
        email: item.email,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearAllUsersFail());
    }
    if (deleteError) {
      toast.error(deleteError, { theme: "dark" });
      dispatch(clearAdminDeleteUserFail());
    }
    if (isDeleted) {
      toast.success(message, { theme: "dark" });
      dispatch(resetAdminDeleteUserSuccess());
      navigate("/admin/users");
    }

    getAllUsersAdmin(dispatch);
  }, [dispatch, error, isDeleted, deleteError, navigate,message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : users.length > 0 ? (
        <Fragment>
          <Metadata title="ALL USERS-Admin" />
          <div className="dashboard">
            <Sidebar />
            <div className="products__lists__container">
              <h1 id="product__list__heading">ALL USERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                getRowHeight={() => "auto"}
                disableSelectionOnClick
                className="product__list__table"
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            textAlign: "center",
            height: "60vh",
          }}
        >
          <CancelIcon
          style={{
            color:" tomato",
            fontSize: "7vmax"
          }}
          
          />
          <Typography style={{ fontSize: "2vmax" }}>
            Currently No Users 
          </Typography>
          <Link
            style={{
              background: "rgb(51, 51, 51)",
              textDecoration: "none",
              color: "white",
              margin: " 2vmax",
              border: "none",
              padding: "1vmax 3vmax",
              cursor: "pointer",
              font: " 400 1vmax Roboto",
            }}
            to="/admin/dashboard"
          >
            View Dashboard
          </Link>
        </div>
      )}

      <ToastContainer />
    </Fragment>
  );
}
