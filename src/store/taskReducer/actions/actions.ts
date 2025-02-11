export const setTaskData = (name: string, value: string) => ({
  type: 'SET_TASK_DATA',
  payload: { name, value }
});

export const resetTaskData = () => ({
  type: 'RESET_TASK_DATA'
});
export const taskWindow = (taskWindow: any) => ({
  type: 'TASK_WINDOW',
  payload: taskWindow
});
export const setSubtaskData = (name: string, value: string) => ({
  type: 'SET_SUBTASK_DATA',
  payload: { name, value }
});
