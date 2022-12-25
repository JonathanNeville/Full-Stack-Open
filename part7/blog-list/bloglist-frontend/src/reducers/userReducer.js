import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log(action.payload)
      return action.payload;
    },
  },
});

export const logIn = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username,
            password,
          });
        dispatch(setUser(user))
    }
}

export const logOut = () => {
  return async (dispatch) => {
    dispatch( setUser(null))
  }
}

export const returningUser = (user) => {
  return async (dispatch) => {
    console.log(user)
    dispatch(setUser(user))
  }
}



export const { setUser } = userSlice.actions;
export default userSlice.reducer;