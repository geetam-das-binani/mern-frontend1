import React, { Fragment, useCallback, useEffect, useState } from "react";
import "./productReviews.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteReviews } from "../../actions/productActions";
import {
  resetDeleteReviewSuccess,
  clearReviewsError,
} from "../../Slices/adminDeleteReviewSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../layout/Metadata";

import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";

export default function ProductReviews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { productId } = useParams();
  if (productId) {
    localStorage.setItem("productId", productId);
  }
  const { reviews, error } = useSelector((state) => state.adminAllReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.adminDeleteReview
  );

  const deleteReviewHandler = (reviewId) => {
    productId = localStorage.getItem("productId");
    deleteReviews(dispatch, reviewId, productId);
  };

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minwidth: 200,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "User",
      minwidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minwidth: 150,

      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minwidth: 180,
      type: "number",
      flex: 0.4,
      cellClassName: (params) => {
        return params.value >= 3 ? "green_Color" : "red_Color";
      },
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
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });
  const allReviews = useCallback(() => {
    if (productId.length === 24) {
      return getAllReviews(dispatch, productId);
    }
  }, [productId]);

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearReviewsError());
    }
    if (productId) {
      allReviews();
    }

    if (deleteError) {
      toast.error(deleteError, { theme: "dark" });
      dispatch(clearReviewsError());
    }
    if (isDeleted) {
      toast.success("Review Deleted Successfully", { theme: "dark" });
      dispatch(resetDeleteReviewSuccess());
      getAllReviews(dispatch, localStorage.getItem("productId"));
      navigate("/admin/reviews");
    }
  }, [dispatch, error, isDeleted, deleteError, navigate, productId]);
  return (
    <Fragment>
      <Fragment>
        <Metadata title="ALL REVIEWS-Admin" />
        <div className="dashboard">
          <Sidebar />
          <div className="products__review__container">
            <h1 className="product__reviews__form__heading"> ALL REVIEWS</h1>

            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                getRowHeight={() => "auto"}
                disableSelectionOnClick
                className="product__list__table"
              />
            ) : (
              <h1 className="product__reviews__form__heading">
                No Reviews Found
              </h1>
            )}
          </div>
        </div>
      </Fragment>

      <ToastContainer />
    </Fragment>
  );
}
