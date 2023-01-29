import { createSlice } from "@reduxjs/toolkit";
export const navSlice = createSlice({
  name: "navSearchKeyword",
  initialState: {
    value: {},
  },
  reducers: {
    setSearchKeyword: (state, payload) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchKeyword } = navSlice.actions;

export default navSlice.reducer;
