import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import projectReducer, {setWait} from '../features/project/projectSlice';
import terminalReducer, {clear, puts} from '../features/terminal/terminalSlice';
import loginReducer from '../features/login/loginSlice';
let ws: WebSocket | null = null

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        project: projectReducer,
        terminal: terminalReducer,
        login: loginReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

store.subscribe(() => {
    if (ws !== store.getState().project.ws) {
        ws = store.getState().project.ws
        if (ws == null) {
            return
        }
        if (store.getState().terminal.value.length > 0)
            store.dispatch(clear())
        ws.onmessage = (event) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            //onst dispatch = useAppDispatch();
            let msg = JSON.parse(event.data)
            if (msg.wait === true) {
                store.dispatch(setWait(true))
            }
            if (msg.wait === false) {
                store.dispatch(setWait(false))
            }
            if (msg.stdout) {
                store.dispatch(puts({type:'stdout', text:msg.stdout}))
            }
            if (msg.stderr) {
                store.dispatch(puts({type:'stderr', text:msg.stderr}))
            }
            if (msg.ExitCode) {
                store.dispatch(puts({type:'ExitCode', text:msg.ExitCode}))
            }
        }
    }
    //localStorage['store'] = JSON.stringify(store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
