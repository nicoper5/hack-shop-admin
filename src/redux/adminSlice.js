import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {},
  reducers: {
    storeToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

const { actions, reducer } = customerSlice;
export const { storeToken } = actions;
export default reducer;
