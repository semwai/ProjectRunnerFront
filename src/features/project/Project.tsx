import React, {useState} from "react";
import styles from './Project.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {Input} from "./Input";
import {Spinner} from "react-bootstrap";
import {Terminal} from "../terminal/Terminal";
import {puts} from "../terminal/terminalSlice";


function Page() {
    const project = useAppSelector(selectProject)
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch();

    const send = () => {
        dispatch(puts({text: input + '\n', type: 'stdin'}))
        setInput('')
    }

    return <>
        <div><h1>{project.value?.name}</h1></div>
        <div className={styles.containerItem}><Input/></div>
        <div className={styles.containerItem}>
            <div className={styles.areaBox}>
                <textarea className={styles.input} placeholder='send to process:' value={input} onChange={e => setInput(e.target.value)}/>
            </div>
            <div className={styles.container}>
                <div className={styles.send}>
                    <button onClick={send} className={styles.btn} disabled={!input.length}>send</button>
                </div>
            </div>
        </div>
        <div className={styles.containerItem}><Terminal/></div>
    </>
}

export function Project() {
    const project = useAppSelector(selectProject)

    let content
    switch (project.status) {
        case 'idle':
            content = project.value ? <Page/> : <Spinner className={styles.center}/>
            break
        case 'loading':
            content = <Spinner className={styles.center}/>
            break
        case 'failed':
            content = 'server error'
            break
    }

    return (<div className={styles.container}>{content}</div>)
}