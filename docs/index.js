var state = 'Hello world!';

function box(props) {
  return div({}, props.children);
}

function title(props) {
  return h1({
    style: 'color: ' + props.color,
    onClick: function (e) {
      alert('clicked!')
    }
  }, props.text);
}

// app :: state -> UI
function app(state) {
  return box({ children: [
    title({ color: 'tomato', text: state}),
    p({}, 'Render all the things!')
  ]});
}

renderToDOM(app(state), document.getElementById('app'));