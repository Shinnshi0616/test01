import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Admin_home from './adminPg/admin_home'
import Article from './adminPg/article'
import store from '../../redux/store'
// import Admin_login from './adminPg/admin_login'
import './index.css'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            info: store.getState()
        })
    }

    UNSAFE_componentWillMount() {
        const admin = store.getState()
        console.log(admin);

        if (admin == false) {
            this.props.history.replace('./admin_login')
        }
    }

    render() {
        console.log(this.state.info);

        const { Header, Content, Footer, Sider } = Layout;
        return (
            <BrowserRouter>

                <div className="admin_box">
                    <div className="admin_layout">
                        <Layout className="admin_layout_box">
                            <Sider
                                breakpoint="lg"
                                collapsedWidth="0"
                                onBreakpoint={broken => {
                                    console.log(broken);
                                }}
                                onCollapse={(collapsed, type) => {
                                    console.log(collapsed, type);
                                }}
                            >
                                <div className="logo" />
                                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} className="admin_layout_menu">
                                    <div className="admin_layout_logo"></div>
                                    <Menu.Item key="1" icon={<UserOutlined />}>
                                        <Link to='/admin_home'>首页</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                        <Link to='/article'>文章</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<UploadOutlined />}>
                                        <Link to='/content'>3</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<UserOutlined />}>
                                        <Link to='/content'>4</Link>
                                    </Menu.Item>

                                </Menu>
                            </Sider>
                            <Layout>
                                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                                <Content style={{ margin: '24px 16px 0' }}>
                                    <div className="site-layout-background">
                                        <Switch>
                                            <Route exact path='/admin_home' component={Admin_home}></Route>
                                            <Route path='/article' component={Article}></Route>

                                            {/* <Route path='/medal' component={Medal}></Route> */}
                                            {/* <Route path='/clock' component={Clock}></Route> */}
                                            <Redirect to={{ pathname: '/admin', state: { from: '/' } }}></Redirect>
                                        </Switch>
                                    </div>
                                </Content>
                                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                            </Layout>
                        </Layout>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
