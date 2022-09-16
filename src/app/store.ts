// create store with redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-slice";
import productReducer from "../features/product/product-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
