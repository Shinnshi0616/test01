import React, { Component } from 'react'
import './index.css'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
        })
    }

    UNSAFE_componentWillMount() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        axios.get('http://localhost:3000/api1/information/buylog?userid=' + isAuth.id).then(
            response => {
                console.log(response.data);
                const res = response.data
                let log_arr = new Array(res.length).fill('').map((item, index) => index);
                this.setState({
                    log_arr,
                    log: res,
                    stateLock: true
                })
            })
    }
    render() {
        return (
            <div>
                <div className="buylog_title">
                    <p>标题</p>
                    <p>积分花费</p>
                    <p>拥有者</p>
                    <p>购买者</p>
                    <p>时间</p>
                </div>
                <ul className="buylog_ul">
                    {
                        this.state.stateLock ? (this.state.log_arr.map((i) => {
                            return (<li key={i}>
                                {/* <p>{this.state.log[i].title}</p> */}
                                <a href={('/message?PostsId=' + this.state.log[i].payid)}><p>{this.state.log[i].title}</p></a>
                                <p>{this.state.log[i].point}</p>
                                <p>{this.state.log[i].owner}</p>
                                <p>{this.state.log[i].username}</p>
                                <p>{this.state.log[i].time.substring(0, 10)} {this.state.log[i].time.substring(11, 16)}</p>
                            </li>)
                        })) : [<div>正在加载中</div>]
                    }
                </ul>
            </div>
        )
    }
}
