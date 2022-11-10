import React, {useState} from "react";
import {useParams} from "react-router-dom";
import MonacoEditor from 'react-monaco-editor';
import styles from './Project.module.css'
import {useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {store} from "../../app/store";
import {getProject} from "./projectSlice";


export function Project() {
    const { id } = useParams()
    const [ code, setCode ] = useState(" ")
    const project = useAppSelector(selectProject)

    const options = {
        selectOnLineNumbers: true
    };

    if (project.value == null) {
        if (typeof id === "string") {
            store.dispatch(getProject(parseInt(id)))
        }

        return <p></p>
    } else {
        //setCode(project.value.example)
        return (
            <div className={styles.container}>
                <p>{id}</p>
                <MonacoEditor
                    width="800"
                    height="600"
                    language={project.value.lang}
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={(v) => setCode(v)}
                />
            </div>)
    }
}