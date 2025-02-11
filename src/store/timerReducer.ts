/* eslint-disable @typescript-eslint/default-param-last */
import moment from 'moment';

const initialState = {
  startTime: null,
  elapsedTime: '00:00:00',
  isRunning: false
};

const timerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        ...state,
        startTime: moment(),
        isRunning: true
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        elapsedTime: action.payload
      };
    case 'STOP_TIMER':
      return {
        ...state,
        isRunning: false
      };
    default:
      return state;
  }
};

export const startTimer = () => ({ type: 'START_TIMER' });
export const updateTimer = (time: string) => ({
  type: 'UPDATE_TIMER',
  payload: time
});
export const stopTimer = () => ({ type: 'STOP_TIMER' });
export default timerReducer;
