import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {},
  reducers: {
    storeToken(state, action) {
      state.token = action.payload.token;
    },
    clearToken(state, action) {
      state.token = null;
    },
  },
});

const { actions, reducer } = customerSlice;
export const { storeToken, clearToken } = actions;
export default reducer;
