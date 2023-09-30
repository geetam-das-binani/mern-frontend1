import React, { Fragment, useEffect, useRef } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import Metadata from "../layout/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/productActions";

import Loader from "../layout/loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const heading = useRef(null);
  const showEffect=()=>{
    if (heading.current) {
      const typeWriter = () => {
        let count = 0;
        heading.current.innerHTML = "";
        const str = "FIND AMAZING PRODUCTS BELOW";
        let breakApart = str.split("");
        return function timer() {
          heading.current.innerHTML += breakApart[count];
          count++;
          if (count <= breakApart.length) {
            setTimeout(timer, 100);
          } else {
            count = 0;
            typeWriter()();
          }
        };
      };
      typeWriter()()
    }

  }

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
    }
    getAllProducts(dispatch);

    showEffect()
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
            <h1 ref={heading}></h1>
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
