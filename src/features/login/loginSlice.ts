import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {LoginData} from "../../app/interfaces";
import {fetchLogin, fetchTestLogin} from "./loginAPI";

const initialState: LoginData = {
    auth:  false,
    mail: '',
    status: 'idle'
};


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        exit: (state) => {
            state.auth = false
            state.mail = ''
            localStorage.auth = false
            localStorage.token = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postLogin.fulfilled, (state, action) => {
                state.status = 'idle';
                state.mail = action.payload.email;
                state.auth = true
            })
            .addCase(postLogin.rejected, (state) => {
                state.status = 'failed';
                state.auth = false
                state.mail = ''
            })
            .addCase(testLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(testLogin.fulfilled, (state, action) => {
                state.status = 'idle';
                state.mail = action.payload.email;
                state.auth = true
            })
            .addCase(testLogin.rejected, (state) => {
                state.status = 'failed';
                state.auth = false
                state.mail = ''
            });
    }

});

export const postLogin = createAsyncThunk(
    'login/login',
    async (token: string) => {
        return await fetchLogin(token);
    }
);

export const testLogin = createAsyncThunk(
    'login/test',
    async () => {
        return await fetchTestLogin();
    }
);

export const { exit } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
