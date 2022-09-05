import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage: {},
  turkish: {},
  english: {},
  isTurkish: false,
};
// i would like to provide language support but i dont know where i can put it current design.
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state) => {
      if (state.isTurkish) state.currentLanguage = state.english;
      else state.currentLanguage = state.turkish;
      state.isTurkish = !state.isTurkish;
    },
    changeLanguage: (state, action) => {
      if (action.payload === "english") {
        state.currentLanguage = state.english;
      } else if (action.payload === "turkish") {
        state.currentLanguage = state.english;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchLanguage } = languageSlice.actions;

export const selectAlertMessage = (state) => state.language.message;

export default languageSlice.reducer;
