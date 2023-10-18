import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../actions/productActions";
import {
  resetProductSuccess,
  clearNewProductError,
} from "../../Slices/createProductAdminSlice";
import Button from "@mui/material/Button";
import Metadata from "../layout/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "../Admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonLoader from "../layout/loader/ButtonLoader";
import "react-toastify/dist/ReactToastify.css";
const categories = [
  "Laptop",
  "Footwear",
  "Shirts",
  "T-shirts",
  "Attire",
  "camera",
  "Tops",
  "SmartPhones",
  "Toys"
];

export default function NewProduct() {
  
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesciption] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreviev, setImagePreview] = useState([]);

  const { error, success } = useSelector((state) => state.newProductAdmin);

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearNewProductError());
      setDisabled(false);
    }
    if (success) {
      toast.success('Product Created Successfully',{theme:'dark'})
      dispatch(resetProductSuccess());
      navigate("/admin/dashboard");
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const myform= new FormData()
    myform.set('name',name)
    myform.set('price',price)
    myform.set('description',description)
    myform.set('category',category)
    myform.set('Stock',stock)

    images.forEach((image)=>{
        myform.append('images',image)
    })
    setDisabled(true)
    createProduct(dispatch,myform)
  };

  const createProductImageChange=(e)=>{
       const files=Array.from(e.target.files)
        setImages([])
        setImagePreview([])
       
       files.forEach((file)=>{
        const reader=new FileReader()
        reader.onload=()=>{
            if (reader.readyState === 2) {
              setImages((prev)=>[...prev,reader.result])
              setImagePreview((prev)=>[...prev,reader.result])
             
              }
        }
        reader.readAsDataURL(file)
       })
  }
  return (
    <Fragment>
      <Metadata title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="new__product__container">
          <form
            className="create__product__form"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="text"
                placeholder="Price"
                required
                value={price}
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
                value={description}
                onChange={({ target }) => setDesciption(target.value)}
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={({ target }) => setCategory(target.value)}>
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
               onChange={({ target }) => setStock(target.value)}
              />
            </div>
            <div id="create__product__form__file">
              <input 
              type="file"
              onChange={createProductImageChange} 
              name="avatar" 
              accept="images/*"
              multiple
               />
            </div>
            <div id="create__product__form__image">
              {imagePreviev.map((pic) => (
                <img src={pic} key={pic} alt="Product preview" />
              ))}
            </div>
            <Button id="create__product__btn" 
            type="submit" 
            disabled={disabled}
            >
              {disabled ? <ButtonLoader /> : "Create Product"}
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
