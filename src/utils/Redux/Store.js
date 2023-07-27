// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice';
import reviewReducer from './ReviewSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        reviews: reviewReducer,
    },
});

export default store;
