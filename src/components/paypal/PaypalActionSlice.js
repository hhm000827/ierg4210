import { createSlice } from "@reduxjs/toolkit";
export const paypalActionSlice = createSlice({
  name: "paypalAction",
  initialState: {
    value: {
      showPayPalButton: false,
      checkoutSuccess: false,
      customId: "",
      invoiceId: "",
      record: "",
    },
  },
  reducers: {
    changeAction: (state, payload) => {
      state.value = { ...state.value, ...payload.payload };
    },
    resetPaypalAction: (state) => {
      state.value = {
        showPayPalButton: false,
        checkoutSuccess: false,
        customId: "",
        invoiceId: "",
        record: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAction, resetPaypalAction } = paypalActionSlice.actions;

export default paypalActionSlice.reducer;
