import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Content, Entry, Project} from "../../app/interfaces";


const initialState: Project = {
    id: 0,
    name: "новый проект",
    description: 'описание',
    public: false,
    content: {
        description: 'Глава 1',
        data: []
    }
};


export const newProjectSlice = createSlice({
    name: 'newProject',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setProjectName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setProjectDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        addPage: (state, action: PayloadAction<{path: number[], obj: Content | Entry}>) => {
            let root = state.content
            let path = [...action.payload.path]
            path.shift()

            while (path.length > 0) {
                // console.log(root.data)
                root = root.data[path[0]] as Content
                path.shift()

            }
            if (root.data) {
                root.data = [...root.data, action.payload.obj]
            } else {
                root.data = [action.payload.obj]
            }

        },
        setDescription: (state, action: PayloadAction<{path: number[], value: string}>) => {
            let root = state.content
            let path = [...action.payload.path]
            // ищем родительский элемент
            path.shift()
            while (path.length > 1) {
                root = root.data[path[0]] as Content
                path.shift()
            }
            const id = path[0]
            if (typeof id == 'undefined') {
                return
            }
            const e = root.data[id]
            if ('short_description' in e) {
                e.short_description = action.payload.value
            }
            if ('description' in e) {
                e.description = action.payload.value
            }
        }
    },
});


export const { setProjectName, setProjectDescription, addPage, setDescription} = newProjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewProject = (state: RootState) => state.newProject;


export default newProjectSlice.reducer;
