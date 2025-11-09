import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

interface LoginPayload {
    email: string;
    password: string;
    remember_me: boolean;
}

interface User {
    name: string;
    email: string;   
    role: string;
}

export const login = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
    'auth/login',
    async ({ email, password, remember_me}, thunkAPI) => {
        try {

            const response = await api.post('/auth/login', { email, password, remember_me});
            return response.data.user; 

        } catch (error: any) {
            const message = error?.response?.data?.message || 'Login failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null as User | null,
        status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Login failed';
        });
  },
});

export default authSlice.reducer;
