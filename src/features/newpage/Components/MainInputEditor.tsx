import {Input} from "../../../app/interfaces";
import {useAppDispatch} from "../../../app/hooks";
import React, {ChangeEvent} from "react";
import {updateUI} from "../newpageSlice";
import styles from "../NewPage.module.css";

export function MainInputEditor(props: { input: Input, id: number }) {
    const dispatch = useAppDispatch();


    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        const ui = structuredClone(props.input)
        ui.name = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateDescription = (e: ChangeEvent<HTMLInputElement>) => {
        const ui = structuredClone(props.input)
        ui.description = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateDefault = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const ui = structuredClone(props.input)
        ui.default = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateLanguage = (e: ChangeEvent<HTMLInputElement>) => {
        const ui = structuredClone(props.input)
        ui.language = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateEnv = (e: ChangeEvent<HTMLInputElement>) => {
        const ui = structuredClone(props.input)
        ui.env = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateFile = (e: ChangeEvent<HTMLInputElement>) => {
        const ui = structuredClone(props.input)
        ui.file = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateType = (e: ChangeEvent<HTMLSelectElement>) => {
        const ui = structuredClone(props.input)
        // @ts-ignore
        ui.type = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateDestination = (e: ChangeEvent<HTMLSelectElement>) => {
        const ui = structuredClone(props.input)
        // @ts-ignore
        ui.destination = e.target.value
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const addValue = () => {
        const ui = structuredClone(props.input)
        if (ui.values !== undefined)
            ui.values = [...ui.values, {title: '', value: ''}]
        else
            ui.values = [{title: '', value: ''}]
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const removeValue = (i: number) => {
        const ui = structuredClone(props.input)
        if (ui.values)
            delete ui.values[i]
        ui.values = ui.values?.filter(t => t !== undefined)
        dispatch(updateUI({id: props.id, new: ui}))
    }
    const updateValue = (i: number, v: { value: string, title: string }) => {
        const ui = structuredClone(props.input)
        if (ui.values === undefined)
            return

        ui.values[i].title = v.title
        ui.values[i].value = v.value
        dispatch(updateUI({id: props.id, new: ui}))
    }

    const head = <>
        <p><span className={styles.label}>name</span><input value={props.input.name} onChange={updateName}/></p>
        <p><span className={styles.label}>description</span><input value={props.input.description}
                                                                   onChange={updateDescription}/></p>
        {props.input.type === 'code' ?
            <p><span className={styles.label}>lang</span><input value={props.input.language} onChange={updateLanguage}/>
            </p> : <></>}
        <p><span className={styles.label}>default</span><textarea value={props.input.default} onChange={updateDefault}/>
        </p>
        {props.input.destination === 'file' ?
            <p><span className={styles.label}>filename</span><input value={props.input.file} onChange={updateFile}/>
            </p> : <></>}
        {props.input.destination === 'env' ?
            <p><span className={styles.label}>env variable name</span><input value={props.input.env}
                                                                             onChange={updateEnv}/></p> : <></>}

        <p><span className={styles.label}>type</span></p>
        <select value={props.input.type} onChange={updateType}>
            <option>text</option>
            <option>number</option>
            <option>list</option>
            <option>code</option>
            <option>textarea</option>
            <option>file</option>
        </select>
        <p><span className={styles.label}>destination</span></p>
        <select value={props.input.destination} onChange={updateDestination}>
            <option>param</option>
            <option>env</option>
            <option>file</option>
        </select>
        {props.input.type === 'list' ? <><p><span className={styles.label}>values:</span></p>
        <ul>
            {props.input.values?.map((v, i) =>
                <li>title
                    <input value={v.title} onChange={(e) => updateValue(i, {value: v.value, title: e.target.value})}/>
                    value
                    <input value={v.value} onChange={(e) => updateValue(i, {value: e.target.value, title: v.title})}/>
                    &nbsp;
                    <button onClick={() => removeValue(i)}>-</button>
                </li>)}
            <button onClick={addValue}>add</button>
        </ul></>
            : <></>}

    </>

    const body = <></>

    switch (props.input.type) {
        case "text":
            break
        case "number":
            break
        case "list":
            break
        case "code":
            break
        case "textarea":
            break
        case "file":
            break
    }

    return <>{head}{body}</>
}