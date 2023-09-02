import React, { Component } from 'react'
import { BrowserRouter, Link, Redirect, Switch, Route } from 'react-router-dom';
import Info from './pages/info'
import PerPosts from './pages/perPosts'
import Buylog from './pages/buylog'
import Reply from './pages/reply'
import Collection from './pages/collection'
import './index.css'
import sectionStyle from '../../utils/text'
export default class index extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <BrowserRouter>
                <div style={sectionStyle} className="user_setting">
                    <div className=" user_setting_aa">
                        <div className="user_setting_box">
                            <div className="user_setting_left">
                                <span className="user_setting_title"><p>个人信息</p></span>
                                <ul className="user_setting_ul">
                                    <li>
                                        <Link to='/information/info'>个人信息</Link>
                                    </li>
                                    <li>
                                        <Link to='/information/perPosts'>个人帖子</Link>
                                    </li>
                                    <li>
                                        <Link to='/information/buylog'>购买记录</Link>
                                    </li>
                                    <li>
                                        <Link to='/information/reply'>回复我的</Link>
                                    </li>
                                    <li>
                                        <Link to='/information/collection'>收藏</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="user_setting_right">
                                <Route path="/information/info" component={Info}></Route>
                                <Route path="/information/perPosts" component={PerPosts}></Route>
                                <Route path="/information/buylog" component={Buylog}></Route>
                                <Route path="/information/reply" component={Reply}></Route>
                                <Route path="/information/collection" component={Collection}></Route>
                            </div>
                        </div>
                    </div>
                </div>

                <Switch>
                </Switch>
            </BrowserRouter>

        )
    }
}
