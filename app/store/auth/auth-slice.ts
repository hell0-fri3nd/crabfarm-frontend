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
    'auth-slice/login',
    async ({ email, password, remember_me}, thunkAPI) => {
        try {

            const response = await api.post('/auth/login', { email, password, remember_me});

            const userData: User = {
                message: response.data.detail,
                user: response.data.data.name,
                email: response.data.data.email,
                roles: response.data.data.role,
            };

            return userData;


        } catch (error: any) {

            if (!error.response) {
                // If there is no response object, it's a network issue
                const networkErrorMessage = 'Cannot connect to the server. Please check your internet connection or try again later.';
                return thunkAPI.rejectWithValue(networkErrorMessage);
            }

            const message = error?.response.data?.detail || 'Login failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth-slice/logout', 
    async (_,thunkAPI) => {
        try {
            await api.post('/auth/logout');
            return true;
        } catch (error: any) {
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: () => initialState
    },
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
                user: action.payload.user, 
                email: action.payload.email,
                roles: action.payload.roles,
                message: action.payload.message
            }
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.isAuthenticated = false;  
            state.user = null;           
            state.error = action.payload || 'Login failed';
        })
        .addCase(logout.fulfilled, (state) => {
            return initialState;  
        });
    },
});

export default authSlice.reducer;
export const { clearAuth } = authSlice.actions;
