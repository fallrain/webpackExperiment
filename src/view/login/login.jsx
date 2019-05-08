import React from 'react';
import {axPost} from 'ax';
import {Button, Input, Row,} from 'antd';
import loginCss from '@/assets/css/login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowMargin: 10
    };
  }

  login() {
    let self = this

    // 模拟登录
    axPost({
      url: self.apiUrl + 'vipcenter/auth/login',
      params: {
        userName: self.userInfo.userName,
        passWord: self.userInfo.password
      }
    }).then(function (data) {
      if (data.data.isSuccess) {
        // 隐藏loading页面

        self.$router.push({
          path: '/home',
          query: {
            hyzx: data.data.data.split('hyzx=')[1]
          }
        })
        $('#dom-loading').show()
        window.location.reload();
      }
    }, function (error) {
      console.log(error)
    })
  }

  render() {
    const {state} = this;
    return (
      <div className={loginCss.main}>
        <Row className={loginCss['login-item']}>
          <Input
            addonBefore="账户名"
            placeholder="请输入账户名"
            value={state.userName}
          />
        </Row>
        <Row className={loginCss['login-item']}>
          <Input
            addonBefore="密码"
            placeholder="请输入密码"
            value={state.password}
          />
        </Row>
        <Row className={loginCss['login-item']}>
          <Button
            type="primary"
            block
          >登录
          </Button>
        </Row>
      </div>
    );
  }
}
