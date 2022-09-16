import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import {
  ProductDocument,
  ProductFormFieldModel,
} from "./models/product-form-field.model";
import { PaginatedSortModel } from "./models/paginated-sort-model";
import { CartItem } from "./models/cart-item.model";
import productService from "./services/product.service";
import { CategoryFormFieldModel } from "./models/catetogy-form-field.model";
import { Order } from "../order/services/model/orders.model";

const products: ProductFormFieldModel[] = [];
const categories: CategoryFormFieldModel[] = [];
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
  categories?: CategoryFormFieldModel[];
  order?: Order;
  paginatedSortData?: PaginatedSortModel | any;
  cart: CartItem[];
}

const initialState: ProductState = {
  products,
  categories,
  order: {
    _id: "",
    shippingInfo: {
      name: "Vasu Vallabh",
      address: "B-5/7, 2nd Floor, Sector 12",
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India",
      pinCode: "751001",
      phoneNo: "7978120295",
    },
    orderedItems: [],
    user: "",
    paymentInfo: {
      id: "",
      status: "pending",
    },
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    orderStatus: "",
    paidAt: "",
  },
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

export const fetchCategories = createAsyncThunk(
  "categories/fetch-all",
  async (paginatedSortModel: PaginatedSortModel, thunkAPI) => {
    try {
      return await productService.fetchCategories(paginatedSortModel);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch products");
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "orders/fetch-all",
  async (paginatedSortModel: PaginatedSortModel, thunkAPI) => {
    try {
      return await productService.fetchOrders(paginatedSortModel);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to fetch products");
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string, thunkAPI) => {
    try {
      return await productService.deleteCategories(id);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to delete product");
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
function incrementQtyByOne(mCart: CartItem[], payload: ProductDocument) {
  const cartItem = mCart.find((item) => item._id === payload._id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    mCart.push({ ...payload, quantity: 1 });
  }
  return mCart;
}

function decrementQtyByOne(mCart: CartItem[], payload: ProductDocument) {
  const cartItem = mCart.find((item) => item._id === payload._id);
  if (cartItem && cartItem.quantity >= 1) {
    cartItem.quantity -= 1;
  }
  return cart;
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
      State.cart = incrementQtyByOne(state.cart, action.payload);
    },
    decrementCart: (state, action: PayloadAction<ProductDocument>) => {
      const State = { ...state };
      State.cart = decrementQtyByOne(state.cart, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const State = { ...state };
      State.cart = State.cart.filter((item) => item._id !== action.payload);
      return State; // return the new state
    },

    updateOrder: (state, action: PayloadAction<Order>) => {
      console.log("action.payload", action.payload);
      const State = { ...state };
      State.order = action.payload;
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
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        const State = { ...state };
        State.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const State = { ...state };
        State.isLoading = false;
        State.categories = action.payload;
        State.isSuccess = true;
        return State;
      })
      .addCase(fetchCategories.rejected, (state) => {
        const State = { ...state };
        State.isLoading = false;
        State.isError = true;
        return State;
      });
  },
});

export const {
  reset,
  resetCart,
  decrementCart,
  incrementCart,
  removeItemFromCart,
  updateOrder,
} = productSlice.actions;

export const selectedProduct = (state: RootState) => {
  return state.product;
};

export default productSlice.reducer;
