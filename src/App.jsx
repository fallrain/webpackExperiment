import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { setUserInfo } from '@/store/action';
import { axPost } from './axios';
import Util from '@/util';
import Login from '@/view/login/login';
import Framer from '@/store/containers/Framer';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { history, location } = this.props;
    this.history = history;
    this.location = location;
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    // 有token就通过token登录
    const token = Util.getUrlVal('hyzx');
    if (token) {
      const hadToken = await axPost('auth/loginByAccessToken', null, {
        token
      });
      if (hadToken) {
        this.getUserInfo();
      }
    } else {
      this.getUserInfo();
    }
  };

  getUserInfo = async () => {
    // 获取用户信息、包括权限等
    const data = await axPost('auth/selfInformation');
    if (data) {
      const {
        dispatch
      } = this.props;
      const userInfo = {
        user: data.user,
        menuList: data.menuList,
        // menuList: menu,
        oprKeyList: data.oprKey
      };

      dispatch(setUserInfo(userInfo));

      // 设置当前品牌
      /* $.cookie('vipCenterCurrentBrandName', data.user.brandName, {
        domain: Vue.prototype.domain,
        path: '/'
      }); */

      this.history.push('/home');
    } else {
      // window.location.href = Vue.prototype.loginUrl;
      this.history.push('/login');
    }
  };

  toLogin = () => {

  };

  render() {
    return (
      <div className="c-red iconfont icon-rili">
        {/* <Route path="/*" component={Login} exact /> */}
        <Route path="/login" component={Login} />
        <Route path="/home" component={Framer} />
      </div>
    );
  }
}

export default withRouter(App);
