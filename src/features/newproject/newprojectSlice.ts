import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Content, Entry, Project} from "../../app/interfaces";
import {fetchAddProject} from "./newProjectApi";


const initialState: Project = {
    id: 0,
    name: "новый проект",
    description: 'описание',
    public: false,
    content: {
        description: '',
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
        setProjectPublic: (state, action: PayloadAction<boolean>) => {
            state.public = action.payload
        },
        addPage: (state, action: PayloadAction<{path: number[], obj: Content | Entry}>) => {
            let root = state.content
            let path = [...action.payload.path]

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
        removeItem: (state, action: PayloadAction<number[]>) => {
            let root = state.content
            let path = [...action.payload]
            while (path.length > 1) {
                root = root.data[path[0]] as Content
                path.shift()
            }
            root.data.splice(path[0], 1)
        },
        setContentDescription: (state, action: PayloadAction<{path: number[], value: string}>) => {
            let root = state.content
            let path = [...action.payload.path]
            // ищем родительский элемент
            while (path.length > 1) {
                root = root.data[path[0]] as Content
                path.shift()
            }
            const id = path[0]
            if (typeof id == 'undefined') {
                return
            }
            const e = root.data[id] as Content
            e.description = action.payload.value
        },
        setEntryDescription: (state, action: PayloadAction<{path: number[], value: Entry}>) => {
            let root = state.content
            let path = [...action.payload.path]
            console.log(action.payload.value)
            // ищем родительский элемент
            while (path.length > 1) {
                root = root.data[path[0]] as Content
                path.shift()
            }
            const id = path[0]
            if (typeof id == 'undefined') {
                return
            }
            const e = root.data[id] as Entry

            e.id = action.payload.value.id
            e.short_description = action.payload.value.short_description
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(postProject.pending, () => {
                console.log('loading post page')
            })
            .addCase(postProject.fulfilled, () => {
                console.log('idle post page')
            })
            .addCase(postProject.rejected, (state, msg) => {
                const err = JSON.parse(msg.error.message || "{}")
                const pretty_err = JSON.stringify(err, null, 2)
                alert(pretty_err)
            });
    }
});

export const postProject = createAsyncThunk(
    'newPage/postPage',
    async (project: Project) => {
        // The value we return becomes the `fulfilled` action payload
        return await fetchAddProject(project);
    }
);

export const { setProjectName, setProjectDescription, setProjectPublic, addPage, setContentDescription, setEntryDescription, removeItem} = newProjectSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNewProject = (state: RootState) => state.newProject;


export default newProjectSlice.reducer;
