import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shoppingCartReducer from "./components/shoppingCart/ShoppingCartSlice";
import AdminActionReducer from "./page/admin_page/AdminActionSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedShoppingCartReducer = persistReducer(persistConfig, shoppingCartReducer);

const store = configureStore({
  reducer: {
    shoppingCart: persistedShoppingCartReducer,
    adminAction: AdminActionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
