import { configureStore } from '@reduxjs/toolkit';
import artReducer from './slices/artSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    art: artReducer,
    cart: cartReducer,
  },
});

export default store;

