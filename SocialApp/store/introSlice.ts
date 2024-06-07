import { createSlice } from '@reduxjs/toolkit';

interface IntroState {
  message: string;
}

const initialState: IntroState = {
  message: 'Welcome to Hippoputamos!',
};

const introSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = introSlice.actions;
export default introSlice.reducer;
