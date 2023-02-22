import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('/auth/fetch-user-data', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('/auth/fetch-register', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('/auth/fetch-auth-me', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

const initialState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    }, 
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchUserData.rejected]: (state, action) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchRegister.pending]: (state, action) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchRegister.rejected]: (state, action) => {
            state.data = null;
            state.status = 'error';
        },
        [fetchAuthMe.pending]: (state, action) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        [fetchAuthMe.rejected]: (state, action) => {
            state.data = null;
            state.status = 'error';
        },
    }
});

export const isAuthSelector = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;