import React from 'react';
import ReactMarkdown from "react-markdown";
import styles from './NewPage.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addUI, postPage, selectNewPage, setDescription, setName, setShortDescription, setVersion} from "./newpageSlice";
import {NewInput} from "./Components/NewInput";
import {StepComponent} from "./Components/Steps/Step";
import {useNavigate} from "react-router-dom";
import {setNeedUpdate} from "../pages/pagesSlice";


export function NewPage() {
    const dispatch = useAppDispatch();
    const np = useAppSelector(selectNewPage);
    const navigate = useNavigate();

    return <div>
        <h1>Новая страница</h1>
        <p><span className={styles.label}>название</span><input value={np.name} onChange={e => dispatch(setName(e.target.value))}/></p>
        <p><span className={styles.label}>версия</span><input value={np.version} onChange={e => dispatch(setVersion(e.target.value))}/></p>
        <p><span className={styles.label}>Docker image</span><input value="python:alpine" onChange={() => {}}/></p>
        <p><span className={styles.label}>краткое описание</span><input value={np.short_description} onChange={e => dispatch(setShortDescription(e.target.value))}/></p>
        <p><span className={styles.label}>описание (markdown):</span></p>
        <div className={styles.row}>
            <div className={styles.column}>
                <textarea value={np.description} onChange={e => dispatch(setDescription(e.target.value))}/>
            </div>
            <div className={styles.column}>
                <ReactMarkdown>{np.description}</ReactMarkdown>
            </div>
        </div>
        <p><span className={styles.label}>UI: <button onClick={() => dispatch(addUI({name: `param${np.ui.data.length + 1}`, type: "text", language: "python", default: "", destination: "file", description: "", file: "main.py"}))}>+</button></span></p>

        {np.ui.data.map((v, i) => <NewInput input={v} id={i} key={i}/>)}
        <p><span className={styles.label}>Scenario:</span></p>

        <div className={styles.row}>
            <div className={styles.column}>
                {/*<StepsComponent steps={np.scenario} path={[]}/>*/}
                <StepComponent data={np.scenario} path={[]}/>
            </div>
            <div className={styles.column}>
                <pre>{JSON.stringify(np.scenario, null, 4)}</pre>
            </div>
        </div>


        <h1><button onClick={async () => {
            const res = await dispatch(postPage(np))
            // console.log(res)
            if (res.type !== "newPage/postPage/rejected") {
                dispatch(setNeedUpdate(true))
                alert("Страница была добавлена")
                navigate("/pages")
            } else  {
                console.error('add page error', res)
            }

        }}>Сохранить</button></h1>
    </div>
}

export function UpdatePage(props: {id: Number}) {
    return <div>Update</div>
}