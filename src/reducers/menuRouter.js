import { createSlice } from '@reduxjs/toolkit';

export const menuRouter = createSlice({
  name: 'menu',
  initialState: {
    routeMenuIdx: "akeygen"
  },
  reducers: {
    setMenu: (state, action) => {
      state.routeMenuIdx = action.payload;
    }
  }
});

export const { setMenu } = menuRouter.actions;
export default menuRouter.reducer;