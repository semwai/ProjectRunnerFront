import React from 'react';
import {Run} from "../../../../app/interfaces";
import {TypeSelector} from "./Step";
import {removeCMD, updateCMD} from "../../newpageSlice";
import {useAppDispatch} from "../../../../app/hooks";

export function RunComponent(props: {c: Run, path: number[]}) {
    const dispatch = useAppDispatch();

    const updateCommand = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, command: e.target.value}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    const updateEcho = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, echo: e.target.checked}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    const updateExitCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, exitCode: e.target.checked}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    const updateStdout = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, stdout: e.target.checked}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    const updateStdin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cmd = {...props.c, stdin: e.target.checked}
        dispatch(updateCMD({path: props.path, cmd: cmd}))
    }

    return <div>
        <button onClick={() => dispatch(removeCMD(props.path))}>X</button><br/>
        Type: <TypeSelector value={props.c.type} path={props.path} data={props.c}/><br/>
        Command: <input type={"text"} value={props.c.command} onChange={updateCommand}/><br/>
        echo: <input type={"checkbox"} checked={props.c.echo} title="Печатать Command перед выполнением" onChange={updateEcho}/><br/>
        exitCode: <input type={"checkbox"} checked={props.c.exitCode} title="Показывать код возврата после завершения команды" onChange={updateExitCode}/><br/>
        stdout: <input type={"checkbox"} checked={props.c.stdout} title="Выводить результат в консоль" onChange={updateStdout}/><br/>
        stdin: <input type={"checkbox"} checked={props.c.stdin} title="Принимать ввод пользователя" onChange={updateStdin}/><br/>
    </div>
}