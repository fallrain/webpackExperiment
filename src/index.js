import maincss from './assets/css/main.scss'
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className="c-red">
        hello word
      </div>
    );
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
);
