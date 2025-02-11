import { ModalsReducerState } from "../types";

const initialState: ModalsReducerState = {
    projectModal: false,
    taskModal: false,
    taskWindow: false,
    subTaskModal: false,
    editTaskModal: false,
    showFileModal: false
};

const modalsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "OPEN_PROJECT_MODAL":
            return { ...state, projectModal: true }
        case "CLOSE_PROJECT_MODAL":
            return { ...state, projectModal: false }
        case "OPEN_TASK_MODAL":
            return { ...state, taskModal: true }
        case "CLOSE_TASK_MODAL":
            return { ...state, taskModal: false }
        case "OPEN_TASK_WINDOW":
            return { ...state, taskWindow: true }
        case "CLOSE_TASK_WINDOW":
            return { ...state, taskWindow: false }
        case "OPEN_EDIT_MODAL":
            return { ...state, editTaskModal: true }
        case "CLOSE_EDIT_MODAL":
            return { ...state, editTaskModal: false }
        case "OPEN_SUBTASK_MODAL":
            return { ...state, subTaskModal: true }
        case "CLOSE_SUBTASK_MODAL":
            return { ...state, subTaskModal: false }
        case "OPEN_FILE_MODAL":
            return { ...state, showFileModal: true }
        case "CLOSE_FILE_MODAL":
            return { ...state, showFileModal: false }
        default:
            return state;
    }
};

export const openProjectModal = (value: boolean) => ({
    type: "OPEN_PROJECT_MODAL",
    projectModal: value,
});
export const closeProjectModal = () => ({
    type: "CLOSE_PROJECT_MODAL",
    projectModal: false,
});
export const openTaskModal = (value: boolean) => ({
    type: "OPEN_TASK_MODAL",
    taskModal: value,
});
export const closeTaskModal = () => ({
    type: "CLOSE_TASK_MODAL",
    taskModal: false,
});
export const openTaskWindow = (value: boolean) => ({
    type: "OPEN_TASK_WINDOW",
    taskWindow: value,
})
export const closeTaskWindow = () => ({
    type: "CLOSE_TASK_WINDOW",
    taskWindow: false,
})
export const openSubtaskModal = (value: boolean) => ({
    type: "OPEN_SUBTASK_MODAL",
    subtaskModal: value,
})
export const closeSubtaskModal = () => ({
    type: "CLOSE_SUBTASK_MODAL",
    subtaskModal: false,
})
export const openEditModal = (value: boolean) => ({
    type: "OPEN_EDIT_MODAL",
    editTaskModal: value,
})
export const closeEditModal = () => ({
    type: "CLOSE_EDIT_MODAL",
    editTaskModal: false,
})
export const openFileModal = (value: boolean) => ({
    type: "OPEN_FILE_MODAL",
    showFileModal: value,
})
export const closeFileModal = () => ({
    type: "CLOSE_FILE_MODAL",
    showFileModal: false,
})
export default modalsReducer;