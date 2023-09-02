import React, { Component } from 'react'
import axios from 'axios'
import { Button, notification } from 'antd'
import Auth from '../../utils/auth'
import UserInfo from '../../utils/text'
import { Redirect, Route, BrowserRouter, Link } from 'react-router-dom';
import './index.css'
import sign from '../sign'
import store from '../../redux/store'



export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLogin: false,
            info: []
        })
    }
    componentDidMount() {

    }

    handleLogin = () => {
        const input_name = this.refs.username.value
        const input_pwd = this.refs.userpwd.value
        console.log(input_name);
        if (input_name == '') {
            notification['warning']({
                message: '登陆失败',
                description:
                    '账号名不能为空',
            })
        }
        else if (input_pwd == '') {
            notification['warning']({
                message: '登陆失败',
                description:
                    '密码不能为空',
            })
        }
        else {
            axios.get('http://localhost:3000/api1/login?userid=' + input_name + '&&userpassword=' + input_pwd).then(
                response => {
                    console.log('ok', response.data)
                    store.dispatch({ type: 'isUser', data: { isAuth: response.data.isAuth, name: response.data.name } })
                    this.setState({
                        info: store.getState()
                    })
                    console.log(this.state.info.isAuth)
                    if (this.state.info.isAuth == "true") {
                        localStorage.setItem("phone", JSON.stringify(response.data));
                        // localStorage.setItem("value", response.data)
                        let user = JSON.parse(localStorage.getItem("phone"))
                        console.log(user);
                        notification['success']({
                            message: '登陆成功',
                            description:
                                '登陆成功',
                        })
                        // alert("登陆成功")
                        console.log(this.props)
                        this.props.history.push('/home')
                        // this.props.history.replace('/home')
                    }
                    else {
                        notification['error']({
                            message: '登陆失败',
                            description:
                                '账号或密码错误',
                        })
                        // alert("账号或密码错误")
                    }
                },
                error => {
                    console.log('no', error)
                }
            )
        }

    }
    render() {
        return (
            <BrowserRouter>
                <div className="Login">
                    <div className="Login_content">
                        <div className="login_top">
                            <p className="login_top_left">请先登录</p>
                            <a href='../sign' className="login_top_right">没有账号？立即注册</a>
                            {/* <Link to='../sign' className="login_top_right">没有账号？立即注册</Link> */}
                        </div>
                        <div className="Login_msg">
                            <form className="Login_form" >
                                <ul>
                                    <li>
                                        <label htmlFor="login_username">账号:</label>
                                        <input type="text" id="login_username" ref="username" />
                                    </li>
                                    <li>
                                        <label htmlFor="login_password">密码:</label>
                                        <input type="password" id="login_password" ref="userpwd" />
                                    </li>
                                </ul>


                                <Button onClick={() => this.handleLogin()} >登陆</Button>
                            </form>

                        </div>

                    </div>

                </div>
            </BrowserRouter>
        )


    }
}
