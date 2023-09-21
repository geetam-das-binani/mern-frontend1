import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
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
  },
});


function saveToStorage(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
export default cartReducer.reducer;
export const { addToCart } = cartReducer.actions;
