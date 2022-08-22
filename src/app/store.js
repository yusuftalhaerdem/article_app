import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import articleReducer from "../features/articleSlice";
import navigationReducer from "../features/navigationSlice";
import profileSlide from "../features/profileSlide";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
    navigation: navigationReducer,
    profile: profileSlide,
  },
});
