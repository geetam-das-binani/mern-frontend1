import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from "../../actions/productActions";

import Loader from "../layout/loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
       toast.error(error, { theme: "dark" });
   
    }
    getAllProducts(dispatch);
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to E-commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="home__heading">Featured Products</div>
          <div className="container" id="container">
            {products &&
              products.map((data, index) => {
                return <ProductCard key={index} {...data} />;
              })}
          </div>
        </Fragment>
      )}
      <ToastContainer />
     
    </Fragment>
  );
}
