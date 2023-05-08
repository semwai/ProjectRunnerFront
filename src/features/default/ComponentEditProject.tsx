import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {Header} from "./header/Header";
import {ComponentLogin} from "./ComponentLogin";
import React, {useEffect} from "react";
import './Default.css';
import {NewProject} from "../newproject/NewProject";
import {useParams} from "react-router-dom";
import {getPage} from "../page/pageSlice";
import {setNewProjectValue} from "../newproject/newprojectSlice";
import {selectProjects} from "../projects/projectsSlice";

export function ComponentEditProject() {
    const login = useAppSelector(selectLogin);
    const projects = useAppSelector(selectProjects);
    const dispatch = useAppDispatch();
    const {id} = useParams()

    useEffect(() => {
        // fetch data
        if (typeof id === "string" && login.auth) {
            const current = projects.value.filter(p => p.id === Number(id))[0]
            dispatch(setNewProjectValue(current))
            console.log(id)
        }
    }, [id, login.auth]);

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