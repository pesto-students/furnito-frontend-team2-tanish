import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import productService from "./services/product.service";
import {
  ProductDocument,
  ProductFormFieldModel,
} from "./models/product-form-field.model";
import { PaginatedSortModel } from "./models/paginated-sort-model";
import { CartItem } from "./models/cart-item.model";

const products: ProductFormFieldModel[] = [];
const paginatedSortData: PaginatedSortModel = {
  page: 1,
  limit: 10,
  sortBy: "stock",
  sortOrder: "asc",
};
const cart: CartItem[] = [];

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products?: ProductFormFieldModel[];
  paginatedSortData?: PaginatedSortModel | any;
  cart: CartItem[];
}

const initialState: ProductState = {
  products,
  cart,
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
    } catch (error: any) {
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

// This code will be used to add/remove a product to the cart and update the cart quantity
function modifyQtyByOne(
  mCart: CartItem[],
  payload: ProductDocument,
  increment: string,
) {
  const cartItem = mCart.find((item) => item._id === payload._id);
  if (cartItem) {
    cartItem.quantity =
      increment === "INCREMENT" ? cartItem.quantity + 1 : cartItem.quantity - 1;
  } else {
    mCart.push({ ...payload, quantity: 1 });
  }
  return mCart;
}

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
    resetCart: (state) => {
      const State = { ...state };
      State.cart = [];
      return State;
    },
    incrementCart: (state, action: PayloadAction<ProductDocument>) => {
      const State = { ...state };
      State.cart = modifyQtyByOne(state.cart, action.payload, "INCREMENT");
    },
    decrementCart: (state, action: PayloadAction<ProductDocument>) => {
      const State = { ...state };
      State.cart = modifyQtyByOne(state.cart, action.payload, "DECREMENT");
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const State = { ...state };
      State.cart = State.cart.filter((item) => item._id !== action.payload);
      return State; // return the new state
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

export const { reset, resetCart, incrementCart, removeItemFromCart } =
  productSlice.actions;

export const selectedProduct = (state: RootState) => {
  return state.product;
};

export default productSlice.reducer;
