import React from 'react';
import ReactMarkdown from "react-markdown";
import styles from './NewPage.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    addUI,
    postPage,
    selectNewPage,
    setContainer,
    setDescription,
    setName,
    setShortDescription,
    setVersion
} from "./newpageSlice";
import {NewInput} from "./Components/NewInput";
import {StepComponent} from "./Components/Steps/Step";
import {useNavigate} from "react-router-dom";


export function NewPage() {
    const dispatch = useAppDispatch();
    const np = useAppSelector(selectNewPage);
    const navigate = useNavigate();

    return <div>
        {np.id === 0?<h1>Новая страница</h1>:<h1>Редактирование страницы #{np.id}</h1>}
        <p><span className={styles.label}>название</span><input placeholder='name' value={np.name} onChange={e => dispatch(setName(e.target.value))}/></p>
        <p><span className={styles.label}>версия</span><input placeholder='version' value={np.version} onChange={e => dispatch(setVersion(e.target.value))}/></p>
        <p><span className={styles.label}>Docker image</span><input placeholder='container' value={np.container} onChange={e => dispatch(setContainer(e.target.value))}/></p>
        <p><span className={styles.label}>краткое описание</span><input placeholder='short_description' value={np.short_description} onChange={e => dispatch(setShortDescription(e.target.value))}/></p>
        <p><span className={styles.label}>описание (markdown):</span></p>
        <div className={styles.row}>
            <div className={styles.column}>
                <textarea value={np.description} placeholder='description' onChange={e => dispatch(setDescription(e.target.value))}/>
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
                //dispatch(setNeedUpdate(true))
                alert(np.id === 0?"Страница была добавлена":"Страница была обновлена")
                navigate("/pages")
            } else  {
                console.error('add page error', res)
            }

        }}>Сохранить</button></h1>
    </div>
}