import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    username: "xxx",
  },
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
    setUsername: (state, { payload }: { payload: string }) => {
      state.username = payload;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
