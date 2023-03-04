import React from 'react';
import {Steps} from "../../../../app/interfaces";
import {StepComponent} from "./Step";
import {useAppDispatch} from "../../../../app/hooks";
import {addCMD} from "../../newprojectsSlice";
// path передается на каждый компонент чтобы при редактировании значений можно было знать какой элемент менять в redux
// для вложенного компонента  path будет примерно как [0, 2, 1]
export function StepsComponent(p: {steps: Steps, path: number[]}) {
    const dispatch = useAppDispatch();
    return <div>
        <p>Steps:</p>
        <ul>
            {p.steps.data.map((s, i) => <li><StepComponent path={[...p.path, i]} data={s}/></li>)}
            <li><button onClick={() => dispatch(addCMD({parent_path: p.path}))}>add</button></li>
        </ul>
    </div>
}