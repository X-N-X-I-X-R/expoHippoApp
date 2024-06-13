// authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export interface User {
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  decodedToken: any | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  decodedToken: null,
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}
export interface RootStackParamList {
  Intro: undefined;
  Login: undefined;
  Register: undefined;
  Userprofile: undefined;
  auth: undefined;
  home: undefined;
  decodedToken: undefined;
  
}
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost/api/register_user/', credentials);
      sessionStorage.setItem('token', response.data.access);
      const token = sessionStorage.getItem('token');
      let decodedToken = null;
      if (token) {
        decodedToken = jwtDecode(token);
        console.log("decodedToken: ", decodedToken);
      }
      console.log("registerUser: ", response.data);
      return { data: response.data, decodedToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost/login/', credentials);
      sessionStorage.setItem('token', response.data.access);
      const token = sessionStorage.getItem('token');
      let decodedToken = null;
      if (token) {
        decodedToken = jwtDecode(token);
        sessionStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        console.log("decodedToken: ", decodedToken);
      }
      console.log("loginUser: ", response.data);
      return { data: response.data, decodedToken };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ data: { access: string; user: User }, decodedToken: any }>) => {
        state.loading = false;
        state.token = action.payload.data.access;
        sessionStorage.setItem('token', action.payload.data.access);
        state.user = action.payload.data.user;
        state.decodedToken = action.payload.decodedToken;
        const extract_user_id = action.payload.decodedToken.id;
        sessionStorage.setItem('decodedToken user id ', JSON.stringify(action.payload.decodedToken.id));
        console.log("extract_user_id: ", extract_user_id);
        console.log("decodedToken in reducer: ", action.payload.decodedToken);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ data: { access: string; user: User }, decodedToken: any }>) => {
        state.loading = false;
        state.token = action.payload.data.access;
        sessionStorage.setItem('token', action.payload.data.access);
        state.user = action.payload.data.user;
        state.decodedToken = action.payload.decodedToken;
        console.log("decodedToken in reducer: ", action.payload.decodedToken);
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
