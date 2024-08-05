import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {name : null, email: null, token: null},
};

export const usersSlice = createSlice({
 name: 'users',
  initialState,
 reducers: {
   LogIn: (state, action) => {
     state.value.name = action.payload.name
     state.value.email = action.payload.email
     state.value.token = action.payload.token
   },
   LogOut: (state) => {
    state.value.name = null
    state.value.email = null
    state.value.token = null
   }
 },
});

export const { LogIn, LogOut } = usersSlice.actions;
export default usersSlice.reducer;