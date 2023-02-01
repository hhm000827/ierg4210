import { createSlice } from "@reduxjs/toolkit";

export const AdminActionSlice = createSlice({
  name: "adminAction",
  initialState: {
    value: null,
  },
  reducers: {
    changeAdminAction: (state, payload) => {
      state.value = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAdminAction } = AdminActionSlice.actions;

export default AdminActionSlice.reducer;
