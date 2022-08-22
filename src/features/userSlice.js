import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.userInfo = action.payload;
    },
    logOut: (state) => {
      state.userInfo = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export const selectUser = (state) => state.user.userInfo;

export default userSlice.reducer;
