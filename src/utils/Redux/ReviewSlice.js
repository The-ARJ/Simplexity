"use client";
import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: "reviews",
    initialState: [],
    reducers: {
        addReview(state, action) {
            state.push(action.payload);
        },
        removeReview(state, action) {
            const reviewId = action.payload;
            return state.filter((review) => review.id !== reviewId);
        },
        updateReview(state, action) {
            state.length = 0; // This line empties the array
            state.push(...action.payload); // This line adds the new items
        }
    }
})

export const { addReview, removeReview, updateReview } = reviewSlice.actions;
export default reviewSlice.reducer;
