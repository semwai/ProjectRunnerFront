import React from 'react';
import {File, Print, Run, Step, Steps} from "../../../../app/interfaces";
import {StepsComponent} from "./StepsComponent";
import {RunComponent} from "./RunComponent";
import {PrintComponent} from "./PrintComponent";
import {useAppDispatch} from "../../../../app/hooks";
import {updateCMD} from "../../newpageSlice";
import {FileComponent} from "./FileComponent";

export const types = ["Run", "File", "Print", "Steps"]

const emptyCmdFile: File = {type: "File", name: ""}
const emptyCmdPrint: Print = {type: "Print", text: "", file: "stdout"}
const emptyCmdRun: Run = {type: "Run", command: "", exitCode: true, stdout: true, stdin: true, echo: true}
const emptyCmdSteps: Steps = {type: "Steps", data: []}

const emptyCMDs = {"File": emptyCmdFile, "Print": emptyCmdPrint, "Run": emptyCmdRun, "Steps": emptyCmdSteps}

export function TypeSelector(p: { value: string, path: number[], data: Step | File | Steps | Run | Print}) {
    const dispatch = useAppDispatch();

    const updateType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value, p.path)
        const nValue = event.target.value as ("Run" | "File" | "Print" | "Steps")
        if (!types.includes(nValue)) {
            return
        }
        const cmd = emptyCMDs[nValue]
        dispatch(updateCMD({path: p.path, cmd: cmd}))
    }

    return <select value={p.value} onChange={updateType}>
        {types.map((v, i) => <option key={i}>{v}</option>)}
    </select>
}

export function StepComponent(p: { data: Step | File | Steps | Run | Print, path: number[] }) {
    switch (p.data.type) {
        case "Run":
            return <RunComponent path={p.path} c={p.data as Run}/>
        case "Steps":
            return <StepsComponent path={p.path} steps={p.data as Steps}/>
        case "Print":
            return <PrintComponent path={p.path} c={p.data as Print}/>
        case "File":
            return <FileComponent path={p.path} c={p.data as File}/>
        default:
            return <></>
    }
}