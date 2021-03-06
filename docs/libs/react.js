var CUTREact = {};

var d = tagName => (attrs, children) => {
  return {
    type: tagName,
    attrs: attrs,
    children: children
  };
};

CUTREact.h1 = d('h1');
CUTREact.p = d('p');
CUTREact.div = d('div');
CUTREact.button = d('button');

CUTREact.render = function (component, node) {
  var type = component.type;
  var attrs = component.attrs;
  var children = component.children;

  var domElement = document.createElement(type);

  Object.keys(attrs).forEach(key => {
    var value = attrs[key];

    if (key === 'onClick') {
      domElement.onclick = value;
    } else {
      domElement.setAttribute(key, value);
    }
  });

  // si children es de tipo string
  // asumimos que es un nodo de texto
  if (typeof children === 'string') {
    domElement.textContent = component.children;
  } else {
    // llamamos recursivamente renderToDOM
    // renderizando el el nodo padre
    children.map(child => CUTREact.render(child, domElement));
  }
  
  node.appendChild(domElement);
}