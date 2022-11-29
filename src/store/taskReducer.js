import { taskUpdated, taskDeleted } from './actionTypes';

export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state];
      const elIndex = newArray.findIndex((el) => el.id === action.payload.id);
      newArray[elIndex] = { ...newArray[elIndex], ...action.payload };
      return newArray;
    }
    case taskDeleted: {
      const newArray = [...state];
      return newArray.filter((el) => el.id !== action.payload.id);
    }
    default:
      return state;
  }
}
