import { searchInputs } from "../models/searchInput";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputSate {
  inputData: searchInputs | null;
}

const initialState: InputSate = {
  inputData: { searchdata: null, fliter: null,  },
};

const searchSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setdata(state, action: PayloadAction<searchInputs>) {
      state.inputData = action.payload;
    },
  },
});

export const inputActions = searchSlice.actions;
export default searchSlice.reducer;
