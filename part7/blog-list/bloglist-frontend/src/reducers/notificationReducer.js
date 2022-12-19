import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

let timeoutID;

export const changeMessage = (message) => {
  return async (dispatch) => {
    dispatch(setMessage(message));

    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch(setMessage(""));
    }, 5000);
  };
};

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
