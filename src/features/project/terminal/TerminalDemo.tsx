import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import {useEffect} from "react";
import styles from './Terminal.module.css'
import './Terminal.module.css'

export const TerminalDemo = () => {

    const commandHandler = (text: string) => {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        }
        else {
            TerminalService.emit('clear');
        }
    }

    useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        }
    }, []);

    return (
        <div className={styles.terminalDemo}>
            <div className={styles.card} >
                <Terminal welcomeMessage="Welcome to CodeRunner" prompt="$" />
            </div>
        </div>
    );
}