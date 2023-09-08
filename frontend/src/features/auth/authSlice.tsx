import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authAction";

// initialize userToken from local storage
const userToken = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null
const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
    

const initialState = {
    loading: false,
    userInfo,
    userToken,
    error: null,
    success: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token') // delete token from storage
            localStorage.removeItem('user') // delete token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
        setCredentials : (state, action) => {
            state.userInfo = action.payload.userInfo
            state.userToken = action.payload.userToken
        }
    },
    extraReducers: {
        // userLogin
        [userLogin.pending.type]: (state) => {
            state.loading = true
        },
        [userLogin.fulfilled.type]: (state, action) => {
            state.loading = false
            state.userInfo = action.payload.userInfo
            state.userToken = action.payload.userToken
            state.error = null
            state.success = true
        },
        [userLogin.rejected.type]: (state, action) => {
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = action.payload
        },
    }
})
export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer


