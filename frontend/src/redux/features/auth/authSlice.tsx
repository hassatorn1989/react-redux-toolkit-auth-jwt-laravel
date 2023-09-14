import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../../services/authService';
const initialState = {
    isLoggedIn: false,
    isLoading: false,
    isAuth: true,
    user: null
}

export const login = createAsyncThunk(
    "auth/login",
    async (data: any, thunkAPI) => {
        try {
            const response = await authService.login(data);
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
        try {
            const response = await authService.me();
            if (response.status === 200) {
                if (response.data.status === "success") {
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

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (data: any, thunkAPI) => {
        try {
            const response = await authService.refreshToken();
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

export const logout = createAsyncThunk(
    "auth/logout",
    async (data: any, thunkAPI) => {
        try {
            const response = await authService.logout();
            if (response.status === 200) {
                localStorage.removeItem('access_token');
                return response.data;
            }else{
                return thunkAPI.rejectWithValue('Logout failed');
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

        // Get User
        builder.addCase(me.pending, (state) => {
            state.isAuth = true;
        }).addCase(me.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        }).addCase(me.rejected, (state, action) => {
            state.isAuth = false;
        })

        // Logout User
        builder.addCase(logout.pending, (state) => {
        }).addCase(logout.fulfilled, (state, action) => {
            state.isAuth = false;
            state.isLoggedIn = false;
        }).addCase(logout.rejected, (state, action) => {
        })
    }
});

export const {
} = authSlice.actions

export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectUser = (state: any) => state.auth.user
export const selectIsAuth = (state: any) => state.auth.isAuth

export default authSlice.reducer