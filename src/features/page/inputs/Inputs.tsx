import {useAppSelector} from "../../../app/hooks";
import {selectPage} from "../pageSlice";
import {Input} from "../../../app/interfaces";
import {CodeEditor} from "./CodeEditor";
import styles from './Inputs.module.css'
import {ChangeEvent} from "react";

export interface prop {
    input: { [key: string]: string; },
    updateInput: (key: string, value: string) => void
}

export default function Inputs(props: prop) {
    const project = useAppSelector(selectPage)

    return <div>
        {project.value?.ui.data.map((e, key) => <div className={styles.input} key={key}>
            {UIElementDecoder(e, props)}
        </div>)}
    </div>
}

export function UIElementDecoder(input: Input, props: prop) {
    // Парсинг и выбор графического элемента
    let header = <></>
    let body = <></>
    const value = props.input[input.name]
    const onChange = (e: ChangeEvent<HTMLInputElement>) => props.updateInput(input.name, e.target.value)
    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => props.updateInput(input.name, e.target.value)
    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => props.updateInput(input.name, e.target.value)
    const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const data = await e.target.files[0].text()
            props.updateInput(input.name, data)
        }
    }

    switch (input.destination) {
        case "file":
            header = <div title={input.description}>{input.file}</div>
            break
        case "param":
            header = <div title={input.description}>{input.name}:</div>
            break
        case "env":
            header = <div title={input.description}>{input.name}</div>
            break
    }


    switch (input.type) {
        case "code":
            body = <CodeEditor props={props} input={input} defaultValue={input.default}/>
            break
        case "text":
            body = <input type='text' value={value} onChange={onChange} defaultValue={input.default}/>
            break
        case "number":
            body = <input type='number' value={value} onChange={onChange} defaultValue={input.default}/>
            break
        case "list":
            body = <select className={styles.select} defaultValue={input.default} onChange={onChangeSelect} >
                {input?.values?.map((v, i) => <option key={i} value={v.value}>{v.title}</option>)}
            </select>
            break
        case "textarea":
            body = <textarea className={styles.textarea} value={value} onChange={onChangeTextArea} defaultValue={input.default}></textarea>
            break
        case "file":
            body = <input type='file' className={styles.textarea} value={value} onChange={onChangeFile}></input>
            break
    }

    return <div>{header}{body}</div>
}