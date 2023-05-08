import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import pagesReducer, {getPages} from '../features/pages/pagesSlice';
import pageReducer, {setWait} from '../features/page/pageSlice';
import terminalReducer, {clear, puts} from '../features/terminal/terminalSlice';
import loginReducer from '../features/login/loginSlice';
import newPageReducer from '../features/newpage/newpageSlice';
import projectsReducer from '../features/projects/projectsSlice';
import newProjectReducer from '../features/newproject/newprojectSlice';

let ws: WebSocket | null = null

export const store = configureStore({
    reducer: {
        pages: pagesReducer,
        page: pageReducer,
        terminal: terminalReducer,
        login: loginReducer,
        newPage: newPageReducer,
        projects: projectsReducer,
        newProject: newProjectReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

store.subscribe(() => {
    const state = store.getState()
    if (ws !== store.getState().page.ws) {
        ws = store.getState().page.ws
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

    if (state.pages.need_update) {
        store.dispatch(getPages())
    }
    //localStorage['store'] = JSON.stringify(store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
