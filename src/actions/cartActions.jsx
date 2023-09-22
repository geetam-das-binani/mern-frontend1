import axios from "axios";
import { addToCart, removeFromCart } from "../Slices/cartSlice";


//add to cart
export const addItemsToCart = async (dispatch, id, quantity) => {
  const { data } = await axios.get(`http://localhost:8000/product/${id}`);
  const payload = {
    product: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0],
    stock: data.product.Stock,
    quantity,
  };
  dispatch(addToCart(payload));
};

// remove from cart 
export const removeCartItems = async (dispatch, id) => {
  const { data } = await axios.get(`http://localhost:8000/product/${id}`);

  dispatch(removeFromCart(data.product._id));
};
