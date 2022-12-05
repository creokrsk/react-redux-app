export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // console.log(store);
      // console.log(next);
      if (typeof action === 'function') {
        console.log('functions');
        action(dispatch, getState);
      } else {
        return next(action);
      }
      // console.log(typeof action);
    };
  };
}
