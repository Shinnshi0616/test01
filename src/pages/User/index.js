import React, { Component } from 'react'
import { BrowserRouter, Link, Redirect, Switch, Route } from 'react-router-dom';
import Data from './pages/Data'
import Group from './pages/Group'
import Password from './pages/Password'
import Pic from './pages/Pic'
import Point from './pages/Point'
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
                <div className="user_setting" style={sectionStyle}>
                    <div className="user_setting_aa">
                        <div className="user_setting_box">
                            <div className="user_setting_left">
                                <span className="user_setting_title"><p>设置</p></span>
                                <ul className="user_setting_ul">
                                    <li>
                                        <Link to='/setting/pic'>修改头像</Link>
                                    </li>
                                    <li>
                                        <Link to='/setting/data'>个人资料</Link>
                                    </li>
                                    <li>
                                        <Link to='/setting/point'>个人积分</Link>
                                    </li>
                                    <li>
                                        <Link to='/setting/group'>勋章设置</Link>
                                    </li>
                                    <li>
                                        <Link to='/setting/password'>密码安全</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="user_setting_right">
                                <Route path="/setting/pic" component={Pic}></Route>
                                <Route path="/setting/data" component={Data}></Route>
                                <Route path="/setting/point" component={Point}></Route>
                                <Route path="/setting/group" component={Group}></Route>
                                <Route path="/setting/password" component={Password}></Route>
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
