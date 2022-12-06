import {useAppSelector} from "../../../app/hooks";
import {selectProject} from "../projectSlice";
import {Input} from "../../../app/interfaces";
import {CodeEditor} from "../CodeEditor";
import styles from './Inputs.module.css'

export default function Inputs() {
    const project = useAppSelector(selectProject)

    return <div>
        {project.value?.ui.data.map((e, key) => <div className={styles.input} key={key}>{switcher(e)}</div>) }
    </div>
}

function switcher(input: Input) {
    switch (input.type) {
        case "code":
            return <div>{input.file}<CodeEditor/></div>
        case "text":
            return <div title={input.description}>{input.name}:<input type='text'/></div>
        case "number":
            return <div>number</div>
        case "list":
            return <div>list</div>
    }
}