import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import { Button, notification } from 'antd';
// import moduleName from '../../../../portrait'

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            num: 0,
            stateLock: false,
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 6, //每页显示的条数
            totalPage: 0,//总页数
        })
    }



    UNSAFE_componentWillMount() {
        const aa = []
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        // console.log(isAuth);

        axios.get("http://localhost:3000/api1/information/perPstst?name=" + isAuth.name).then(
            response => {
                const res = response.data
                let Posts_arr = new Array(res.length).fill('').map((item, index) => index);
                Posts_arr.map((item) => {
                    aa.push(res)
                })
                const numm = Posts_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                this.setState({
                    Posts_arr,
                    prosts: aa[0],
                    stateLock: true,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm,                                       //当前页面展示的数据存放
                })
            }
        )
    }


    localPage = () => {
        const current = this.state.current
        if (this.state.num > 0) {
            if (this.state.num > this.state.Posts_arr) {
                var num = this.state.num - this.state.pageSize * 2
            } else {
                var num = this.state.num - this.state.pageSize
            }
            console.log(num)
            console.log(this.state.num)
            const numm = this.state.Posts_arr.slice(num - this.state.pageSize, num)
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
        if (this.state.num < this.state.Posts_arr.length) {
            if (this.state.num == 0) {
                var num_o = this.state.pageSize + this.state.num
                var num = this.state.num + this.state.pageSize + num_o
            } else {
                var num_o = 0
                var num = this.state.num + this.state.pageSize
            }
            const numm = this.state.Posts_arr.slice(this.state.num + num_o, num_o + this.state.num + this.state.pageSize)
            if (current < totalPage) {
                this.setState({
                    current: current + 1,
                    num,
                    indexList: numm
                })
            }
        }
    }

    deletePosts = (e) => {
        const aa = []
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        const id = e.target.parentNode.parentNode.id
        console.log(id)
        axios.get('http://localhost:3000/api1/information/perPstst?Postsid=' + id + '&&name=' + isAuth.name).then(
            response => {
                const res = response.data
                let Posts_arr = new Array(res.length).fill('').map((item, index) => index);
                console.log(Posts_arr)
                console.log(res)
                const numm = Posts_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                this.setState({
                    Posts_arr,
                    prosts: res,
                    stateLock: true,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm,                                       //当前页面展示的数据存放
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.stateLock ? (this.state.indexList.map((i) => {
                        const img = require('../../../../portrait/' + this.state.prosts[i].photo + '.png').default
                        return (<ul className="Posts_list_ul" ket={i} id={this.state.prosts[i].id}>
                            <li className="Posts_list_li" id={this.state.prosts[i].id}>
                                <img src={img} className="Posts_list_tou" />
                                <a href={('/message?PostsId=' + this.state.prosts[i].id)}><p className="Posts_list_title">{this.state.prosts[i].title}</p></a>
                                <div className="Posts_list_msg" >
                                    <span className="Posts_list_name">{this.state.prosts[i].username}</span>
                                    <p className="Posts_list_l">|</p>
                                    <p className="Posts_list_time">发表时间:<span>{this.state.prosts[i].date.substring(0, 10)} {this.state.prosts[i].date.substring(11, 16)}</span></p>
                                    <p className="Posts_list_ll">|</p>
                                    <p className="Posts_list_relpy">回复量:{this.state.prosts[i].reply}</p>
                                </div>
                                <Button className="deletePosts" onClick={(e) => this.deletePosts(e)}>删除</Button>
                            </li>
                            <hr />
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
        )
    }
}
