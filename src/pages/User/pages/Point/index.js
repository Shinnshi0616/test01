import React, { Component } from 'react'
import './index.css'
import { Button } from 'antd'
import axios from 'axios'
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            num: 0,
            xq_arr: [],
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 7,//每页显示的条数
            totalPage: 0,//总页数
        })
    }


    UNSAFE_componentWillMount() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(111)
        this.setState({
            isAuth: isAuth,
            xq_arr: []
        })
    }
    handleChane = () => {
        const aa = []
        // console.log("sss")
        axios.get('http://localhost:3000/api1/setting/point?id=' + this.state.isAuth.id).then(
            res => {
                const data = { name: res.data.name, id: res.data.id, isAuth: res.data.isAuth, photo: res.data.photo, point: res.data.point }
                localStorage.clear();
                localStorage.setItem("phone", JSON.stringify(data));
                console.log(res.data.xq);
                const xq_arr = new Array(res.data.xq.length).fill('').map((item, index) => index);
                xq_arr.map((item) => {
                    aa.push(res.data.xq[item])
                })
                console.log(xq_arr)
                console.log(aa)
                const numm = xq_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                const isAuth = JSON.parse(localStorage.getItem("phone"))
                this.setState({
                    xq_arr,
                    isAuth,
                    xq: res.data.xq,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm,                                       //当前页面展示的数据存放
                })
            }
        )

    }



    localPage = () => {
        const current = this.state.current
        if (this.state.num > 0) {
            if (this.state.num > this.state.xq_arr) {
                var num = this.state.num - this.state.pageSize * 2
            } else {
                var num = this.state.num - this.state.pageSize
            }
            console.log(num)
            console.log(this.state.num)
            const numm = this.state.xq_arr.slice(num - this.state.pageSize, num)
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
        if (this.state.num < this.state.xq_arr.length) {
            if (this.state.num == 0) {
                var num_o = this.state.pageSize + this.state.num
                var num = this.state.num + this.state.pageSize + num_o
            } else {
                var num_o = 0
                var num = this.state.num + this.state.pageSize
            }
            const numm = this.state.xq_arr.slice(this.state.num + num_o, num_o + this.state.num + this.state.pageSize)
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
        console.log(222)
        console.log(this.state.xq_arr);
        const arr = this.state.xq_arr
        // const isAuth = JSON.parse(localStorage.getItem("phone"))
        return (
            <div className="point_div">
                <div className="point_div2">
                    <p className="presonal_point">积分：{this.state.isAuth.point}</p>
                    <p>积分规则：发帖和每日回复积分+1</p>
                    <Button onClick={() => this.handleChane()}>刷新</Button>
                    <p>积分记录</p>
                    <div className="point_log">
                        <p className="point_cz">操作</p>
                        <p className="point_bg">积分变更</p>
                        <p className="point_xq">详情</p>
                        <p className="point_time">变更时间</p>
                    </div>
                    <ul className="point_log_ul">
                        {
                            this.state.isAuth ? this.state.indexList.map((i) => {
                                return (
                                    <li className="point_li">
                                        <p className="point_cz">{this.state.xq[i].action}</p>
                                        <p className="point_bg point_color">积分：{this.state.xq[i].addpoint}</p>
                                        <p className="point_xq">{this.state.xq[i].xq}</p>
                                        <p className="point_time2">{this.state.xq[i].time.substring(0, 10)}</p>
                                    </li>
                                )
                            }) : [<div>正在加载中</div>]
                        }
                    </ul>
                    <div className="setpage_button_box">
                        <div className="setpage_button">
                            <Button className="local_page" onClick={this.localPage}>上一页</Button>
                            <p>{this.state.current}/{this.state.totalPage}</p>
                            <Button className="next_page" onClick={this.nextPage}>下一页</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
