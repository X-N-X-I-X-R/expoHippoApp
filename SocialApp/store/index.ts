// index.ts is the entry point for the store, where we combine all reducers and export the store.
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';
import introReducer from './introSlice';
import authReducer from './authSlice';
import userProfileReducer from '../store/userSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    intro: introReducer,
    auth: authReducer,
    userProfile: userProfileReducer, // Add the userProfile reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectProfile = (state: RootState) => state.userProfile.profile;
export const selectProfileLoading = (state: RootState) => state.userProfile.loading;
export const selectProfileError = (state: RootState) => state.userProfile.error;
export const selectDecodedToken = (state: RootState) => state.auth.decodedToken;

export default store;

// // Define navigation parameters
// export type RootStackParamList = {
//   Intro: undefined;
//   Login: undefined;
//   Register: undefined;
//   Userprofile: undefined;
//   auth: undefined;
//   home: undefined;
//   decodedToken: undefined;

  
// };

