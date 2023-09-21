import axios from "axios";
import { addToCart } from "../Slices/cartSlice";

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
