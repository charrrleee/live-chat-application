import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    name: "",
  },
  reducers: {
    login: (state: UserState, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state: UserState) => {
      state.email = "";
      state.name = "";
    },
  },
});

export interface UserState {
  email: string;
  name: string;
}

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
