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