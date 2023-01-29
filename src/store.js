import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./components/shoppingCart/ShoppingCartSlice";

export default configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});
