import axios from "axios";
import { addToCart, removeFromCart ,saveShippingInfo} from "../Slices/cartSlice";

const url="https://mernecommercebackend-k5a2.onrender.com/api/v1"
//add to cart
export const addItemsToCart = async (dispatch, id, quantity) => {
  const { data } = await axios.get(`${url}/product/${id}`);
  const payload = {
    product: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.Stock,
    quantity,
  };
  dispatch(addToCart(payload));
};

// remove from cart 
export const removeCartItems = async (dispatch, id) => {
  const { data } = await axios.get(`http://localhost:8000/api/v1/product/${id}`);

  dispatch(removeFromCart(data.product._id));
};


// save shipping info 
export  const  saveShippingDetails=(dispatch,data)=>{
    dispatch(saveShippingInfo(data))
}
