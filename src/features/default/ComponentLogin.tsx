import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Logout, postLogin, selectLogin} from "../login/loginSlice";
import {GoogleLogin} from "@react-oauth/google";
import {getPages} from "../pages/pagesSlice";
import {Header} from "./header/Header";
import React from "react";
import './Default.css';

export function ComponentLogin() {
    const dispatch = useAppDispatch();
    const login = useAppSelector(selectLogin);

    let content = <GoogleLogin
        theme="filled_black"
        width="300px"
        onSuccess={credentialResponse => {
            dispatch(postLogin(credentialResponse.credential!))
            setTimeout(() => {
                dispatch(getPages())
            }, 1000)
        }}
        onError={() => {
            alert('Login Failed');
        }}
    />

    if (login.auth) {
        content = <div>Здравствуйте, {login.mail}
            <div onClick={() => dispatch(Logout())}>Выйти</div>
        </div>

    }

    return (
        <div className="App">
            <Header/>
            <br/>
            <div className="App-header">
                {content}
            </div>
        </div>
    );
}