import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
const cartReducer = createSlice({
  name: "cart",

  initialState: initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const item = payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === item.product ? item : i
        );

        saveToStorage(state.cartItems);
      } else {
        state.cartItems.push(item);
        saveToStorage(state.cartItems);
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== payload);
      saveToStorage(state.cartItems);
    },
    saveShippingInfo: (state, { payload }) => {
      state.shippingInfo = payload;
      saveShippingInfoToStorage(state.shippingInfo);
    },
  },
});

function saveToStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function saveShippingInfoToStorage(shippingInfo) {
  localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
}
export default cartReducer.reducer;
export const { addToCart, removeFromCart, saveShippingInfo } =
  cartReducer.actions;
