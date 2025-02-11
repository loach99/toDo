const initialState: any = {
    tasks: [

    ],
    taskWindow: {
        
    },
    header: "",
    description: "",
    date: "",
    endDate: "",
    priority: "easy",
    status: "queue",
    number: 0
};

const taskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "TASK_WINDOW":
            return { ...state, taskWindow: action.payload };
        case "SET_TASK_DATA":
            return { ...state, [action.payload.name]: action.payload.value };
        case "SET_SUBTASK_DATA":
            return { ...state, [action.payload.name]: action.payload.value };
        case "RESET_TASK_DATA":
            return {
                ...state,
                header: "",
                description: "",
                date: "",
                endDate: "",
                priority: "easy",
                status: "queue",
                number: 0
            };
        default:
            return state;
    }
}
export const setTaskData = (name: string, value: string) => ({
    type: "SET_TASK_DATA",
    payload: { name, value },
});

export const resetTaskData = () => ({
    type: "RESET_TASK_DATA",
});
export const taskWindow = (taskWindow: any) => ({
    type: "TASK_WINDOW",
    payload: taskWindow,
})
export const setSubtaskData = (name: string, value: string) => ({
    type: "SET_SUBTASK_DATA",
    payload: { name, value },
})
export default taskReducer;