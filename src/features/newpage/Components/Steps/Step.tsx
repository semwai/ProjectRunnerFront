import React from 'react';
import {Print, Run, Steps, File, Step} from "../../../../app/interfaces";
import {StepsComponent} from "./StepsComponent";
import {RunComponent} from "./RunComponent";
import {PrintComponent} from "./PrintComponent";

export const types = ["Run", "File", "Print", "Steps"]

export function TypeSelector(p: {value: string}) {
    return <select value={p.value}>
        {types.map((v, i) => <option key={i}>{v}</option>)}
    </select>
}

export function StepComponent(p: {data: Step | File | Steps | Run | Print, path: number[]}) {
    switch (p.data.type) {
        case "Run":
            return <RunComponent path={p.path} c={p.data as Run}/>
        case "Steps":
            return <StepsComponent path={p.path} steps={p.data as Steps}/>
        case "Print":
            return <PrintComponent path={p.path} c={p.data as Print}/>
        default:
            return <></>
    }
}