import Editor from "@monaco-editor/react";
import React from "react";
import {Spinner} from "../../spinner/Spinner";
import styles from './Inputs.module.css'
import {prop} from "./Inputs";
import {Input} from "../../../app/interfaces";

export function CodeEditor({input, props, defaultValue}: {input: Input, props: prop, defaultValue?: string}) {
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        // readOnly: project.start // Блокирую изменение кода когда проект запущен
    };

    return <Editor
        defaultValue={defaultValue}
        height="400px"
        language={input.language}
        theme="vs-dark"
        value={props.input[input.name]}
        options={options}
        onChange={(s) => props.updateInput(input.name, s || '')}
        loading={<div className={styles.center}><Spinner/></div>}
    />
}