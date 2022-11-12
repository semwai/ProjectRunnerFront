import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface TerminalString {
    text: string
    type: 'stdout' | 'stderr' | 'stdin' | 'ExitCode'
}

export interface TerminalData {
    value: TerminalString[]
}

const initialState: TerminalData = {
    value: [
        /*{text: 'hello world, input value:', type: 'stdout'},
        {text: '123321\n', type: 'stdin'},
        {text: 'errorerrorerrorerrorerrorerror\n', type: 'stderr'},
        {text: 'Process finished with exit code 0\n', type: 'ExitCode'}*/
    ],
};


export const terminalSlice = createSlice({
    name: 'terminal',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        clear: (state) => {
            state.value = []
        },
        puts: (state, action: PayloadAction<TerminalString>) => {
            state.value = [...state.value, action.payload]
        }
    },

});

export const { clear, puts } = terminalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTerminal = (state: RootState) => state.terminal;


export default terminalSlice.reducer;
