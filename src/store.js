import { configureStore } from "@reduxjs/toolkit";

import productsReducer from './Slices/productsSlice'
import productReducer from './Slices/productSlice'
import  userReducer  from  './Slices/userSlice'
import profileReducer   from  './Slices/profileSlice'
import forgotPasswordReducer from './Slices/forgotPasswordSlice'
import cartReducer from './Slices/cartSlice'
import newOrderReducer from './Slices/orderSlice'
import myOrdersReducer from './Slices/myOrdersSlice'
import orderDetailsReducer from './Slices/orderDetailsSlice'
import newReviewReducer from './Slices/newReviewSlice'
import createProductAdminReducer from './Slices/createProductAdminSlice'
import deleteUpdateProductReducer from './Slices/deleteUpdateProductAdminSlice'
import adminAllOrdersReducer from './Slices/adminAllOrdersSlice'
import deleteUpdateOrderReducer from './Slices/deleteUpdateOrderAdminSlice'
import adminAllUsersReducer from './Slices/adminAllUsersSlice'
import deleteUpdateUserReducer from './Slices/deleteUpdateUserAdminSlice'
import adminUserDetailsReducer from './Slices/adminUserDetailsSlice'
import productReviewsReducer from './Slices/adminGetAllReviewsSlice'
import deleteReviewReducer   from './Slices/adminDeleteReviewSlice'
import userDeleteReviewReducer   from './Slices/userDeleteReviewSlice'




const store = configureStore({
  reducer: {
    products: productsReducer,
    product:productReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    myOrderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProductAdmin:createProductAdminReducer,
    deleteUpdateProductAdmin:deleteUpdateProductReducer,
    adminGetAllOrders:adminAllOrdersReducer,
    deleteUpdateOrderAdmin:deleteUpdateOrderReducer,
    adminGetAllUsers:adminAllUsersReducer,
    deleteUpdateUserAdmin:deleteUpdateUserReducer,
    adminUserDetail:adminUserDetailsReducer,
    adminAllReviews:productReviewsReducer,
    adminDeleteReview:deleteReviewReducer,
    userDeleteReview:userDeleteReviewReducer

    
  },
 
});

export {store}

