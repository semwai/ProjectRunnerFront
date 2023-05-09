
export interface Input {
    name: string
    description: string
    type: "text" | "number" | "list" | "code" | "textarea" | "file"
    default: string
    destination: "param" | "env" | "file"
    file?: string
    env?: string
    language: string
    values?: { title: string, value: string }[]
}

export interface UI {
    data: Input[]
}

export interface Step {
    type: "Step" | "Run" | "File" | "Print" | "Steps"
}
export interface File extends Step{
    name: string
    data?: string
}

export interface Print extends Step{
    text: string
    file: "stdout" | "stderr"
}

export interface Run extends Step{
    command: string
    stdin: boolean
    stdout: boolean
    exitCode: boolean
    echo: boolean
}

export interface Steps extends Step{
    data: (Step | Steps | Run | File | Print)[]
}

export interface Page {
    id: number
    name: string
    container: string
    description: string
    short_description: string
    version: string
    visible: boolean
    ui: UI
    scenario: Steps
}

export interface TerminalString {
    text: string
    type: 'stdout' | 'stderr' | 'stdin' | 'ExitCode'
}

export interface TerminalData {
    value: TerminalString[]
}


export interface PageStorage {
    value: Page | null
    ws: WebSocket | null
    start: boolean // отправлен ли проект на сервер
    wait: boolean // ждем пока сервер установит и запустит проект
    status: string,
    defaultInput: {[key:string]:string} // значения ввода по умолчанию
}

export interface Pages {
    value: Page[]
    status: 'loading' | 'idle' | 'failed'
    need_update: boolean
}

export interface LoginData {
    auth: -1 | 0 | 1 // -1 еще не загрузилась информация о логине, 0 - не зашел, 1 - зашел
    mail: string
    name: string
    access: "user" | "admin"
    status: 'loading' | 'idle' | 'failed'
}
export interface Entry {
    id: number
    short_description: string
}

export interface Content {
    description: string
    data: (Entry | Content)[]
}

export interface Project {
    id: number
    name: string
    description: string
    public: boolean
    content: Content
}

export interface Projects {
    value: Project[]
    status: 'loading' | 'idle' | 'failed'
}
