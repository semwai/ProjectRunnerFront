import {useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {Pages} from "../pages/Pages";
import {ComponentLogin} from "./ComponentLogin";
import React from "react";
import './Default.css';

export function ComponentPages() {
    const login = useAppSelector(selectLogin);

    if (!login.auth) {
        return <ComponentLogin/>
    }
    return (
        <div className="App">
            <Header/>
            <Pages/>
        </div>
    );
}