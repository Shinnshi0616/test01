import React, { Component } from 'react'
import axios from 'axios'
import { Button, notification } from 'antd'
import { BrowserRouter } from 'react-router-dom';
// import Text from '../../utils/text'

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
        const input_id = this.refs.userid.value
        const input_pwd = this.refs.userpwd.value
        const input_name = this.refs.username.value
        axios.get('http://localhost:3000/api1/sign?username=' + input_name + '&&userpassword=' + input_pwd + '&&userid=' + input_id).then(
            response => {
                console.log('ok', response.data)
                if (response.data == "用户名已存在") {
                    notification['error']({
                        message: '注册失败',
                        description:
                            '用户名称已存在',
                    });
                    return;
                }
                if (response.data == "用户ID已存在") {
                    notification['error']({
                        message: '注册失败',
                        description:
                            '用户账号已存在',
                    });
                    return;
                }
                alert("创建成功")
                this.props.history.replace('/login')
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
                            <p className="login_top_left">注册</p>
                        </div>
                        <div className="Login_msg">
                            <form className="Login_form" >
                                <ul>
                                    <li>
                                        <label htmlFor="login_username">名称:</label>
                                        <input type="text" id="login_username" ref="username" />
                                    </li>
                                    <li>
                                        <label htmlFor="login_username">账号:</label>
                                        <input type="text" id="login_username" ref="userid" />
                                    </li>
                                    <li>
                                        <label htmlFor="login_password">密码:</label>
                                        <input type="password" id="login_password" ref="userpwd" />
                                    </li>
                                </ul>


                                <Button onClick={() => this.handleLogin()} >注册</Button>
                            </form>

                        </div>

                    </div>

                </div>
            </BrowserRouter>
        )


    }
}
