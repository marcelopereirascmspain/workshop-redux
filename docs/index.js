var appState = 'Hello world!';

function box(props) {
  return div({}, props.children);
}

function title(props) {
  return h1({
    style: 'color: ' + props.color,
    onClick: function (e) {
      console.log('Mutation from title!');
      appState = 'GoodBye world!';
    }
  }, props.text);
}

// app :: state -> UI
function app(state) {
  return box({ children: [
    title({ color: 'tomato', text: state}),
    p({}, 'Render all the things!'),
    button({ onClick: function (e) {
      console.log('Mutation from button!')
      appState = 'GoodBye world!'
    }}, 'say goodbye')
  ]});
}

var root = document.getElementById('app');

// render loop
setInterval(function () {
  // clear all
  root.innerHTML = '';
  // rerender all
  renderToDOM(app(appState), root);
}, 200);
