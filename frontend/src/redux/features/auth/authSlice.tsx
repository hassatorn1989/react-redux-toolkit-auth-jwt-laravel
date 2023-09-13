import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../../services/authService';
const initialState = {
    isLoggedIn: false,
    isLoading: false
}

export const login = createAsyncThunk(
    "auth/login",
    async (data: any, thunkAPI) => {
        try {
            let response = await authService.login(data);
            if (response.status === 200) {
                if (response.data.status === "success") {
                    localStorage.setItem("access_token", response.data.access_token);
                    return response.data;
                } else {
                    return thunkAPI.rejectWithValue('Login failed');
                }
            }
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const me = createAsyncThunk(
    "auth/me",
    async (data: any, thunkAPI) => {
        // let response = await authService.me();
        
        try {
            let response = await authService.me();
            if (response.status === 200) {
                    console.log(response);
            }
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Login User
        builder.addCase(login.pending, (state) => {
            state.isLoggedIn = false;
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.isLoading = false;
        }).addCase(login.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = false;
        });
    }
});

export const {
} = authSlice.actions

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectUser = (state: any) => state.auth.user

export default authSlice.reducer