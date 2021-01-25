import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name:"user",
  initialState: {
    user: null,
  },
  reducers: {
    // When we have an action, we get the state whcich is actual state of the slice. In this case the userSlice
    login: (state,action) => {
      // payload is an object that we pass along with it.
      state.user = action.payload;
    },
    // For logout, the action is not required
    logout: (state) => {
      // whenever user logout, we set the user back to null 
      state.user = null;
    },
  },
});

export const { login,logout } = userSlice.actions;


// As we discussed, the pulling in the data is happening through the selectors
// selectors
export const selectUser = state => state.user.user;

export default userSlice.reducer;
