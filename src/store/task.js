import { createAction, createSlice } from '@reduxjs/toolkit';
import todosService from '../services/todos.service';
import { setError } from './errors';

const initialState = { entities: [], isLoading: true };

// const update = createAction('task/updated');
// const remove = createAction('task/removed');

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      // return action.payload;
    },
    update(state, action) {
      const elIndex = state.entities.findIndex((el) => el.id === action.payload.id);
      state.entities[elIndex] = { ...state.entities[elIndex], ...action.payload };
    },
    remove(state, action) {
      state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed, add } = actions;

// const taskRequested = createAction('task/requested');
// const taskRequestFailed = createAction('task/requestFailed');

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

export const addTask = (payload) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.addTask(payload);
    dispatch(add(data));
    console.log(data);
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export default taskReducer;
