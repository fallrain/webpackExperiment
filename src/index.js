// import maincss from '@/assets/css/main.scss';
//import '@/assets/font/iconfont.cs1s';
import React from 'react';
import ReactDom from 'react-dom';
import Grid from '../gitcomon/component/Grid';

if (1) {
  import ('@/assets/css/cssmodule.css');
} else {
  import ('@/assets/css/main.scss');
}

class App extends React.Component {
  render() {
    return (
      <div className="c-red iconfont icon-rili">
        {process.envCfg.name}
        <img src={'/src/assets/img/plugin.png'} alt=""/>
        <div className={'app'}>
          <div className={'bbqqq-cc'}>dasdas</div>
          <div className={'bbqqq'}>aaaa</div>
        </div>
        <Grid/>
      </div>
    );
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
);
