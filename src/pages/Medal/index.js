import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import { Button, notification } from 'antd';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
        })
    }


    UNSAFE_componentWillMount() {
        const aa = []
        const bb = []
        const cc = []
        const xq = []
        axios.get("http://localhost:3000/api1/medal").then(
            response => {
                console.log(response.data);
                const res = response.data
                let type_arr = new Array(res.length).fill('').map((item, index) => index);
                type_arr.map((item) => {
                    aa.push(res[item].type)
                })
                type_arr.map((item) => {
                    if (cc.indexOf(aa[item]) == -1) {
                        cc.push(aa[item])
                    }
                })
                type_arr.map((item) => {
                    bb.push(res[item])
                })
                type_arr.map((item) => {
                    if (res[item].type == aa[0])
                        xq.push(res[item])
                })
                let xq_arr = new Array(xq.length).fill('').map((item, index) => index);
                let type2_arr = new Array(cc.length).fill('').map((item, index) => index);
                console.log(cc);
                this.setState({
                    type_arr,
                    type2_arr,
                    xq_arr,
                    type: cc,
                    medal: bb,
                    xq,
                    stateLock: true,
                })
            }
        )
    }

    handleType = (e) => {
        const xq = []
        let aa = e.target.parentNode.children
        let bb = e.target
        let type = e.target.innerText
        let medal = this.state.medal
        const arr2 = this.state.type2_arr
        const arr = this.state.type_arr
        arr2.map((i) => {
            aa[i].className = "type_a"
            bb.className = "type_a ggg"
        })
        arr.map((i) => {
            if (medal[i].type == type) {
                xq.push(medal[i])
            }
        })
        let xq_arr = new Array(xq.length).fill('').map((item, index) => index);
        this.setState({
            xq_arr,
            xq,
        })
    }
    medal_buy = (e) => {
        // e.stopPropagation();
        // console.log(e.target.parentNode.children);

        // console.log(e.target.parentNode.parentNode.children[1]);
        let id = e.target.parentNode.children[1].id
        let medalphoto = ''
        let point = ''
        console.log(id);
        this.state.xq_arr.map((i) => {
            if (id == this.state.xq[i].id) {
                medalphoto = this.state.xq[i].medalphoto
                point = this.state.xq[i].point
            }
        })
        console.log(medalphoto);
        console.log(point);
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        if (isAuth == null) {
            notification['error']({
                message: '购买失败',
                description:
                    '您还未登录',
            });
            this.props.history.replace('/login')
        }
        else {
            axios.get("http://localhost:3000/api1/medal?id=" + id + "&&username=" + isAuth.name + "&&medalphoto=" + medalphoto + "&&point=" + point + "&&userid=" + isAuth.id).then(
                response => {
                    let res = response.data
                    if (res == true) {
                        notification['success']({
                            message: '购买成功',
                            description:
                                '已成功购买该勋章',
                        })
                    }
                    else if (res == "积分不足") {
                        notification['error']({
                            message: '购买失败',
                            description:
                                '积分不足',
                        })
                    }
                    else {
                        notification['warning']({
                            message: '购买失败',
                            description:
                                '已拥有该勋章',
                        })
                    }
                }
            )
        }
        // console.log(isAuth);


    }
    render() {
        return (
            <div className="medal_bg">
                <div className="medal_box_div">
                    <div className="medal_type">
                        {
                            this.state.stateLock ? (this.state.type2_arr.map((i) => {
                                return (<a className="type_a" onClick={(e) => this.handleType(e)} key={i} id={this.state.type[i]}>{this.state.type[i]}</a>)
                            })) : [<div>正在加载中</div>]
                        }
                    </div>
                    <div className="medal_xq">
                        {
                            this.state.stateLock ? (this.state.xq_arr.map((i) => {
                                const gif = require('../../medal/' + this.state.xq[i].medalphoto + '.gif').default
                                return (
                                    <div className="medal_xq_box">
                                        <div className="medal_xq_gif_div"><img src={gif} className="medal_xq_gif" /></div>
                                        <p className="medal_xq_title" id={this.state.xq[i].id}>{this.state.xq[i].title}</p>
                                        <button className="medal_xq_buy" onClick={(e) => this.medal_buy(e)}>购买</button>

                                        <p className="medal_xq_point">{this.state.xq[i].point}积分</p>
                                    </div>
                                )
                            })) : [<div>正在加载中</div>]
                        }
                    </div>
                </div>
            </div>
        )
    }
}
