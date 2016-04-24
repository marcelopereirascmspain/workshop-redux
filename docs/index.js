var state = 'Hello world!';

function h1(text) {
  return {
    type: 'h1',
    text: text
  };
}

// app :: state -> UI
function app(state) {
  return h1(state);
}

function renderToDOM(component, node) {
  var domElement = document.createElement(component.type);
  domElement.textContent = component.text;
  node.appendChild(domElement);
}

renderToDOM(app(state), document.getElementById('app'));