import maincss from './assets/css/main.scss';
import './assets/font/iconfont.css';
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className="c-red iconfont icon-rili">
        哈哈哈哈或
      </div>
    );
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
);
