import moment from 'moment';

export const addProject = (project: any) => ({
  type: 'ADD_PROJECT',
  payload: project
});
export const deleteProject = (projectId: number) => ({
  type: 'DELETE_PROJECT',
  payload: projectId
});
export const changeInput = (name: string, value: string) => ({
  type: 'GET_NAME_PROJECT',
  payload: { name, value }
});
export const clearInput = () => ({
  type: 'CLEAR_NAME_PROJECT'
});
export const addTask = (taskData: any) => ({
  type: 'ADD_TASK',
  payload: taskData
});
export const deleteTask = (taskId: number, projectId: number) => ({
  type: 'DELETE_TASK',
  payload: { taskId, projectId }
});
export const addSubTask = (taskId: any, subtask: any, projectId: number) => ({
  type: 'ADD_SUBTASK',
  payload: { taskId, subtask, projectId }
});
export const addComment = (taskNumber: any, parentCommentId: any, text: any, projectId: number, files?: string[]) => ({
  type: 'ADD_COMMENT',
  payload: { taskNumber, parentCommentId, text, projectId, files }
});
export const moveTask = (taskId: number, newStatus: string, projectId: number) => ({
  type: 'MOVE_TASK',
  payload: { taskId, newStatus, projectId }
});
export const moveSubTask = (taskId: number, newStatus: string, projectId: number, subTaskId: number) => ({
  type: 'MOVE_SUBTASK',
  payload: { taskId, newStatus, projectId, subTaskId }
});
export const setFilter = (filterData: string) => ({
  type: 'SET_FILTER',
  payload: filterData
});
export const filterTask = (value: string | number, projectId: number) => ({
  type: 'FILTER_TASK',
  payload: { value, projectId }
});
export const filterProject = (value: string) => ({
  type: 'FILTER_PROJECT',
  payload: value
});
export const startTimerReq = (projectId: number, taskId: number, startTime: number) => ({
  type: 'START_TIMER',
  payload: { projectId, taskId, startTime }
});
export const stopTimer = (projectId: number, taskId: number) => ({
  type: 'STOP_TIMER',
  payload: { projectId, taskId }
});
export const editTask = (projectId: number, taskId: number, header: string, description: string, endDate: string) => ({
  type: 'EDIT_TASK',
  payload: { projectId, taskId, header, description, endDate }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let interval: any;
export const startTimer = (projectId: number, taskId: number) => {
  return async (dispatch: any) => {
    const startTime = moment().valueOf();
    interval = setInterval(() => {
      dispatch(startTimerReq(projectId, taskId, startTime));
    }, 1000);
  };
};
export const stopTimerAction = (projectId: number, taskId: number) => {
  return async (dispatch: any) => {
    clearInterval(interval);
    dispatch(stopTimer(projectId, taskId));
  };
};
