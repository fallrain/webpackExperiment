import maincss from './assets/css/main.scss';
import './assets/font/iconfont.css';
import React from 'react';
import ReactDom from 'react-dom';
import Grid from './assets/component/Grid'

class App extends React.Component {
  render() {
    return (
      <div className="c-red iconfont icon-rili">
        {process.envCfg.name}
        <Grid/>
      </div>
    );
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
);
