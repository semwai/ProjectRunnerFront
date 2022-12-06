import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {TerminalData, TerminalString} from "../../app/interfaces";

const initialState: TerminalData = {
    value: [],
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
