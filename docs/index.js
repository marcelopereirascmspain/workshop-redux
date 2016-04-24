var state = 'Hello world!';

var d = tagName => (attrs, children) => {
  return {
    type: tagName,
    attrs: attrs,
    children: children
  };
};

var h1 = d('h1');
var p = d('p');
var div = d('div');

// app :: state -> UI
function app(state) {
  return box({ children: [
    title({ color: 'tomato', text: state}),
    p({}, 'Render all the things!')
  ]});
}

function box(props) {
  return div({}, props.children);
}

function title(props) {
  return h1({ style: 'color: ' + props.color}, props.text);
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