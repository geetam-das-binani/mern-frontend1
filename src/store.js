import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './Slices/productsSlice'
import productReducer from './Slices/productSlice'
import  userReducer  from  './Slices/userSlice'
import profileReducer   from  './Slices/profileSlice'
import forgotPasswordReducer from './Slices/forgotPasswordSlice'
import cartReducer from './Slices/cartSlice'


const store = configureStore({
  reducer: {
    products: productsReducer,
    product:productReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer
    
  },
 
});

export {store}

