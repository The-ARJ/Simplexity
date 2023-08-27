import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice';
import reviewReducer from './ReviewSlice';
import UserReducer from './UserSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        reviews: reviewReducer,
        user: UserReducer,
    },
});

export default store;
