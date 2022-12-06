import {useAppSelector} from "../../../app/hooks";
import {selectProject} from "../projectSlice";
import {Input} from "../../../app/interfaces";
import {CodeEditor} from "./CodeEditor";
import styles from './Inputs.module.css'

export interface prop {
    input: {[key:string]:string;},
    updateInput: (key: string, value: string) => void
}

export default function Inputs(props: prop) {
    const project = useAppSelector(selectProject)

    return <div>
        {project.value?.ui.data.map((e, key) =>
            <div className={styles.input} key={key}>
                {switcher(e, props)}
            </div>) }
    </div>
}

function switcher(input: Input, props: prop) {
    switch (input.type) {
        case "code":
            return <div>{input.file}<CodeEditor props={props} input={input}/></div>
        case "text":
            return <div title={input.description}>{input.name}:
                <input type='text' value={props.input[input.name]} onChange={e => props.updateInput(input.name, e.target.value)}/>
            </div>
        case "number":
            return <div>number</div>
        case "list":
            return <div>list</div>
    }
}