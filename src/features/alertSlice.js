import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  message: false,
  type: "default",
  alertTimeout: 3000,
  active: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      // if action includes a type,
      if (action.payload.type) {
        state.message = action.payload.message;
        state.type = action.payload.type;
      } else {
        state.message = action.payload;
        state.type = "default";
      }
      state.id++;
    },
    removeMessage: (state) => {
      state.message = false;
    },
    disableMessage: (state) => {
      state.active = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, removeMessage } = alertSlice.actions;

export const selectAlertMessage = (state) => state.alert.message;
export const selectAlertTimeout = (state) => state.alert.alertTimeout;
export const selectAlertId = (state) => state.alert.id;
export const selectAlertType = (state) => state.alert.type;

export const selectAlertStatus = (state) => state.alert.active;

export default alertSlice.reducer;
