import React from 'react';
import { Link, Route } from 'react-router-dom';

import {
  Breadcrumb, Icon, Layout, Menu
} from 'antd';

import Grid from '@/component/Grid';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: []
    };
  }

  componentDidMount() {
  }

  genMenuList = () => {
    const {
      match,
      userInfo
    } = this.props;
    let menuList = [];
    if (userInfo && userInfo.menuList) {
      menuList = userInfo.menuList.map(menu => (
        <SubMenu
          key={menu.id}
          title={(
            <span>
              <Icon type="user" />{menu.name}
            </span>
          )}
        >
          {
            menu.children.map(subMenu => (
              <Menu.Item key={subMenu.id}>
                <Link to={match.url + subMenu.url} />{subMenu.name}
              </Menu.Item>
            ))
          }
        </SubMenu>
      ));
    }
    return menuList;
  };

  render() {
    const { match } = this.props;

    const menuList = this.genMenuList();
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{ background: '#fff' }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {menuList}
              {/* <SubMenu
                key="sub1"
                title={(
                  <span>
                    <Icon type="user" /> subnav 1
                  </span>
                )}
              >
                {
                  menuList
                }
                <Menu.Item key="1">
                  <Link to={`${match.url}/grid`} />表格
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/login" />登录
                </Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route path={`${match.url}/grid`} component={Grid} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
