import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lang from "lodash/lang";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Axios } from "./components/axios/Axios";
import LoginReducer from "./components/login/LoginSlice";
import shoppingCartReducer from "./components/shoppingCart/ShoppingCartSlice";
import AdminActionReducer from "./page/admin_page/AdminActionSlice";
import paypalActionReducer from "./components/paypal/PaypalActionSlice";

const persistConfigForShoppingCart = {
  key: "shoppingCart",
  version: 1,
  storage,
};

const persistConfigForLogin = {
  key: "isLogin",
  version: 1,
  storage,
};

const persistedShoppingCartReducer = persistReducer(persistConfigForShoppingCart, shoppingCartReducer);
const persistedLoginReducer = persistReducer(persistConfigForLogin, LoginReducer);

const combinedReducers = combineReducers({
  shoppingCart: persistedShoppingCartReducer,
  adminAction: AdminActionReducer,
  paypalAction: paypalActionReducer,
  isLogin: persistedLoginReducer,
});

const rootReducer = (state, action) => {
  if (lang.isEqual(action.type, "logout")) {
    state = undefined;
    localStorage.removeItem("persist:shoppingCart");
    localStorage.removeItem("persist:isLogin");
    Axios.get("/api/logout").then(() => window.location.assign("/"));
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
