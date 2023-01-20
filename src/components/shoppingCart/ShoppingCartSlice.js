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
      state.value.push(payload);
    },
    removeFromCart: (state, payload) => {
      array.pull(state.value, payload);
    },
    changeQuantity: (state, payload) => {
      let index = array.findIndex(state.value, (item) => lang.isEqual(item.payload.name, payload.payload.name));
      state.value.splice(index, 1, payload);
      array.remove(state.value, (item) => lang.lte(item.payload.quantity, 0));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, changeQuantity } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
