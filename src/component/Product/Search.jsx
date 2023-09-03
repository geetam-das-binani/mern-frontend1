import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css'
import Metadata from "../layout/Metadata";
export default function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      return navigate(`/products/${keyword}`);
    } else {
      return navigate("/products");
    }
  };
  return (
    <Fragment>
       <Metadata title='Search a product ...ECOMMERCE'/>
      <form action="" className="search__box" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
}
