import {useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import {OneProject} from "../project/Project";
import React from "react";
import './Default.css';
import {useParams} from "react-router-dom";

export function ComponentProject() {
    const login = useAppSelector(selectLogin);
    const {id} = useParams()

    if (!login.auth) {
        return <ComponentLogin/>
    }
    return (
        <div className="App">
            <Header/>
            <OneProject id={Number(id)}/>
        </div>
    );
}