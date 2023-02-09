import {Input} from "../../../app/interfaces";
import {useAppDispatch} from "../../../app/hooks";
import styles from "../NewProjects.module.css";
import {removeUI} from "../newprojectsSlice";
import {MainInputEditor} from "./MainInputEditor";
import {UIElementDecoder} from "../../project/inputs/Inputs";
import React from "react";

export function NewInput(props: { input: Input, id: number }) {
    const dispatch = useAppDispatch();

    return <div className={styles.row}>
        <div className={styles.column}>
            <details open>
                <summary>#{props.id + 1}
                    <button onClick={() => dispatch(removeUI(props.input.name))}>-</button>
                </summary>
                <MainInputEditor input={props.input} id={props.id}/>
            </details>
        </div>
        <div className={styles.column}>
            {UIElementDecoder(props.input, {
                input: {'props.input.name': "123"},
                updateInput: (key: string, value: string) => {
                }
            })}
        </div>
    </div>
}