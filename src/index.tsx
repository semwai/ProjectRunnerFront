import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {getProjects} from "./features/projects/projectsSlice";

import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";
loader.config({ monaco });


window.MonacoEnvironment = {
    getWorker(moduleId, label) {
        console.log(moduleId, label)
        switch (label) {
            case 'css':
            case 'less':
            case 'scss':
                return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url));
            case 'editorWorkerService':
                return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
            case 'handlebars':
            case 'html':
            case 'razor':
                return new Worker(new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url));
            case 'json':
                return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url));
            case 'javascript':
            case 'typescript':
                return new Worker(new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url));
            //case 'yaml':
            //    return new Worker(new URL('monaco-yaml/lib/esm/yaml.worker', import.meta.url));
            default:
                throw new Error(`Unknown label ${label}`);
        }
    },
};


const container = document.getElementById('root')!;
const root = createRoot(container);

store.dispatch(getProjects())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
