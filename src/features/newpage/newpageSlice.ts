import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {File, Input, Page, Print, Run, Step, Steps} from "../../app/interfaces";


const initialState: Page = {
    visible: false,
    description: "",
    id: 0,
    name: "",
    short_description: "",
    ui: {data: [{name: "123", type: "code", language: "go", default: "", destination: "file", description: "", values: [{title: 'title 1', value: '1'}]}]},
    version: "",
    scenario: {
        type: "Steps",
        data: [{
            type: "Run",
            command: "python main.py",
            stdin: true,
            stdout: true,
            echo: false,
            exitCode: true
        },{
            type: "Print",
            text: "Hello world"
        },{
            type: "Steps",
            data: [{
                type: "Run",
                command: "python main.py",
                stdin: true,
                stdout: true,
                echo: false,
                exitCode: true
            },{
                type: "Print",
                text: "Hello world"
            }]
        }]
    }
};


export const newProjectSlice = createSlice({
    name: 'newProject',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setShortDescription: (state, action: PayloadAction<string>) => {
            state.short_description = action.payload
        },
        setVersion: (state, action: PayloadAction<string>) => {
            state.version = action.payload
        },
        addUI: (state, action: PayloadAction<Input>) => {
            state.ui.data = [...state.ui.data, action.payload]
        },
        removeUI: (state, action: PayloadAction<string>) => {
            // удалить по имени
            state.ui.data = state.ui.data.filter(e => e.name !== action.payload)
        },
        updateUI: (state, action: PayloadAction<{new: Input, id: number }>) => {
            // удалить по имени
            state.ui.data[action.payload.id] = action.payload.new
        },
        addCMD: (state, action: PayloadAction<{parent_path: number[]}>) => {
            let root = state.scenario
            let path = [...action.payload.parent_path]
            while (path.length > 0) {
                root = root.data[path[0]] as Steps
                path.shift()
                // console.log(p)
            }
            root.data = [...root.data, {type: "Print", text: "Hello"}]
        },
        updateCMD: (state, action: PayloadAction<{path: number[], cmd: Step | File | Steps | Run | Print}>) => {
            let root = state.scenario
            let path = [...action.payload.path]
            // ищем родительский элемент
            while (path.length > 1) {
                root = root.data[path[0]] as Steps
                path.shift()
            }
            const id = path[0]
            root.data[id] = action.payload.cmd
            //root.data = [...root.data, action.payload.cmd]
        }
    },
});

export const { setName, setDescription, setShortDescription, setVersion, addUI, removeUI, updateUI, addCMD, updateCMD } = newProjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewProject = (state: RootState) => state.newPage;


export default newProjectSlice.reducer;