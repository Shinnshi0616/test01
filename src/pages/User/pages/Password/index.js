import React, { Component } from 'react'
import './index.css'
import { Button, notification } from 'antd'
import axios from 'axios'

export default class index extends Component {
    handleChange = () => {
        const oldpwd = this.refs.input1.value
        const newpwd = this.refs.input2.value
        const ennewpwd = this.refs.input3.value
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        if (oldpwd == '') {
            notification['warning']({
                message: '不能为空',
                description:
                    '旧密码不能为空',
            });
        }
        if (newpwd == '') {
            notification['warning']({
                message: '不能为空',
                description:
                    '新密码不能为空',
            });
        }
        if (ennewpwd == '') {
            notification['warning']({
                message: '不能为空',
                description:
                    '确认密码不能为空',
            });
        }
        if (newpwd != ennewpwd) {
            notification['warning']({
                message: '确认密码错误',
                description:
                    '确认密码错误',
            });
        }
        else {
            axios.get('http://localhost:3000/api1/setting/password?userid=' + isAuth.id + "&&oldpwd=" + oldpwd + "&&ennewpwd=" + ennewpwd).then(
                response => {
                    const res = response.data
                    if (res == false) {
                        notification['error']({
                            message: '更改错误',
                            description:
                                '旧密码错误',
                        });
                    }
                    else {
                        notification['success']({
                            message: '更改成功',
                            description:
                                '密码修改成功',
                        });
                        this.props.history.replace('/login')
                        window.location.reload();
                    }
                }
            )
        }

    }
    render() {
        return (
            <div className="password_load">
                <ul>
                    <li>
                        <p>旧密码：</p>
                        <input ref="input1" />
                    </li>
                    <li>
                        <p>新密码：</p>
                        <input ref="input2" />
                    </li>
                    <li>
                        <p>确认新密码：</p>
                        <input ref="input3" />
                    </li>
                    <li><Button onClick={this.handleChange}>确认</Button></li>
                </ul>
            </div>
        )
    }
}
