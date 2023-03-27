import { createSlice } from "@reduxjs/toolkit";
import array from "lodash/array";
import lang from "lodash/lang";
export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    value: [],
  },
  reducers: {
    addToCart: (state, payload) => {
      state.value.push(payload.payload);
    },
    removeFromCart: (state, payload) => {
      array.pull(state.value, payload.payload);
    },
    changeQuantity: (state, payload) => {
      let index = array.findIndex(state.value, (item) => lang.isEqual(item.pid, payload.payload.pid));
      state.value.splice(index, 1, payload.payload);
      array.remove(state.value, (item) => lang.lte(item.quantity, 0));
    },
    clearCart: (state, payload) => {
      localStorage.removeItem("persist:shoppingCart");
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, changeQuantity, clearCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
