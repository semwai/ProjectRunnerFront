import React from 'react';
import {Run} from "../../../../app/interfaces";
import {TypeSelector} from "./Step";

export function RunComponent(props: {c: Run, path: number[]}) {
    return <div>
        Type: <TypeSelector value={props.c.type}/><br/>
        Command: <input type={"text"} value={props.c.command} readOnly/><br/>
        echo: <input type={"checkbox"} checked={props.c.echo} readOnly/><br/>
        exitCode: <input type={"checkbox"} checked={props.c.exitCode} readOnly/><br/>
        stdout: <input type={"checkbox"} checked={props.c.stdout} readOnly/><br/>
        stdin: <input type={"checkbox"} checked={props.c.stdin} readOnly/><br/>
    </div>
}