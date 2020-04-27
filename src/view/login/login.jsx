import React from 'react';
import { withRouter } from 'react-router-dom';
import { axPost } from 'ax';
import { Button, Input, Row, } from 'antd';
import loginCss from '@/assets/css/login';

const Login = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowMargin: 10,
      userName: 'A0020407',
      password: '141736'
    };
  }

  login = () => {
    // 模拟登录
    const { state, props } = this;
    axPost(
      'auth/login',
      null,
      {
        userName: state.userName,
        passWord: state.password
      }
    ).then((data) => {
      if (data) {
        props.history.push({
          pathname: '/home',
          state: {
            hyzx: data.split('hyzx=')[1]
          },
          search: `?hyzx=${data.split('hyzx=')[1]}`
        });
        window.location.reload();
      }
    });
  };

  valChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    const { state, valChange, login } = this;
    return (
      <div className={loginCss.main}>
        <Row className={loginCss['login-item']}>
          <Input
            name="userName"
            addonBefore="账户名"
            placeholder="请输入账户名"
            value={state.userName}
            onChange={valChange}
          />
        </Row>
        <Row className={loginCss['login-item']}>
          <Input
            name="password"
            addonBefore="密码"
            placeholder="请输入密码"
            value={state.password}
            onChange={valChange}
          />
        </Row>
        <Row className={loginCss['login-item']}>
          <Button
            type="primary"
            block
            onClick={login}
          >登录
          </Button>
        </Row>
      </div>
    );
  }
};

export default withRouter(Login);
