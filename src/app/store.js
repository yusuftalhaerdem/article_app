import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import articleListReducer from "../features/articleListSlice";
import articleReducer from "../features/articleSlice";
import navigationReducer from "../features/navigationSlice";
import profileSlide from "../features/profileSlice";
import tagsSlice from "../features/tagsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
    articleList: articleListReducer,
    navigation: navigationReducer,
    profile: profileSlide,
    tags: tagsSlice,
  },
});
