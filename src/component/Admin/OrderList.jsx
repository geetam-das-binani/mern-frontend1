import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAdmin,
  deleteOrderAdmin,
} from "../../actions/orderActions";
import { clearAllOrdersFail } from "../../Slices/adminAllOrdersSlice";
import {
  resetAdminDeleteOrderSuccess,
  clearDeleteOrderFail,
} from "../../Slices/deleteUpdateOrderAdminSlice";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../layout/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";
import { Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector(
    (state) => state.adminGetAllOrders
  );
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.deleteUpdateOrderAdmin
  );
  const deleteOrderHandler = (id) => {
    deleteOrderAdmin(dispatch, id);
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
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
      flex: 0.4,
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
      minwidth: 150,
      type: "number",
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.paymentInfo.totalPrice,
        status: item.paymentInfo.orderStatus,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearAllOrdersFail());
    }
    if (deleteError) {
      toast.error(deleteError, { theme: "dark" });
      dispatch(clearDeleteOrderFail());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully", { theme: "dark" });
      dispatch(resetAdminDeleteOrderSuccess());
      navigate("/admin/orders");
    }

    getAllOrdersAdmin(dispatch);
  }, [dispatch, error, isDeleted, deleteError, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <Fragment>
          <Metadata title="ALL ORDERS-Admin" />
          <div className="dashboard">
            <Sidebar />
            <div className="products__lists__container">
              <h1 id="product__list__heading">ALL ORDERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                className="product__list__table"
                getRowHeight={() => "auto"}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="no__orders__placed__div">
          <CancelIcon />
          <Typography>Currently No orders placed</Typography>
          <Link to="/admin/dashboard">View Dashboard</Link>
        </div>
      )}

      <ToastContainer />
    </Fragment>
  );
}
