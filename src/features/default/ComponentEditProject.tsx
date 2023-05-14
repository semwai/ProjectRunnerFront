import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import React, {useEffect} from "react";
import './Default.css';
import {NewProject} from "../newproject/NewProject";
import {useParams} from "react-router-dom";
import {setNewProjectValue} from "../newproject/newprojectSlice";
import {selectProjects} from "../projects/projectsSlice";
import ComponentError from "./СomponentError";

export function ComponentEditProject() {
    const login = useAppSelector(selectLogin);
    const projects = useAppSelector(selectProjects);
    const dispatch = useAppDispatch();
    const {id} = useParams()

    useEffect(() => {
        // fetch data
        if (typeof id === "string" && login.auth) {
            const current = projects.value.filter(p => p.id === Number(id))[0]
            if (current)
                dispatch(setNewProjectValue(current))
            console.log(id)
        }
    }, [id, login.auth, dispatch, projects.value]);

    if (!login.auth) {
        return <ComponentLogin/>
    }
    if (login.access !== "admin")
        return <ComponentError msg={'Доступ запрещен'}/>

    if (projects.value.filter(p => p.id === Number(id)).length === 0)
        return <ComponentError msg={'Проект не найден'}/>

    return (
        <div className="App">
            <Header/>
            <NewProject/>
        </div>
    );
}