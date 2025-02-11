export const loadStateFromLocalStorage = () => {
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

export const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('projectsState', serializedState);
  } catch (e) {
    console.error('Could not save state to localStorage', e);
  }
};
