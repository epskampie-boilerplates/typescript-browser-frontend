// scss
import '../css/index.scss';

console.log('Hello from typescript!');

var h1 = document.createElement('h1');
h1.innerText = 'Hello from typescript!';
document.body.appendChild(h1);

// React example
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// // IE11 polyfills
// import 'es6-shim';
// import 'dom4';
// import 'whatwg-fetch';

type Props = { name: string };

type State = {};

class AppView extends React.Component<Props, State> {
  render() {
    return (
      <h1>
        Hello {this.props.name}!
        <img src="/img/edit.svg" alt="edit img" />
      </h1>
    );
  }
}

ReactDOM.render(
  <AppView name="Simon" />,
  document.getElementById('react-root')
);
