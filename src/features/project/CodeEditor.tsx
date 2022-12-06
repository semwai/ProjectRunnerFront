import Editor from "@monaco-editor/react";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProject, writeCode} from "./projectSlice";
import {Spinner} from "../spinner/Spinner";
import styles from './Project.module.css'

export function CodeEditor() {
    const project = useAppSelector(selectProject)
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        // readOnly: project.start // Блокирую изменение кода когда проект запущен
    };
    const dispatch = useAppDispatch();

    return <Editor
        height="400px"
        language={project.value?.lang}
        theme="vs-dark"
        value={project.value?.example}
        options={options}
        onChange={(s) => {
            dispatch(writeCode(s || ''))}}
        loading={<div className={styles.center}><Spinner/></div>}
    />
}