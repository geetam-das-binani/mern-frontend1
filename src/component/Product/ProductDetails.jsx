import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import Metadata from "../layout/Metadata";

import { addItemsToCart } from "../../actions/cartActions";
export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
 
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  const [quantity, setQuantity] = useState(1);
  const addToCartHandler = () => {
    addItemsToCart(dispatch, id, quantity);
    toast.success("Item added to Cart", { theme: "dark",autoClose:1500});
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
    }
    getProductDetails(dispatch, id);
  }, [dispatch, error, id]);

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
                <ReactStars {...options} />
                <span>{product.numOfReviews}Reviews </span>
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
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b
                    className={product.stock < 1 ? "red_Color" : "green_Color"}
                  >
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="details__block__4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submit__button">Submit Review</button>
            </div>
          </div>
          <h3 className="reviews__heading">REVIEWS</h3>

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
