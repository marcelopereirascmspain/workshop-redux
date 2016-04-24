var state = 'Hello world!';

function h1(children) {
  return {
    type: 'h1',
    children: children
  };
}

function p(children) {
  return {
    type: 'p',
    children: children
  };
}

function div(children) {
  return {
    type: 'div',
    children: children
  };
}

// app :: state -> UI
function app(state) {
  return div([
    h1(state),
    p('Render all the things!')
  ]);
}

function renderToDOM(component, node) {
  var type = component.type;
  var children = component.children;

  var domElement = document.createElement(type);

  // si children es de tipo string
  // asumimos que es un nodo de texto
  if (typeof children === 'string') {
    domElement.textContent = component.children;
  } else {
    // llamamos recursivamente renderToDOM
    // renderizando el el nodo padre
    children.map(child => renderToDOM(child, domElement));
  }
  
  node.appendChild(domElement);
}

renderToDOM(app(state), document.getElementById('app'));