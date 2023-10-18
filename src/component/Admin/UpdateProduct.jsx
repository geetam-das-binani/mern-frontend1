import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { updateProduct, getProductDetails } from "../../actions/productActions";
import {
  resetUpdateProductSuccecss,
  clearUpdateProductError,
} from "../../Slices/deleteUpdateProductAdminSlice";
import Button from "@mui/material/Button";
import Metadata from "../layout/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "../Admin/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "../layout/loader/ButtonLoader";
import "react-toastify/dist/ReactToastify.css";
import { clearProductError } from "../../Slices/productSlice";
import Loader from "../layout/loader/Loader";
const categories = [
  "Laptop",
  "Footwear",
  "Shirts",
  "T-shirts",
  "Attire",
  "camera",
  "Tops",
  "SmartPhones",
  "Toys",
];

export default function UpdateProduct() {
  const { id } = useParams();

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateProductAdmin
  );
  const { error, product, loading } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesciption] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreviev, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  useEffect(() => {
    if (product && product._id !== id) {
      getProductDetails(dispatch, id);
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setDesciption(product.description);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error, { theme: "dark" });

      dispatch(clearProductError());
      setDisabled(false);
    }
    if (updateError) {
   
      setDisabled(false);
      toast.error(updateError, { theme: "dark" });
      dispatch(clearUpdateProductError());
    }
    if (isUpdated) {
      toast.success("Product Updated Successfully", { theme: "dark" });
      dispatch(resetUpdateProductSuccecss());
      navigate("/admin/products");
    }
  }, [dispatch, id, error, isUpdated, updateError, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("price", price);
    myform.set("description", description);
    myform.set("category", category);
    myform.set("Stock", stock);

    images.forEach((image) => {
      myform.append("images", image);
    });

    setDisabled(true);
    updateProduct(dispatch, myform, id);
  };

  const updateProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setOldImages([]);
    setImages([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
          setImagePreview((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  console.log(oldImages);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Update Product" />
          <div className="dashboard">
            <Sidebar />
            <div className="new__product__container">
              <form
                className="create__product__form"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <h1>Update Product</h1>
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name || ""}
                    onChange={({ target }) => setName(target.value)}
                  />
                </div>
                <div>
                  <AttachMoneyIcon />
                  <input
                    type="text"
                    placeholder="Price"
                    required
                    value={price || ""}
                    onChange={({ target }) => setPrice(target.value)}
                  />
                </div>
                <div>
                  <DescriptionIcon />
                  <textarea
                    type="text"
                    placeholder="Product Descripton"
                    required
                    cols="30"
                    rows="1"
                    value={description || ""}
                    onChange={({ target }) => setDesciption(target.value)}
                  ></textarea>
                </div>
                <div>
                  <AccountTreeIcon />
                  <select
                    value={category || ""}
                    onChange={({ target }) => setCategory(target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <StorageIcon />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    value={stock || ""}
                    onChange={({ target }) => setStock(target.value)}
                  />
                </div>
                <div id="create__product__form__file">
                  <input
                    type="file"
                    onChange={updateProductImageChange}
                    name="avatar"
                    accept="images/*"
                    multiple
                  />
                </div>

                <div id="create__product__form__image">
                  {oldImages?.length > 0 &&
                    oldImages?.map((pic) => (
                      <img src={pic.url} key={pic.url} alt="Product preview" />
                    ))}
                </div>

                <div id="create__product__form__image">
                  {imagePreviev &&
                    imagePreviev.map((pic) => (
                      <img src={pic} key={pic} alt="Product preview" />
                    ))}
                </div>
                <Button
                  id="create__product__btn"
                  type="submit"
                  disabled={disabled}
                >
                  {disabled ? <ButtonLoader /> : "Update Product"}
                </Button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  );
}
