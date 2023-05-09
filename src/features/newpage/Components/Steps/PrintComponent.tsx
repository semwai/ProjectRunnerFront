import React from 'react';
import {Print} from "../../../../app/interfaces";
import {TypeSelector} from "./Step";
import {useAppDispatch} from "../../../../app/hooks";
import {removeCMD, updateCMD} from "../../newpageSlice";

export function PrintComponent(props: { c: Print, path: number[] }) {
    const dispatch = useAppDispatch();

    const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, text: e.target.value}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    const updateFile = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cmd = {...props.c, file: e.target.value}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    return <div>
        <button onClick={() => dispatch(removeCMD(props.path))}>X</button><br/>
        Type: <TypeSelector value={props.c.type} path={props.path} data={props.c}/><br/>
        Text: <input type={"text"} value={props.c.text} onChange={updateText}/><br/>
        File: <select value={props.c.file} onChange={updateFile}>
        <option>stdout</option>
        <option>stderr</option>
    </select>
    </div>
}