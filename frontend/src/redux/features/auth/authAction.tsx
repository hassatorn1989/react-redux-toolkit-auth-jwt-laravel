import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/authService";

const login = createAsyncThunk(
    "auth/login",
    async (data: any, thunkAPI) => {
        try {
            let response = await authService.login(data);
            if (response.status === 200) {
                if (response.data.status === "success") {
                    localStorage.setItem("token", response.data.token);
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

const me = createAsyncThunk(
    "auth/me",
    async (data: any, thunkAPI) => {
        try {
            let response = await authService.me();
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

export { login, me };