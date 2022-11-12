import Editor from "@monaco-editor/react";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProject, writeCode} from "./projectSlice";
import {Spinner} from "react-bootstrap";
import styles from './Project.module.css'

export function Input() {
    const project = useAppSelector(selectProject)
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true
    };
    const dispatch = useAppDispatch();

    return <Editor
        height="400px"
        language={project.value?.lang}
        theme="vs-dark"
        value={project.value?.example}
        options={options}
        onChange={(s) => {
            console.log(s)
            dispatch(writeCode(s || ''))}}
        loading={<Spinner className={styles.center}/>}
    />
}