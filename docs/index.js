var createStore = function (reducer) {
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

var store = createStore(reducer);

function box(props) {
  return div({}, props.children);
}

function title(props) {
  return h1({
    style: 'color: ' + props.color,
    onClick: props.onClick
  }, props.text);
}

var CHANGE_TEXT = 'CHANGE_TEXT';

function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  };
}

function reducer(state = '', action) {
  switch (action.type) {
    case CHANGE_TEXT:
      return action.payload;
    default:
      return state;
  }
}

// app :: state -> UI
function app(props) {

  return box({ children: [
    title({
      color: 'tomato',
      text: props.state,
      onClick: function (e) {
        props.dispatch(changeText('Hello world!'));
      }
    }),
    p({ onClick: function (e) {
      props.dispatch(changeText('Meh...'));
    }}, 'Render all the things!'),
    button({ onClick: function (e) {
      props.dispatch(changeText('GoodBye world!'))
    }}, 'say goodbye')
  ]});
}

var root = document.getElementById('app');

store.subscribe(function () {
  root.innerHTML = '';
  var state = store.getState();
  console.log(store);
  renderToDOM(app({ state: state, dispatch: store.dispatch }), root);
});

store.dispatch({ type: 'INIT' });

