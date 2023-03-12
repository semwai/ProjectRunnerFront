import React, {useState} from "react";
import styles from './Page.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {restart, selectPage, start} from "./pageSlice";
import {Spinner} from "../spinner/Spinner";
import {Terminal} from "../terminal/Terminal";
import {puts} from "../terminal/terminalSlice";
import Inputs from "./inputs/Inputs";
import ReactMarkdown from "react-markdown";


function PageComponent() {
    const project = useAppSelector(selectPage)
    const [stdin, setStdin] = useState("") // Ввод строки в терминал
    // Данные, которые передаются при запуске проекта и изменяются в элементах ввода
    const [input, setInput] = useState<{[key:string]:string;}>(project.defaultInput)
    const dispatch = useAppDispatch();

    // обновить значение
    const updateInput = (key: string, value: string) => {
        let newState = structuredClone(input)
        newState[key] = value
        console.log(key)
        setInput(newState)
    }

    const send = () => {
        dispatch(puts({text: stdin + '\n', type: 'stdin'}))
        project.ws?.send(JSON.stringify({type: 'stdio', data: stdin}))
        setStdin('')
    }

    const startProject = () => {
        dispatch(start(input))
    }

    const restartProject = () => {
        dispatch(restart())
    }
    // запущенный проект, появляется терминал
    const started = project.wait?<div className={styles.wait}><Spinner/></div>:(<>
        <div className={styles.containerItem}>
            <div className={styles.buttons}>
                <div className={styles.send}>
                    <button onClick={send} className={styles.btn} disabled={!stdin.length}>send</button>
                </div>
                <div>
                    <button onClick={restartProject} className={styles.btn}>restart</button>
                </div>
            </div>
            <div className={styles.areaBox}>
                <textarea className={styles.input} placeholder='send to process:' value={stdin} onChange={e => setStdin(e.target.value)}/>
            </div>
        </div>
        <div className={styles.containerItem}><Terminal/></div>
    </>)
    // для незапущенного проекта вывожу кнопку запуска
    const not_started = (<div className={[styles.container, styles.containerItem].join(' ')}>
        <button onClick={startProject}>start project</button>
    </div>)

    return <>
        <div><h1>{project.value?.name}</h1></div>
        <div className={styles.containerItem}>
            <ReactMarkdown>{project.value?.description || ""}</ReactMarkdown>
        </div>
        <div className={styles.containerItem}>
            <Inputs input={input} updateInput={updateInput}/>
        </div>
        {project.start?started:not_started}

    </>
}

export function Page() {
    const project = useAppSelector(selectPage)

    let content
    switch (project.status) {
        case 'idle':
            content = project.value ? <PageComponent/> : <div className={styles.center}><Spinner/></div>
            break
        case 'loading':
            content = <div className={styles.center}><Spinner/></div>
            break
        case 'failed':
            content = 'server error'
            break
    }

    return (<div className={styles.container}>{content}</div>)
}