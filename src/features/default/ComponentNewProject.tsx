import {useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import React from "react";
import './Default.css';
import {NewProject} from "../newproject/NewProject";

export function ComponentNewProject() {
    const login = useAppSelector(selectLogin);

    if (!login.auth) {
        return <ComponentLogin/>
    }
    if (login.access !== "admin") {
        return <p>403</p>
    }
    return (
        <div className="App">
            <Header/>
            <NewProject/>
        </div>
    );
}