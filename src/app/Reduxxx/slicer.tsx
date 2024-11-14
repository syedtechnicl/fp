import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface CardItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: [] as CardItem[],
  reducers: {
    AddToCartredux: (state, action: PayloadAction<CardItem>) => {
      state.push(action.payload);
    },
    Removetoredux: (state, action: PayloadAction<number>) => {
      return state.filter((e) => e.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { AddToCartredux, Removetoredux } = counterSlice.actions;

export default counterSlice.reducer;
