// import maincss from '@/assets/css/main.scss';
//import '@/assets/font/iconfont.cs1s';
import React from 'react';
import ReactDom from 'react-dom';
import Grid from './component/Grid';
// const Grid = import(/* webpackChunkName:"rightschinagift" */'../gitcomon/component/Grid');
import Framer from '@/component/framer';
import Login from '@/view/login/login';
if (1) {
  import ('@/assets/css/cssmodule.css');
} else {
  import ('@/assets/css/main.scss');
}

class App extends React.Component {
  render() {
    return (
      <div className="c-red iconfont icon-rili">
        <Framer/>
        <Login/>
        <img src={'/src/assets/img/plugin.png'} alt=""/>
        <div className={'app'}>
          <div className={'bbqqq-cc'}>dasda1s</div>
          <div className={'bbqqq a'}>aaaa</div>
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
