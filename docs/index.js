var state = 'Hello world!';

// app :: state -> UI
function app(state) {
  return state;
}

function renderToDOM(text, node) {
  node.textContent = text;
}

renderToDOM(app(state), document.getElementById('app'));