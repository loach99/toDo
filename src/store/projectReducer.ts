import { CommentType, ProjectType, SubTask, TaskType } from "../types";

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('projectsState');
        if (serializedState) {
            return JSON.parse(serializedState);
        }
    } catch (e) {
        console.error('Could not load state from localStorage', e);
    }
    return undefined;
};

const saveStateToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('projectsState', serializedState);
    } catch (e) {
        console.error('Could not save state to localStorage', e);
    }
};

const initialState: { projects: ProjectType[], nameProject: string, filterData: string, description: string, name: string } = loadStateFromLocalStorage() || {
    projects: [],
    name: "",
    description: "",
    filterData: ""
};

const projectReducer = (state = initialState, action: any) => {
    let newState;

    switch (action.type) {
        case "ADD_PROJECT":
            if (action.payload.name === '') return { ...state }
            newState = {
                ...state,
                projects: [...state.projects.map((project: ProjectType) => project.id === action.payload.id ? { ...project, name: action.payload.name, description: action.payload.description, files: action.payload.files } : project), action.payload],
            };
            saveStateToLocalStorage(newState);
            return newState;

        case "ADD_TASK":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: [...(project.tasks || []), action.payload],
                        };
                    }
                    return project;
                })
            };
            saveStateToLocalStorage(newState);
            return newState;

        case "ADD_COMMENT":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.filter(Boolean).map((task: TaskType) => {
                                if (task.number === action.payload.taskNumber) {
                                    const newComment = {
                                        id: Date.now(),
                                        text: action.payload.text,
                                        files: action.payload.files,
                                        comments: [],
                                    };
                                    const addCommentRecursively = (comments: CommentType[], parentId: number | null): CommentType[] => {
                                        if (parentId === null) {
                                            return [...comments, newComment];
                                        }
                                        return comments.map(comment => {
                                            if (comment.id === parentId) {

                                                return {
                                                    ...comment,
                                                    comments: [...comment.comments, newComment]
                                                };
                                            } else {
                                                return {
                                                    ...comment,
                                                    comments: addCommentRecursively(comment.comments, parentId)
                                                };
                                            }
                                        });
                                    };
                                    return {
                                        ...task,
                                        comments: addCommentRecursively(task.comments, action.payload.parentCommentId)
                                    };
                                }
                                return task;
                            })
                        };
                    }
                    return project;
                }),
            };
            saveStateToLocalStorage(newState);  // Сохраняем новое состояние
            return newState;

        case "MOVE_TASK":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return { ...task, status: action.payload.newStatus }
                                }
                                return task
                            })
                        };
                    }
                    return project;
                }),
            };
            saveStateToLocalStorage(newState);
            return newState;
        case "START_TIMER":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return { ...task, timer: action.payload.timer }
                                }
                                return task
                            })
                        };
                    }
                    return project;
                })

            }
            return newState
        case "CHANGE_PRIORITY":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return { ...task, priority: action.payload.priority }
                                }
                                return task
                            })
                        };
                    }
                    return project
                }),
            };
            saveStateToLocalStorage(newState);  // Сохраняем новое состояние
            return newState;
        case "ADD_SUBTASK":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return { ...task, subtasks: [...(task.subtasks || []), action.payload.subtask] }
                                }
                                return task
                            }
                            )
                        };
                    }
                    return project
                }
                ),
            }
            saveStateToLocalStorage(newState);
            return newState
        case "MOVE_SUBTASK":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return {
                                        ...task,
                                        subtasks: task.subtasks.map((subtask: SubTask) =>
                                            subtask.number === action.payload.subTaskId
                                                ? { ...subtask, status: action.payload.newStatus }
                                                : subtask
                                        )
                                    };
                                }
                                return task;
                            })
                        };
                    }
                    return project;
                })

            };
            saveStateToLocalStorage(newState);
            return newState
        case "SET_FILTER":
            newState = { ...state, filterData: action.payload };
            return newState;
        case "FILTER_TASK":
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        const filterText = action.payload.value.toLowerCase();
                        return {
                            ...project,
                            tasks: project.tasks?.map((task: TaskType) => ({
                                ...task,
                                isFilteredOut:
                                    action.payload.value &&
                                    !(task.header.toLowerCase().includes(filterText) ||
                                        task.number.toString().includes(filterText))
                            }))
                        };
                    }
                    return project;
                })
            };
            saveStateToLocalStorage(newState);
            return newState;
        case "FILTER_PROJECT":
            const filterText = action.payload.toLowerCase();
            newState = {
                ...state,
                projects: state.projects.map((project: ProjectType) => {
                    return {
                        ...project,
                        isFilteredOut: action.payload &&
                            !(project.name.toLowerCase().includes(filterText))
                    }
                })
            }
            return newState
        case "EDIT_TASK":
            newState = {
                ...state,
                // eslint-disable-next-line array-callback-return
                projects: state.projects.map((project: ProjectType) => {
                    if (project.id === action.payload.projectId) {
                        return {
                            ...project,
                            tasks: project.tasks.map((task: TaskType) => {
                                if (task.number === action.payload.taskId) {
                                    return {
                                        ...task,
                                        header: action.payload.header,
                                        description: action.payload.description,
                                        endDate: action.payload.endDate

                                    }
                                }
                                return task
                            })
                        }
                    }
                })
            }
            saveStateToLocalStorage(newState);

            return newState
        case "GET_NAME_PROJECT":
            newState = { ...state, [action.payload.name]: action.payload.value };
            return newState;

        case "CLEAR_NAME_PROJECT":
            newState = { ...state, name: "", description: "" };
            return newState;

        default:
            return state;
    }
};

export default projectReducer;


export const addProject = (project: ProjectType) => ({
    type: "ADD_PROJECT",
    payload: project,
});
export const changeInput = (name: string, value: string) => ({
    type: "GET_NAME_PROJECT",
    payload: { name, value },
});
export const clearInput = () => ({
    type: "CLEAR_NAME_PROJECT",
});
export const addTask = (taskData: any) => ({
    type: "ADD_TASK",
    payload: taskData,
})
export const addSubTask = (taskId: any, subtask: any, projectId: number) => ({
    type: "ADD_SUBTASK",
    payload: { taskId, subtask, projectId },
})
export const addComment = (taskNumber: any, parentCommentId: any, text: any, projectId: number, files?: string[]) => ({
    type: "ADD_COMMENT",
    payload: { taskNumber, parentCommentId, text, projectId, files },
});
export const moveTask = (taskId: number, newStatus: string, projectId: number) => ({
    type: "MOVE_TASK",
    payload: { taskId, newStatus, projectId },
});
export const moveSubTask = (taskId: number, newStatus: string, projectId: number, subTaskId: number) => ({
    type: "MOVE_SUBTASK",
    payload: { taskId, newStatus, projectId, subTaskId }
})
export const setFilter = (filterData: string) => ({
    type: "SET_FILTER",
    payload: filterData
})
export const filterTask = (value: string | number, projectId: number) => ({
    type: "FILTER_TASK",
    payload: { value, projectId }
})
export const filterProject = (value: string) => ({
    type: "FILTER_PROJECT",
    payload: value
})
export const startTimer = (projectId: number, taskId: number, timer: number) => ({
    type: "START_TIMER",
    payload: { projectId, taskId, timer }
})
export const editTask = (projectId: number, taskId: number, header: string, description: string, endDate: string) => ({
    type: "EDIT_TASK",
    payload: { projectId, taskId, header, description, endDate }
})