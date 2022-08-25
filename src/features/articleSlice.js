import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: false,
  editStatus: false,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    loadArticle: (state, action) => {
      state.article = action.payload;
    },
    changeEditStatus: (state, action) => {
      state.editStatus = action.payload;
    },
    removeArticle: (state) => {
      state.article = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadArticle, removeArticle } = articleSlice.actions;

export const selectArticle = (state) => state.article.article;
export const selectArticleEditStatus = (state) => state.article.editStatus;

export default articleSlice.reducer;
