import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import React, {useEffect} from "react";
import './Default.css';
import {NewProject} from "../newproject/NewProject";
import {initialNewProjectState, selectNewProject, setNewProjectValue} from "../newproject/newprojectSlice";

export function ComponentNewProject() {
    const login = useAppSelector(selectLogin);
    const newProject = useAppSelector(selectNewProject);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetch data
        if (login.auth && newProject.id > 0) {
            dispatch(setNewProjectValue(initialNewProjectState))
        }
    }, [login.auth]);
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