

export interface Project {
    id: number, name: string, description: string, lang: string, example: string, ui: object[]
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
    ui: object[]
}

export interface Projects {
    value: TinyProject[]
    status: string
}
