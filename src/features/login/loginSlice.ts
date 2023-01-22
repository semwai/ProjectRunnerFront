import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {LoginData} from "../../app/interfaces";
import {fetchLogin, fetchLogout, fetchTestLogin} from "./loginAPI";

const initialState: LoginData = {
    auth: -1,
    mail: '',
    status: 'idle'
};


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        exit: (state) => {
            state.auth = 0
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
                state.auth = 1

            })
            .addCase(postLogin.rejected, (state) => {
                state.status = 'failed';
                state.auth = 0
                state.mail = ''
            })
            .addCase(testLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(testLogin.fulfilled, (state, action) => {
                state.status = 'idle';
                state.mail = action.payload.email;
                state.auth = 1
            })
            .addCase(testLogin.rejected, (state) => {
                state.status = 'failed';
                state.auth = 0
                state.mail = ''
            })
            .addCase(Logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(Logout.fulfilled, (state) => {
                state.status = 'idle'
                state.mail = ''
                state.auth = 0
            })
            .addCase(Logout.rejected, (state) => {
                state.status = 'failed';
                state.auth = 0
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

export const Logout = createAsyncThunk(
    'login/logout',
    async () => {
        return await fetchLogout();
    }
);


export const { exit } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
