import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tagList: false,
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    loadTags: (state, action) => {
      state.tagList = action.payload;
    },
    resetTags: (state) => {
      state.tagList = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadTags, resetTags } = tagsSlice.actions;

export const selectTagList = (state) => state.tags.tagList;

export default tagsSlice.reducer;
