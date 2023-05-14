import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import React, {useEffect} from "react";
import './Default.css';
import {NewProject} from "../newproject/NewProject";
import {initialNewProjectState, selectNewProject, setNewProjectValue} from "../newproject/newprojectSlice";
import ComponentError from "./СomponentError";

export function ComponentNewProject() {
    const login = useAppSelector(selectLogin);
    const newProject = useAppSelector(selectNewProject);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetch data
        if (login.auth && newProject.id > 0) {
            dispatch(setNewProjectValue(initialNewProjectState))
        }
    }, [dispatch, login.auth, newProject.id]);
    if (!login.auth) {
        return <ComponentLogin/>
    }
    if (login.access !== "admin")
        return <ComponentError msg={'Доступ запрещен'}/>

    return (
        <div className="App">
            <Header/>
            <NewProject/>
        </div>
    );
}