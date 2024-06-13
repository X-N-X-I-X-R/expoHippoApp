
// rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';
import introReducer from './introSlice';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  intro: introReducer,
  aut: authSlice,
});

export default rootReducer;
