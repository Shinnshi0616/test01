import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import { Button, notification } from 'antd';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            num: 0,
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 15,//每页显示的条数
            totalPage: 0,//总页数
        })
    }

    UNSAFE_componentWillMount() {
        const aa = []
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        axios.get('http://localhost:3000/api1/setting/group?username=' + isAuth.name).then(
            response => {
                // console.log(response.data);
                let res = response.data
                let medal_arr = new Array(res.length).fill('').map((item, index) => index);
                medal_arr.map((item) => {
                    aa.push(res[item])
                })
                console.log(aa);
                const numm = medal_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                this.setState({
                    medal_arr,
                    medal: aa,
                    stateLock: true,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm,                                       //当前页面展示的数据存放
                })
            }
        )
    }
    componentDidMount() {
        setTimeout(() => {
            this.onedit()
        }, 100);
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.onedit()
        }, 100);
    }

    localPage = () => {
        const current = this.state.current
        if (this.state.num > 0) {
            if (this.state.num > this.state.medal_arr) {
                var num = this.state.num - this.state.pageSize * 2
            } else {
                var num = this.state.num - this.state.pageSize
            }
            console.log(num)
            console.log(this.state.num)
            const numm = this.state.medal_arr.slice(num - this.state.pageSize, num)
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
        if (this.state.num < this.state.medal_arr.length) {
            if (this.state.num == 0) {
                var num_o = this.state.pageSize + this.state.num
                var num = this.state.num + this.state.pageSize + num_o
            } else {
                var num_o = 0
                var num = this.state.num + this.state.pageSize
            }
            const numm = this.state.medal_arr.slice(this.state.num + num_o, num_o + this.state.num + this.state.pageSize)
            if (current < totalPage) {
                this.setState({
                    current: current + 1,
                    num,
                    indexList: numm
                })
            }
        }
    }
    handleWear = (e) => {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        if (e.target.type == undefined) {
            var dd = e.target.parentNode.parentNode.children[0].id
        }
        else {
            var dd = e.target.parentNode.children[0].id
        }
        console.log(dd);
        axios.get('http://localhost:3000/api1/setting/group?medalId=' + dd + '&&username=' + isAuth.name).then(
            response => {
                let res = response.data
                console.log(res);
                if (res == true) {
                    notification['success']({
                        message: '佩戴成功',
                        description:
                            '已成功佩戴该勋章',
                    })
                }
            }
        )
    }

    handleuninstall = (e) => {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        if (e.target.type == undefined) {
            var dd = e.target.parentNode.parentNode.children[0].id
        }
        else {
            var dd = e.target.parentNode.children[0].id
        }
        console.log(dd);
        axios.get('http://localhost:3000/api1/setting/group?UnmedalId=' + dd + '&&username=' + isAuth.name).then(
            response => {
                let res = response.data
                console.log(res);
                if (res == true) {
                    notification['success']({
                        message: '卸载成功',
                        description:
                            '已成功卸载该勋章',
                    })
                }
            }
        )
    }

    onedit() {
        const aa = this.state.indexList
        let aa_arr = new Array(aa.length).fill('').map((item, index) => index);
        const gif1 = this.refs.gif1
        const medal = this.state.medal
        const bb = aa_arr.map((i) => {
            return gif1.children[i].children[0]
        })
        aa_arr.map((i) => {
            if (bb[i].scrollWidth >= 200) {
                bb[i].style.width = "100px"
            }
        })
    }
    render() {
        return (
            <div>
                <div ref="gif1">
                    {
                        this.state.stateLock ? (this.state.indexList.map((i) => {
                            let gif = require('../../../../medal/' + this.state.medal[i].medalphoto + '.gif').default
                            return (
                                <div className="user_medal" key={i}>
                                    <img src={gif} id={this.state.medal[i].medalId} />
                                    <Button className="Wear_medal" onClick={(e) => this.handleWear(e)}>佩戴</Button>
                                    <Button className="uninstall_medal" onClick={(e) => this.handleuninstall(e)}>卸载</Button>
                                </div>
                            )
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
        )
    }
}
