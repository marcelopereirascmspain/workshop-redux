var Model = function (state) {
  this.listeners = [];
  this.state = state;
};

Model.prototype.getState = function () {
  return this.state;
};

Model.prototype.onChange = function (listener) {
  this.listeners.push(listener);
};

Model.prototype.set = function (value) {
  this.state = value;
  this.listeners.forEach(l => l());
};

var appStateLive = new Model('');

function box(props) {
  return div({}, props.children);
}

function title(props) {
  return h1({
    style: 'color: ' + props.color,
    onClick: props.onClick
  }, props.text);
}

// app :: state -> UI
function app(state) {

  function changeText(text) {
    appStateLive.set(text);
  }

  return box({ children: [
    title({ color: 'tomato', text: state, onClick: function (e) {
      changeText('Hello world!');
    }}),
    p({ onClick: function (e) {
      changeText('Meh...');
    }}, 'Render all the things!'),
    button({ onClick: function (e) {
      changeText('GoodBye world!')
    }}, 'say goodbye')
  ]});
}

var root = document.getElementById('app');

renderToDOM(app(appStateLive.getState()), root);

appStateLive.onChange(function () {
  root.innerHTML = '';
  var state = appStateLive.getState();
  renderToDOM(app(state), root);
});

