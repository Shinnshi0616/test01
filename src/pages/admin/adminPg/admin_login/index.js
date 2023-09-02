import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import { Redirect, Route, BrowserRouter, Link } from 'react-router-dom';
import './index.css'
import store from '../../../../redux/store'



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
        axios.get('http://localhost:3000/api1/admin_login?userid=' + input_name + '&&userpassword=' + input_pwd).then(
            response => {
                console.log(typeof response.data)
                if (response.data == true) {
                    // localStorage.setItem("admin", JSON.stringify(response.data));
                    store.dispatch({ type: 'isAdmin', data: { isAdmind: response.data } })
                    const admin = store.getState()
                    console.log(admin)
                    alert("登陆成功")
                    this.props.history.push('/admin')
                }
                else {
                    alert("账号或密码错误")
                }
            },
            error => {
                console.log('no', error)
            }
        )
    }
    render() {
        return (
            <BrowserRouter>
                <div className="Login">
                    <div className="Login_content">
                        <div className="login_top">
                            <p className="login_top_left">管理员登陆</p>
                        </div>
                        <div className="Login_msg">
                            <form className="Login_form" >
                                <ul>
                                    <li>
                                        <label htmlFor="login_username">管理员账号:</label>
                                        <input type="text" id="login_username" ref="username" />
                                    </li>
                                    <li>
                                        <label htmlFor="login_password">管理员密码:</label>
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
