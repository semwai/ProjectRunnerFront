import React from 'react';
import {File} from "../../../../app/interfaces";
import {TypeSelector} from "./Step";
import {useAppDispatch} from "../../../../app/hooks";
import {updateCMD} from "../../newpageSlice";

export function FileComponent(props: { c: File, path: number[] }) {
    const dispatch = useAppDispatch();

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, name: e.target.value}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    return <div>
        Type: <TypeSelector value={props.c.type} path={props.path} data={props.c}/><br/>
        Name: <input type={"text"} value={props.c.name} onChange={updateName}/><br/>
    </div>
}