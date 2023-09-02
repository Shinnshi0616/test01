import React, { Component } from 'react'
import { Button, notification } from 'antd';
import './index.css'
import sectionStyle from '../../utils/text'
import axios from 'axios'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            num: 0,
            stateLock: false,
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 11, //每页显示的条数
            totalPage: 0,//总页数
        })
    }


    UNSAFE_componentWillMount() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(isAuth)
        if (isAuth == null) {

            notification['error']({
                message: '访问失败',
                description:
                    '您无权访问此页面,请先登录',
            });
            setTimeout(() => {
                this.props.history.replace('/login')
                window.location.reload();
            }, 1000);
        }
        const aa = []
        axios.get('http://localhost:3000/api1/clock').then(
            response => {
                const res = response.data
                //签到情况
                let log_arr = new Array(res.length).fill('').map((item, index) => index);
                log_arr.map((item) => {
                    aa.push(res[item])
                })
                const numm = log_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                this.setState({
                    log_arr: log_arr,
                    aa,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm,                                       //当前页面展示的数据存放
                    stateLock: true
                })
            }


        )
    }

    handleImgChange = (e) => {
        // console.log(e.target.className);
        const aa = []
        e.target.className = 'clock_sign_img2'
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(isAuth.name)
        const point = Math.ceil(Math.random() * 4);
        axios.get("http://localhost:3000/api1/clock?id=" + isAuth.id + "&&name=" + isAuth.name + "&&point=" + point).then(
            response => {
                console.log(response.data)
                const res = response.data
                if (response.data != '') {
                    console.log(response.data)
                    let log_arr = new Array(res.length).fill('').map((item, index) => index);
                    log_arr.map((item) => {
                        aa.push(res[item])
                    })
                    notification['success']({
                        message: '签到成功',
                        description:
                            '您成功完成每日签到,获得' + point + '积分',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                    this.setState({
                        log_arr: log_arr,
                        aa,
                        stateLock: true
                    })
                }
                else {
                    notification['warning']({
                        message: '签到失败',
                        description:
                            '您今日已经签到',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                    // alert("今天已经签到了")
                }
            }
        )
    }


    localPage = () => {
        const current = this.state.current
        if (this.state.num > 0) {
            if (this.state.num > this.state.log_arr) {
                var num = this.state.num - this.state.pageSize * 2
            } else {
                var num = this.state.num - this.state.pageSize
            }
            console.log(num)
            console.log(this.state.num)
            const numm = this.state.log_arr.slice(num - this.state.pageSize, num)
            console.log(numm)
            if (current > 1) {
                this.setState({
                    current: current - 1,
                    num,
                    indexList: numm
                })
            }
        }


    }
    nextPage = () => {
        const current = this.state.current
        const totalPage = this.state.totalPage
        if (this.state.num < this.state.log_arr.length) {
            if (this.state.num == 0) {
                var num_o = this.state.pageSize + this.state.num
                var num = this.state.num + this.state.pageSize + num_o
            } else {
                var num_o = 0
                var num = this.state.num + this.state.pageSize
            }
            const numm = this.state.log_arr.slice(this.state.num + num_o, num_o + this.state.num + this.state.pageSize)
            if (current < totalPage) {
                this.setState({
                    current: current + 1,
                    num,
                    indexList: numm
                })
            }
        }
    }


    render() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(typeof isAuth)
        if (isAuth != undefined) {
            var img = require('../../portrait/' + isAuth.photo + '.png').default
        }

        return (
            <div className="clock_aa" style={sectionStyle}>
                <div className="clock">
                    <div className="clock_sign">
                        <div className="clock_sign_left">
                            <img className="clock_sign_img" onClick={(e) => this.handleImgChange(e)} />
                        </div>
                        <div className="clock_sign_right">
                            <img src={img} className="clock_sign_right_img" />
                            {
                                (isAuth != undefined) ? (<p className="clock_sign_right_name">{isAuth.name}</p>) : [<div>正在加载中</div>]
                            }

                            <ul className="clock_sign_title">
                                <li>
                                    <p>连续签到</p>
                                </li>
                                <li>
                                    <p>签到等级</p>
                                </li>
                                <li>
                                    <p>获得积分</p>
                                </li>
                                <li>
                                    <p>总天数</p>
                                </li>
                            </ul>
                            <ul className="clock_sign_data">
                                <li>
                                    <p><span>1</span>天</p>
                                </li>
                                <li>
                                    <p>LV.<span>1</span></p>
                                </li>
                                <li>
                                    <p><span>4</span></p>
                                </li>
                                <li>
                                    <p><span>19</span>天</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="clock_sign_log">
                        <ul className="clock_sign_log_title">
                            <li>
                                <p>名称</p>
                            </li>
                            <li>
                                <p>总天数</p>
                            </li>
                            <li>
                                <p>上次签到时间</p>
                            </li>
                            <li>
                                <p>目前等级</p>
                            </li>
                            <li>
                                <p>奖励积分</p>
                            </li>
                        </ul>
                        {


                            this.state.stateLock ? (this.state.indexList.map((i) => {
                                return (<ul className="clock_sign_log_xq" key={i}>
                                    <li>
                                        <p>{this.state.aa[i].username}</p>
                                    </li>
                                    <li>
                                        <p>{this.state.aa[i].allday}</p>
                                    </li>
                                    <li>
                                        <p>{this.state.aa[i].time.substring(0, 10)}</p>
                                    </li>
                                    <li>
                                        <p>LV.{this.state.aa[i].leval}</p>
                                    </li>
                                    <li>
                                        <p>{this.state.aa[i].addpoint}</p>
                                    </li>
                                </ul>)
                            })) : [<div>正在加载中</div>]
                        }
                        <div className="setpage_button_box">
                            <div className="setpage_button">
                                <Button className="local_page" onClick={this.localPage}>上一页</Button>
                                <p>{this.state.current}/{this.state.totalPage}</p>
                                <Button className="next_page" onClick={this.nextPage}>下一页</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
