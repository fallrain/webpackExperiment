import maincss from '@/assets/css/main.scss';
//import '@/assets/font/iconfont.css';
import React from 'react';
import ReactDom from 'react-dom';
import Grid from '@/assets/component/Grid';
import cssmodule from '@/assets/css/cssmodule.css';
class App extends React.Component {
  render() {
    return (
      <div className="c-red iconfont icon-rili">
        {process.envCfg.name}
        <img src={'/src/assets/img/plugin.png'} alt=""/>
        <div className={cssmodule.app}>
          <div className={maincss['bbqqq-cc']}>dasdas</div>
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
