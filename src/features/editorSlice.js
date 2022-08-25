import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: false,
};

export const editorSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = editorSlice.actions;

export const selectArticle = (state) => state.article.article;
export const selectArticleEditStatus = (state) => state.article.editStatus;

export default editorSlice.reducer;
