import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Button from "@mui/material/Button";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../actions/cartActions";
import { newReview } from "../../actions/productActions";
import {
  reviewReset,
  clearNewReviewError,
} from "../../Slices/newReviewSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";


export default function ProductDetails() {
  const { Id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
     value: product.ratings,
    readOnly: true,
    size: "medium",
    precision:.5
  };
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    addItemsToCart(dispatch, Id, quantity);
    toast.success("Item added to Cart", { theme: "dark", autoClose: 1500 });
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const form = new FormData();
    form.set("rating", rating);
    form.set("comment", comment);
    form.set("productId", Id);
    newReview(dispatch, form);
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
    }
    if (reviewError) {
      toast.error(reviewError, { theme: "dark" });
      dispatch(clearNewReviewError());
    }
    if (success) {
      toast.success("Review Submit Successfully", { theme: "dark" });
      dispatch(reviewReset());
    }
    getProductDetails(dispatch, Id);
  }, [dispatch, error, Id, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name}...ECOMMERCE`} />
          <div className="product__details">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={`${i}Slide`}
                        className="carousel__image"
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div>
              <div className="details__block__1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="details__block__2">
                <Rating {...options} />
                <span className="details__block__2__span ">{product.numOfReviews}Reviews </span>
              </div>
              <div className="details__block__3">
                <h1>₹{product.price}</h1>

                <div className="details__block__3__1">
                  <div className="details__block__3__1__1">
                    <button
                      onClick={() => {
                        if (quantity <= 1) return;
                        setQuantity(quantity - 1);
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button
                      onClick={() => {
                        if (quantity < product.Stock) {
                          setQuantity(quantity + 1);
                        } else {
                          toast.warning("Not enough stock", {
                            theme: "dark",
                            autoClose: 1500,
                          });
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.Stock <= 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b
                    className={product.Stock <= 1 ? "red_Color" : "green_Color"}
                  >
                    {product.Stock <= 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="details__block__4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submit__button">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviews__heading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submit__dialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="'large"
              />
              <textarea
                className="submit__dialog__textarea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button color="error" onClick={submitReviewToggle}>
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="success">
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, index) => {
                  return <ReviewCard key={index} {...review} />;
                })}
            </div>
          ) : (
            <p className="no__reviews">No reviews yet</p>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
}
