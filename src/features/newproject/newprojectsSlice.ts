import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Input, Project} from "../../app/interfaces";


const initialState: Project = {
    visible: false,
    description: "",
    id: 0,
    name: "",
    short_description: "",
    ui: {data: [{name: "123", type: "code", language: "go", default: "", destination: "file", description: "", values: [{title: 'title 1', value: '1'}]}]},
    version: ""
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
        }
    },
});

export const { setName, setDescription, setShortDescription, setVersion, addUI, removeUI, updateUI } = newProjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewProject = (state: RootState) => state.newProject;


export default newProjectSlice.reducer;