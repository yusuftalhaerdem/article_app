import { createSlice } from "@reduxjs/toolkit";

// "Home" "New Article" "Settings" "Sign in" "Sign up" user.username
const initialState = {
  currentUrl: "../",
  navList: [],
  loginUrl: "../login",
  homepageUrl: "../",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    changeNavigationTab: (state, action) => {
      console.log("nav tag change");
      state.currentUrl = `..${action.payload}`;
    },
    resetNavigationTab: (state) => {
      state.currentUrl = state.homepageUrl;
    },
    updateNavigationList: (state, action) => {
      // action payload is supposed to be user.
      if (action.payload)
        state.navList = [
          { name: "Home", link: state.homepageUrl },
          { name: "New Article", link: "../newArticle" },
          { name: "Settings", link: "../userSettings" },
          {
            name: action.payload.username,
            link: `../user/${action.payload.username}`,
          },
        ];
      else
        state.navList = [
          { name: "Home", link: state.homepageUrl },
          { name: "Sign in", link: state.loginUrl },
          { name: "Sign up", link: "../register" },
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

export default navigationSlice.reducer;
