// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn:false,
};

const userHendelSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state) => {
            state.isLoggedIn = true;
        },
    setLogout: (state) => {
        state.isLoggedIn = false;
    },
   
  },
});

export const { setLogin, setLogout } = userHendelSlice.actions;
export default userHendelSlice.reducer;