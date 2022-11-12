import React from "react";
import styles from './Terminal.module.css'
import {useAppSelector} from "../../app/hooks";
import {selectTerminal, TerminalString} from "./terminalSlice";

const TerminalStringComponent = (str: TerminalString) => {

    let text = str.text.split(/\n/g)
    let content
    if (text.length > 1) {
        text.pop()
        content = text.map(s => <>{s}<br/></>)
    } else {
        content = text
    }
    switch (str.type) {
        case "stdin":
            return <span className={styles.stdin}>{content}</span>
        case "stderr":
            return <span className={styles.stderr}>{content}</span>
        case "stdout":
            return <span className={styles.stdout}>{content}</span>
        case "ExitCode":
            return <span className={styles.ExitCode}>{content}</span>
        default:
            return <span></span>
    }
}


export function Terminal() {
    const terminal = useAppSelector(selectTerminal)

    return (<>


        <pre className={[styles.terminal, styles.container].join(' ')}>
            {terminal.value.map((str, i) =>
                <TerminalStringComponent key={i} text={str.text} type={str.type}/>
            )}
        </pre>
    </>)
}