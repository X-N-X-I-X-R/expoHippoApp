
// userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Adjust the import path as necessary

export interface UserProfile {
  [key: string]: string | undefined;
  user_nickname: string;
  user_gender: string;
  user_country: string;
  user_phone: string;
  user_birth_date: string;
  user_bio: string;
  user_website: string;

user_profile_image?: string; 
}

export interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.auth.decodedToken.id;
    try {
      const response = await axios.get(`http://localhost/api/profiles/${userId}/`);
      console.log("fetchUserProfile: ", response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (profileData: FormData, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.auth.decodedToken.id;
    try {
      // Make a copy of profileData
    let data = new FormData();
profileData.forEach((value, key) => {
  data.append(key, value);
});
      // If user_profile_image is a URL (not a File object), remove it from data
      if (typeof data.get('user_profile_image') === 'string') {
        data.delete('user_profile_image');
      }
      const response = await axios.put(`http://localhost/api/profiles/${userId}/`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating user profile:', error.response ? error.response.data : error);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUserProfile = (state: { userProfile: UserProfileState }) => state.userProfile.profile;
export default userSlice.reducer;