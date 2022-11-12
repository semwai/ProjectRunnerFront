import React from "react";
import styles from './Terminal.module.css'
import {useAppSelector} from "../../app/hooks";
import {selectTerminal, TerminalString} from "./terminalSlice";

const TerminalStringComponent = (str: TerminalString) => {

    const text = <span dangerouslySetInnerHTML={{__html: str.text.replace(/\n/g, "<br/>")}}/>
    switch (str.type) {
        case "stdin":
            return <span className={styles.stdin}>{text}</span>
        case "stderr":
            return <span className={styles.stderr}>{text}</span>
        case "stdout":
            return <span className={styles.stdout}>{text}</span>
        case "ExitCode":
            return <span className={styles.ExitCode}>{text}</span>
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