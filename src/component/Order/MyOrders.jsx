import React, { Fragment, useEffect, useState } from "react";
import "./myOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderActions";
import { myOrderSuccess, clearMyOrderFail } from "../../Slices/myOrdersSlice";
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
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 150, flex: 0.3 },
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
      field:"actions",
      headerName:"Actions",
      flex:0.3,
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return (
          <Link to={`/order/${params.id}`}>
            <LaunchIcon/>
          </Link>
        )
      }
    }
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
    }, 1000);
    myOrders(dispatch);
  }, [dispatch, error]);
  return (
    <Fragment>
      <Metadata title={`${user.name}- Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
           pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrderHeading">{`${user.name}'s Orders`}</Typography>
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
}
