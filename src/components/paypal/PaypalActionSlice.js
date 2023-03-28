import { createSlice } from "@reduxjs/toolkit";
export const paypalActionSlice = createSlice({
  name: "paypalAction",
  initialState: {
    value: {
      showPayPalButton: false,
      checkoutSuccess: false,
    },
  },
  reducers: {
    changeAction: (state, payload) => {
      state.value = { ...state.value, ...payload.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAction } = paypalActionSlice.actions;

export default paypalActionSlice.reducer;
