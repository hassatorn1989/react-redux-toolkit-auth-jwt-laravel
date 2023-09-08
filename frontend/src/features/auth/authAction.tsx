import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = 'http://localhost:8000/api'

export const userLogin = createAsyncThunk(
    'auth/login',
    async (credentials: any, thunkAPI) => {
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await axios.post(`${backendURL}/login`, credentials, config)
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    })