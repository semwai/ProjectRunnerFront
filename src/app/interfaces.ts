
export interface Input {
    name: string,
    description: string,
    type: "text" | "number" | "list" | "code" | "textarea"
    default: string,
    destination: "param" | "env" | "file"
    file: string
    env: string
    language: string
    values: { title: string, value: string }[]
}

export interface UI {
    data: Input[]
}

export interface Project {
    id: number, name: string, description: string, lang: string, ui: UI
}

export interface TinyProject {
    // краткая информация о проекте
    id: number, name: string, description: string
}

export interface TerminalString {
    text: string
    type: 'stdout' | 'stderr' | 'stdin' | 'ExitCode'
}

export interface TerminalData {
    value: TerminalString[]
}


export interface ProjectStorage {
    value: Project | null
    ws: WebSocket | null
    start: boolean // отправлен ли проект на сервер
    wait: boolean // ждем пока сервер установит и запустит проект
    status: string,
    defaultInput: {[key:string]:string} // значения ввода по умолчанию
}

export interface Projects {
    value: TinyProject[]
    status: string
}
