import React, { Fragment, useEffect, useState } from "react";
import "./myOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderActions";
import { clearMyOrderFail } from "../../Slices/myOrdersSlice";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Metadata from "../layout/Metadata";
import LaunchIcon from "@mui/icons-material/Launch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/loader/Loader";
export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "green_Color" : "red_Color";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 300,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.paymentInfo.orderStatus,
        amount: item.paymentInfo.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearMyOrderFail());
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
    myOrders(dispatch);
  }, [dispatch, error]);
  return (
    <Fragment>
      <Metadata title={`${user.name}'s -  Orders`} />
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <Fragment>
          <div className="my__orders__page">
            <DataGrid
              rows={rows}
              columns={columns}
              getRowHeight={() => "auto"}
              disableSelectionOnClick
              className="my__orders__table"
            />
            <Typography id="my__order__heading">{`${user.name}'s Orders`}</Typography>
          </div>
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: " center",
            alignItems: "center",
            margin: "auto",
            textAlign: "center",
            height: "60vh",
            
          }}
          className="no__orders__placed__div"
        >
          
          <Typography
            style={{
              fontSize: "2vmax",
            }}
          >
            No orders have been placed yet
          </Typography>
          <Link
            style={{
              background: "tomato",
              textDecoration: "none",
              color: "white",
              margin: "2vmax",
              border: "none",
              padding: "1vmax 3vmax",
              cursor: "pointer",
              font: "400 1vmax Roboto",
            }}
            to="/products"
          >
            View Products
          </Link>
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
}
