import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_followed: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileFollowStatus: (state, action) => {
      state.is_followed = action.payload;
      //console.log(state.article_list, action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfileFollowStatus } = profileSlice.actions;
export const selectIsFollowed = (state) => state.profile.is_followed;

export default profileSlice.reducer;
