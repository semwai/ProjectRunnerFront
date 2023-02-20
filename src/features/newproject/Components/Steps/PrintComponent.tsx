import React from 'react';
import {Print} from "../../../../app/interfaces";
import {TypeSelector} from "./Step";

export function PrintComponent(props: {c: Print, path: number[]}) {
    return <div>
        Type: <TypeSelector value={props.c.type}/><br/>
        Text: <input type={"text"} value={props.c.text}/><br/>
        File: <input type={"text"} value={props.c.file}/><br/>
    </div>
}