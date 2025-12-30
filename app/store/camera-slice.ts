import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { raspberry_api } from "./api";
import type { RootState } from "./store";

interface statusDetails {
    "camera_status": boolean,
    "extracted_data": string,
    "height_cm": number,
    "width_cm": number
}

interface startStatus {
    "status": string
}


interface statusState {
  data: statusDetails | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  status: string | null;
}

const initialState: statusState = {
  data: null,
  loading: 'idle',
  error: null,
  status: ''
};


export const status = createAsyncThunk<statusDetails, void, { rejectValue: string }>(
    'camera-slice/status',
    async (__, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token = state.auth.user?.access_token;

            const response = await raspberry_api.get('/camera/status', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const details: statusDetails = {
                camera_status: response.data.camera_status,
                extracted_data: response.data.extracted_data || '',
                height_cm: response.data.height_cm,
                width_cm: response.data.width_cm,
            };

            return details;


        } catch (error: any) {

            if (error.request && !error.response) {
                return thunkAPI.rejectWithValue(
                'Cannot connect to the server. Please check your internet connection or try again later.'
                );
            }
            if (error.response?.status === 401) {
                return thunkAPI.rejectWithValue('TOKEN_EXPIRED');
            }

            const message = error?.response?.data?.error || 'Request failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const start = createAsyncThunk<startStatus, void, { rejectValue: string }>(
    'camera-slice/start',
    async (__, thunkAPI) => {
        try {

            const state = thunkAPI.getState() as RootState;
            const token = state.auth.user?.access_token;

            const response = await raspberry_api.put('/camera/start',{}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            const status: startStatus = {
                status: response.data.camera_status,
            };

            return status;

        } catch (error: any) {

            if (error.request && !error.response) {
                return thunkAPI.rejectWithValue(
                'Cannot connect to the server. Please check your internet connection or try again later.'
                );
            }
            if (error.response?.status === 401) {
                return thunkAPI.rejectWithValue('TOKEN_EXPIRED');
            }

            const message = error?.response?.data?.error || 'Request failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {
        // optional: reset state
        clearStatus: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(status.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        .addCase(status.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
            state.error = null;
        })
        .addCase(status.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload || 'Failed to fetch camera status';
            state.data = null;
        })    
            
        .addCase(start.fulfilled, (state, action) => {
            state.status = action.payload.status;
        })
        .addCase(start.rejected, (state, action) => {
            state.status = action.payload || 'Server error ';
        });
    },
});


export default cameraSlice.reducer;
export const { clearStatus } = cameraSlice.actions;
