import Editor from "@monaco-editor/react";
import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {Spinner} from "react-bootstrap";
import styles from './Project.module.css'

export function Input() {
    const project = useAppSelector(selectProject)
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true
    };

    return <Editor
        height="500px"
        language={project.value?.lang}
        theme="vs-dark"
        value={project.value?.example}
        options={options}
        loading={<Spinner className={styles.center}/>}
    />
}