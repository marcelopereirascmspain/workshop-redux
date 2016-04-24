var store = CUTREdux.createStore(reducer);

var root = document.getElementById('app');

store.subscribe(function () {
  root.innerHTML = '';
  var state = store.getState();
  CUTREact.render(app({ state: state, dispatch: store.dispatch }), root);
});

store.dispatch({ type: 'INIT' });
