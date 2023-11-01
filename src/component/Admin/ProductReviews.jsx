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
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";

export default function ProductReviews() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productId, setProductId] = useState("");

  const { reviews, error } = useSelector((state) => state.adminAllReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.adminDeleteReview
  );

  const deleteReviewHandler = (reviewId) => {
    deleteReviews(dispatch, reviewId, productId);
  };

  const productsReviewsSubmitHandler = (e) => {
    e.preventDefault();

    getAllReviews(dispatch, productId);
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
            <form
              className="products__reviews__form"
              encType="multipart/form-data"
              onSubmit={productsReviewsSubmitHandler}
            >
              <h1 className="product__reviews__form__heading"> ALL REVIEWS</h1>
              <div>
                <StarIcon />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={({ target }) => setProductId(target.value)}
                />
              </div>

              <Button
                id="create__product__btn"
                type="submit"
                disabled={productId === "" ? true : false}
              >
                Search
              </Button>
            </form>

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
                No ReviewsFound
              </h1>
            )}
          </div>
        </div>
      </Fragment>

      <ToastContainer />
    </Fragment>
  );
}
