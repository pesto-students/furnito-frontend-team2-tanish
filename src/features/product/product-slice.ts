import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import productService from "./services/product.service";

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: AsyncState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const addProduct = createAsyncThunk(
  "product/add",
  async (product: any, thunkAPI) => {
    try {
      return await productService.addProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to add product");
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (product: any, thunkAPI) => {
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to update product");
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to delete product");
    }
  },
);

export const fetchProduct = createAsyncThunk(
  "product/fetch-one",
  async (id: string, thunkAPI) => {
    try {
      return await productService.fetchProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch product");
    }
  },
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
        return State;
      })
      .addCase(addProduct.fulfilled, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isSuccess = true;
        return State;
      })
      .addCase(addProduct.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        return State;
      });
  },
});

export const selectedProduct = (state: RootState) => {
  return state.product;
};

export default productSlice.reducer;
