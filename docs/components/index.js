var div = CUTREact.div;
var button = CUTREact.button;
var p = CUTREact.p;
var h1 = CUTREact.h1;

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