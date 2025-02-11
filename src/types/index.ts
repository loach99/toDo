export type Priority = 'easy' | 'normal' | 'hard'
export type Status = 'queue' | 'development' | 'done'
export type Comments ={
    id: number
    text: string
    files: string[]
    comments: Comments[]
}
export interface ITask {
    number: number
    header: string
    description: string
    date: string
    timeAtWork: string
    endDate: string
    priority: Priority
    status: Status,
    comments: Comments[]
}
// Тип для комментариев с возможностью вложенности
export type CommentType = {
    id: number;
    text: string;
    comments: CommentType[];
};

// Тип для задачи (task)
export type TaskType = {
    isFilteredOut?: boolean
    projectId: number;
    number: number;
    header: string;
    description: string;
    date: string;
    endDate: string;
    priority: Priority;
    status: Status;
    subtasks: SubTask[];
    comments: CommentType[];
};
export type SubTask = Omit<TaskType, 'projectId' | 'comments' | 'subtasks'>
// Тип для проекта (project)
export type ProjectType = {
    id: number;
    name: string;
    description: string;
    dateCreate: string;
    files: string;
    tasks: TaskType[];
};

// Редьюсер комментариев
export type CommentsReducerState = {
    tasks: TaskType[];
};

// Редьюсер проектов
export type ProjectReducerState = {
    projects: ProjectType[];
    nameProject: string;
};

// Редьюсер модальных окон
export type ModalsReducerState = {
    projectModal: boolean;
    taskModal: boolean;
    taskWindow: boolean;
    subTaskModal: boolean;
    editTaskModal: boolean;
    showFileModal: boolean
};

// Редьюсер задач
export type TaskReducerState = {
    tasks: TaskType[] | TaskType;
    taskWindow: TaskType;
    header: string;
    description: string;
    date: string;
    endDate: string;
    priority: Priority;
    status: Status;
    number: number;
};

// Общий state приложения
// export type RootState = {
//     commentsReducer: CommentsReducerState;
//     projectReducer: ProjectReducerState;
//     modalsReducer: ModalsReducerState;
//     taskReducer: TaskReducerState;
// };