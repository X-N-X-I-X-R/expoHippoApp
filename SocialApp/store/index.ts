// store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import introReducer from './introSlice';
import homeReducer from './homeReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    intro: introReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
