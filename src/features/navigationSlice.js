import { createSlice } from "@reduxjs/toolkit";

// "Home" "New Article" "Settings" "Sign in" "Sign up" user.username
const initialState = {
  linkPrefix: "../",
  currentUrl: "../",
  navList: [],
  loginUrl: "/login",
  homepageUrl: "/",
  editorUrl: "/editor",
  signUpUrl: "/register",
  settingsUrl: "/userSettings",
  userPageUrl: "/user",
  articlePageUrl: "/article",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    changeNavigationTab: (state, action) => {
      console.log("nav tag change");
      state.currentUrl = `${state.linkPrefix}${action.payload}`;
    },
    resetNavigationTab: (state) => {
      state.currentUrl = state.homepageUrl;
    },
    updateNavigationList: (state, action) => {
      // action payload is supposed to be user.
      if (action.payload)
        state.navList = [
          { name: "Home", link: `${state.linkPrefix}${state.homepageUrl}` },
          {
            name: "New Article",
            link: `${state.linkPrefix}${state.editorUrl}`,
          },
          { name: "Settings", link: `${state.linkPrefix}${state.settingsUrl}` },
          {
            name: action.payload.username,
            link: `${state.linkPrefix}${state.userPageUrl}/${action.payload.username}`, // check it about : thing. same goes for article.
          },
        ];
      else
        state.navList = [
          { name: "Home", link: `${state.linkPrefix}${state.homepageUrl}` },
          { name: "Sign in", link: `${state.linkPrefix}${state.loginUrl}` },
          { name: "Sign up", link: `${state.linkPrefix}${state.signUpUrl}` },
        ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNavigationTab, resetNavigationTab, updateNavigationList } =
  navigationSlice.actions;

export const selectCurrentNavigationUrl = (state) =>
  state.navigation.currentUrl;
export const selectNavigationList = (state) => state.navigation.navList;

export const selectLoginUrl = (state) => state.navigation.loginUrl;
export const selectHomepageUrl = (state) => state.navigation.homepageUrl;
export const selectArticleEditorUrl = (state) => state.navigation.editorUrl;
export const selectRegisterUrl = (state) => state.navigation.signUpUrl;
export const selectSettingsUrl = (state) => state.navigation.settingsUrl;
export const selectUserPageUrl = (state) => state.navigation.userPageUrl;
export const selectArticlePageUrl = (state) => state.navigation.articlePageUrl;
//selectLoginUrl,selectHomepageUrl,selectArticleEditorUrl,selectRegisterUrl,selectSettingsUrl,selectUserPageUrl, articlePageUrl
/**
  loginUrl: "../login",
  homepageUrl: "../",
  editorUrl: "../editor",
  signUpUrl: "../register",
  settingsUrl: "../userSettings",
  userPageUrl: "../user", */
export default navigationSlice.reducer;
