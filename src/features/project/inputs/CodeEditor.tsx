import Editor from "@monaco-editor/react";
import React from "react";
import {useAppSelector} from "../../../app/hooks";
import {selectProject} from "../projectSlice";
import {Spinner} from "../../spinner/Spinner";
import styles from './Inputs.module.css'
import {prop} from "./Inputs";
import {Input} from "../../../app/interfaces";

export function CodeEditor({input, props}: {input: Input, props: prop}) {
    const project = useAppSelector(selectProject)
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        // readOnly: project.start // Блокирую изменение кода когда проект запущен
    };

    return <Editor
        height="400px"
        language={project.value?.lang}
        theme="vs-dark"
        value={props.input[input.name]}
        options={options}
        onChange={(s) => props.updateInput(input.name, s || '')}
        loading={<div className={styles.center}><Spinner/></div>}
    />
}