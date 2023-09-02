import React, { Component } from 'react'
import './index.css'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            bb: [1]
        })
    }



    UNSAFE_componentWillMount() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        axios.get("http://localhost:3000/api1/information/info?id=" + isAuth.id).then(
            response => {
                console.log(response.data);
                console.log(isAuth);
                this.setState({
                    info: response.data[0],
                    stateLock: true
                })
            }
        )
    }
    render() {
        // console.log(this.state.info.brith);

        return (
            <div>
                <div>

                    {
                        this.state.stateLock ? (this.state.bb.map((i) => {
                            return (
                                <ul className="information_ul" key={i}>
                                    <li>
                                        <p>用户名：</p>
                                        <p>{this.state.info.username}</p>
                                    </li>
                                    <li>
                                        <p>性别：</p>
                                        {
                                            this.state.info.usersex == '' ? (<p>保密</p>) : <p>{this.state.info.usersex}</p>
                                        }

                                    </li>
                                    <li>
                                        <p>真实姓名：</p>
                                        {
                                            this.state.info.truethname == '' ? (<p>保密</p>) : <p>{this.state.info.truethname}</p>
                                        }
                                    </li>
                                    <li>
                                        <p>生日：</p>
                                        {
                                            this.state.info.brith.substring(0, 4) == 1900 || this.state.info.brith.substring(0, 4) == null ? (<p>保密</p>) : <p>{this.state.info.brith.substring(0, 10)}</p>
                                        }
                                    </li>
                                    <li>
                                        <p>出生地：</p>
                                        {
                                            this.state.info.place == '' ? (<p>保密</p>) : <p>{this.state.info.place}</p>
                                        }

                                    </li>
                                    <li>
                                        <p>个人签名：</p>
                                        {
                                            this.state.info.presonel == '' ? (<p>保密</p>) : <p>{this.state.info.presonel}</p>
                                        }

                                    </li>
                                </ul>
                            )

                        })) : [<div>正在加载中</div>]
                    }

                </div>
            </div>
        )
    }
}
