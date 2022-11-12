import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import projectsReducer from '../features/projects/projectsSlice';
import projectReducer from '../features/project/projectSlice';
import terminalReducer, {clear, puts} from '../features/terminal/terminalSlice';

let ws: WebSocket | null = null

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        projects: projectsReducer,
        project: projectReducer,
        terminal: terminalReducer
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
        store.dispatch(clear())
        ws.onmessage = (event) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            //onst dispatch = useAppDispatch();
            let msg = JSON.parse(event.data)
            console.log(msg)
            if (msg.wait === true) {
                console.log('wait')
            }
            if (msg.wait === false) {
                console.log('!wait')
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
