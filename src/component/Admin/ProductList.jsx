import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { clearErrors } from "../../Slices/productsSlice";
import {resetDeleteProductSuccess,clearDeleteProductError} from '../../Slices/deleteUpdateProductAdminSlice'
import {deleteProduct} from '../../actions/productActions'
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadata from "../layout/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";
export default function ProductList() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector((state) => state.products);
  const { isDeleted,error:deleteError } = useSelector((state) => state.deleteUpdateProductAdmin);
  const deleteProductHandler=(id)=>{
 
       deleteProduct(dispatch,id)
  }
  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minwidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minwidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minwidth: 150,
      type: "number",
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minwidth: 270,
      type: "number",
      flex: 0.5,
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
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />
            </Link>
            <Button  onClick={()=>deleteProductHandler(params.id)} >
              <DeleteIcon />
           
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.Stock,
        price: item.price,
      });
    });
  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearErrors());
    }
    if(deleteError){
      toast.error(deleteError, { theme: "dark" });
      dispatch(clearDeleteProductError());
    }
    if(isDeleted){
      toast.success('Product Deleted Successfully', { theme: "dark" });
      dispatch(resetDeleteProductSuccess());
      navigate('/admin/dashboard')
    }


    getAdminProducts(dispatch);
  }, [dispatch, error,isDeleted,deleteError,navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="ALL PRODUCTS-Admin" />
          <div className="dashboard">
            <Sidebar />
            <div className="products__lists__container">
              <h1 id="product__list__heading">ALL PRODUCTS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize
                disableSelectionOnClick
                className="product__list__table"
                autoHeight={false}
              />
            </div>
          </div>
        </Fragment>
      )}

      <ToastContainer />
    </Fragment>
  );
}
