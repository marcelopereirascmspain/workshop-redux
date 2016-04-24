var CUTREdux = {};

CUTREdux.createStore = function (reducer) {
  var state;
  var listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(l => l());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  dispatch({ type: '@@INIT' });

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}