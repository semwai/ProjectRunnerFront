import Editor from "@monaco-editor/react";
import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {Spinner} from "react-bootstrap";

export function Input() {
    const project = useAppSelector(selectProject)
    const options = {
        selectOnLineNumbers: true
    };

    return <Editor
        width="800px"
        height="600px"
        language={project.value?.lang}
        theme="vs-dark"
        value={project.value?.example}
        options={options}
        loading={<Spinner/>}
    />
}