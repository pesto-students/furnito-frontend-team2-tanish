import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import productService from "./services/product.service";
import { ProductFormFieldModel } from "./models/product-form-field.model";
import { PaginatedSortModel } from "./models/paginated-sort-model";

const products: ProductFormFieldModel[] = [];
const paginatedSortData: PaginatedSortModel = {
  page: 1,
  limit: 10,
  sortBy: "stock",
  sortOrder: "asc",
};

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products?: ProductFormFieldModel[];
  paginatedSortData?: PaginatedSortModel | any;
}

const initialState: ProductState = {
  products,
  paginatedSortData,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const addProduct = createAsyncThunk(
  "product/add",
  async (product: ProductFormFieldModel, thunkAPI) => {
    try {
      return await productService.addProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to add product");
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "product/fetch-all",
  async (paginatedSortModel: PaginatedSortModel, thunkAPI) => {
    try {
      return await productService.fetchProducts(paginatedSortModel);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch products");
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
  reducers: {
    reset: (state) => {
      const State = { ...state };
      State.isLoading = false;
      State.isSuccess = false;
      State.isError = false;
      return State;
    },
  },
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
      })

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
        return State;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.products = action.payload;
        State.isSuccess = true;
        return State;
      })
      .addCase(fetchProducts.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        return State;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
        return State;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.products = action.payload;
        State.isSuccess = true;
        return State;
      })
      .addCase(deleteProduct.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        return State;
      });
  },
});
export const { reset } = productSlice.actions;
export const selectedProduct = (state: RootState) => {
  return state.product;
};

export default productSlice.reducer;
