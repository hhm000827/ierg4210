import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./components/nav/NavSlice";
import shoppingCartReducer from "./components/shoppingCart/ShoppingCartSlice";

export default configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    navSearchKeyword: navReducer,
  },
});
