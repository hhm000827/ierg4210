import { createSlice } from "@reduxjs/toolkit";
export const LoginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: false,
  },
  reducers: {
    setIsLogin: (state, payload) => {
      state.value = { isLogin: true, name: payload.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
