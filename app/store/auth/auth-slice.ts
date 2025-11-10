import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

interface LoginPayload {
    email: string;
    password: string;
    remember_me: boolean;
}

interface User {
    message: string;
    user: string;
    email: string;   
    roles: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
}

export const login = createAsyncThunk<User, LoginPayload, { rejectValue: string }>(
    'auth/login',
    async ({ email, password, remember_me}, thunkAPI) => {
        try {

            const response = await api.post('/auth/login', { email, password, remember_me});

            const userData: User = {
                message: response.data.message,
                user: response.data.user,
                email: response.data.email,
                roles: response.data.roles,
            };

            return userData;


        } catch (error: any) {
            const message = error?.response?.data?.message || 'Login failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
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
            state.user = {
                user: action.payload.user, // maps correctly
                email: action.payload.email,
                roles: action.payload.roles,
                message: action.payload.message
            };
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Login failed';
        });
    },
});

export default authSlice.reducer;
