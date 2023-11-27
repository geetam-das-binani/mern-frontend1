import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import Loader from "../layout/loader/Loader";
import ProductCard from "../Home/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Metadata from "../layout/Metadata";

const categories = [
  "Laptop",
  "Footwear",
  "Shirts",
  "T-shirts",
  "Attire",
  "camera",
  "Books",
  "SmartPhones",
  "Toys",
  "Home & Living",
];
const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Nike",
  "Adidas",
  "Lego",
  "Puma",
  "Play Station",
  "Xbox",
  "Bed Bath & Beyond",
  "Pottery Barn",
  "Crate & Barrel",
  "Maybelline",
  `L'Oréal`,
  "Clinique",
  "Marvel Comics",
  "National Geographic",
  "Brooks Brothers",
  "Hugo Boss",
  "Express",
  "Zara",
  "River Island",
];
export default function Products() {
  const { keyword } = useParams();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [isSelectedBrand, setIsSelectedBrand] = useState(false);
  const {
    loading,
    products,
    productsCount,
    error,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
    }
    getAllProducts(
      dispatch,
      keyword,
      currentPage,
      price,
      category,
      ratings,
      isSelectedBrand
    );
  }, [
    dispatch,
    error,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    isSelectedBrand,
  ]);
  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="PRODUCTS ...ECOMMERCE" />
          <h2 className="products__heading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} {...product} />;
              })}
          </div>

          <div className="filter__box">
            <Typography>Price</Typography>
            <Slider
              value={price}
              valueLabelDisplay="auto"
              onChange={priceHandler}
              size="small"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <select
              value={category}
              onChange={({ target }) => setCategory(target.value)}
            >
              <option value="">Sort</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={isSelectedBrand}
              onChange={({ target }) => setIsSelectedBrand(target.value)}
            >
              <option value="">Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <fieldset>
              <Typography>Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                size="small"
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {resultsPerPage < count && (
            <div className="pagination__box">
              <Pagination
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                activePage={currentPage}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page__item"
                linkClass="page__link"
                activeClass="page__item__active"
                activeLinkClass="page_link__active"
              />
            </div>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
}
