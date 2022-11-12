import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import projectsReducer from '../features/projects/projectsSlice';
import projectReducer from '../features/project/projectSlice';
import terminalReducer from '../features/terminal/terminalSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    projects: projectsReducer,
    project: projectReducer,
    terminal: terminalReducer
  },
});

store.subscribe(() => {
  localStorage['store'] = JSON.stringify(store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
