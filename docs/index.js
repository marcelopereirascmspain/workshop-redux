var state = 'Hello world!';

function h1(attrs, children) {
  return {
    type: 'h1',
    attrs: attrs,
    children: children
  };
}

function p(attrs, children) {
  return {
    type: 'p',
    attrs: attrs,
    children: children
  };
}

function div(attrs, children) {
  return {
    type: 'div',
    attrs: attrs,
    children: children
  };
}

// app :: state -> UI
function app(state) {
  return div({}, [
    h1({style: 'color:green'}, state),
    p({}, 'Render all the things!')
  ]);
}

function renderToDOM(component, node) {
  var type = component.type;
  var attrs = component.attrs;
  var children = component.children;

  var domElement = document.createElement(type);
  
  Object.keys(attrs).forEach(key => {
    var value = attrs[key];
    domElement.setAttribute(key, value);
  });

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