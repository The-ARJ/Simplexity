"use client";
import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "Cart",
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },
        remove(state, action) {
            return state.filter((item) => item.product._id !== action.payload);
        },
        updateCart(state, action) {
            state.length = 0; // This line empties the array
            state.push(...action.payload); // This line adds the new items
        }

    }
})

export const { add, remove, updateCart } = CartSlice.actions;
export default CartSlice.reducer;
