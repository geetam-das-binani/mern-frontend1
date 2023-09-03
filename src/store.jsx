import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './Slices/productsSlice'
import productReducer from './Slices/productSlice'
import  userReducer  from  './Slices/userSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    product:productReducer,
    user:userReducer,
    
  },
 
});
export {store}
