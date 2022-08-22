import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article_list: false,
  currentTab: "globalfeed",
  userfeedArticles: false,
  globalfeedArticles: false,
  myArticles: false,
  favedArticles: false,
  tagFilteredArticles: false,
  tabTypes: {
    userfeed: "userfeed",
    globalfeed: "globalfeed",
    myArticles: "myArticles",
    favedArticles: "favedArticles",
  },
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    cachedArticles: (state) => {
      if (state.currentTab === state.tabTypes.userfeed)
        state.article_list = state.userfeedArticles;
      else if (state.currentTab === state.tabTypes.globalfeed)
        state.article_list = state.globalfeedArticles;
      else if (state.currentTab === state.tabTypes.myArticles)
        state.article_list = state.myArticles;
      else if (state.currentTab === state.tabTypes.favedArticles)
        state.article_list = state.favedArticles;
      else {
        state.article_list = state.tagFilteredArticles;
      }
    },
    loadUserFeed: (state, action) => {
      state.userfeedArticles = action.payload;
    },
    loadGlobalFeed: (state, action) => {
      state.globalfeedArticles = action.payload;
    },
    loadMyFeed: (state, action) => {
      state.myArticles = action.payload;
    },
    loadFavedFeed: (state, action) => {
      state.favedArticles = action.payload;
    },
    loadTagFeed: (state, action) => {
      state.tagFilteredArticles = action.payload;
    },
    resetTagFeed: (state) => {
      state.tagFilteredArticles = false;
    },
    /*
    updateArticles: (state, action) => {
      console.log(action);
      state.article_list = action.payload;
    },*/
    resetArticles: (state) => {
      state = { article_list: false };
    },
    changeArticleTab: (state, action) => {
      console.log(action);
      state.currentTab = action.payload;
    },
    articleLikeAction: (state, action) => {
      //console.log(state, state.article_list);
      state.article_list =
        state.article_list &&
        state.article_list.map((current) => {
          if (current.slug === action.payload) {
            if (current.favorited) {
              current.favorited = false;
              current.favoritesCount -= 1;
            } else {
              current.favorited = true;
              current.favoritesCount += 1;
            }
          }
          // i dont think line 69 and 82 are needed.
          return current;
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateArticles,
  resetArticles,
  changeArticleTab,
  articleLikeAction,
  loadUserFeed,
  loadGlobalFeed,
  cachedArticles,
  loadMyFeed,
  loadFavedFeed,
  loadTagFeed,
  resetTagFeed,
} = articleSlice.actions;
export const selectArticles = (state) => state.article.article_list;
export const selectCurrentArticleTab = (state) => state.article.currentTab;
export const selectUserFeedArticles = (state) => state.article.userfeedArticles;
export const selectGlobalArticles = (state) => state.article.globalfeedArticles;
export const selectMyArticles = (state) => state.article.myArticles;
export const selectFavedArticles = (state) => state.article.favedArticles;
export const selectArticleNames = (state) => state.article.tabTypes;
export const selectTagFilteredArticles = (state) =>
  state.article.tagFilteredArticles;

export const selectMyArticleName = (state) => state.article.tabTypes.myArticles;
export const selectFavedArticleName = (state) =>
  state.article.tabTypes.favedArticles;

export const selectGlobalFeedName = (state) =>
  state.article.tabTypes.globalfeed;
export const selectUserFeedName = (state) => state.article.tabTypes.userfeed;

export default articleSlice.reducer;
