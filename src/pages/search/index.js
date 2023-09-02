import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import PageButton from '../../coment/index'
import { Button } from 'antd';
import sectionStyle from '../../utils/text'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            num: 0,
            stateLock: false,
            show: false,
            indexList: [],//当前渲染的页面数据
            current: 1, //当前页码
            pageSize: 10, //每页显示的条数
            totalPage: 0,//总页数
        })
    }


    UNSAFE_componentWillMount() {
        const aa = []
        const { search } = this.props.location
        const paramsSting = search.substring(1)
        const searchParams = new URLSearchParams(paramsSting)
        const title = searchParams.get('title')
        // console.log(title);
        axios.get("http://localhost:3000/api1/search?title=" + title).then(
            response => {
                // console.log(response.data);
                const res = response.data
                let search_arr = new Array(res.length).fill('').map((item, index) => index);
                search_arr.map((item) => {
                    aa.push(res[item])
                })
                const numm = search_arr.slice(this.state.num, this.state.num + this.state.pageSize)
                this.setState({
                    search: title,
                    search_arr,
                    aa,
                    stateLock: true,
                    show: false,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm                                        //当前页面展示的数据存放

                })
            }
        )
    }
    searchTitle = () => {
        const aa = []
        const title = this.state.search
        axios.get("http://localhost:3000/api1/search?title=" + title).then(
            response => {
                // console.log(response.data);
                const res = response.data
                let search_arr = new Array(res.length).fill('').map((item, index) => index);
                search_arr.map((item) => {
                    aa.push(res[item])
                })
                const numm = search_arr.slice(0, this.state.pageSize)
                this.setState({
                    search_arr,
                    aa,
                    stateLock: true,
                    show: false,
                    // num: 0 + this.state.pageSize,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm                                        //当前页面展示的数据存放
                })
            }
        )
    }
    searchContent = () => {
        const aa = []
        const content = this.state.search
        axios.get("http://localhost:3000/api1/search?content=" + content).then(
            response => {
                // console.log(response.data);
                const res = response.data
                let search_arr = new Array(res.length).fill('').map((item, index) => index);
                search_arr.map((item) => {
                    aa.push(res[item])
                })
                // console.log(aa);

                const numm = search_arr.slice(0, this.state.pageSize)
                this.setState({
                    search_arr,
                    aa,
                    stateLock: true,
                    show: true,
                    // num: 0 + this.state.pageSize,
                    totalPage: Math.ceil(aa.length / this.state.pageSize), //设置总页数
                    indexList: numm                                        //当前页面展示的数据存放
                })
            }
        )
    }
    localPage = () => {
        const current = this.state.current
        if (this.state.num > 0) {
            if (this.state.num > this.state.search_arr) {
                var num = this.state.num - this.state.pageSize * 2
            } else {
                var num = this.state.num - this.state.pageSize
            }
            console.log(num)
            console.log(this.state.num)
            const numm = this.state.search_arr.slice(num - this.state.pageSize, num)
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
        if (this.state.num < this.state.search_arr.length) {
            if (this.state.num == 0) {
                var num_o = this.state.pageSize + this.state.num
                var num = this.state.num + this.state.pageSize + num_o
            } else {
                var num_o = 0
                var num = this.state.num + this.state.pageSize
            }
            const numm = this.state.search_arr.slice(this.state.num + num_o, num_o + this.state.num + this.state.pageSize)
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
        return (
            <div className="root_content" style={sectionStyle}>
                <div className="root_content_aa">
                    <div className="Posts_list">
                        <div className="Posts_list_top">
                            <div className="Posts_list_top_left">
                                <div className="Posts_list_icon_new">
                                    {/* <p onClick={this.searchTitle}>标题</p> */}
                                    <Button onClick={this.searchTitle}>标题</Button>
                                    <Button className="search_content" onClick={this.searchContent}>内容</Button>
                                    {/* <p className="search_content" onClick={this.searchContent}>内容</p> */}
                                </div>
                            </div>
                            <hr />
                        </div>
                        {
                            this.state.stateLock ? (this.state.indexList.map((i) => {
                                // console.log(i)
                                const img = require('../../portrait/' + this.state.aa[i].photo + '.png').default
                                return (<ul className="Posts_list_ul" ket={i}>
                                    <li className="Posts_list_li">
                                        <img src={img} className="Posts_list_tou" />
                                        {

                                            this.state.show ? (<a href={('./message?PostsId=' + this.state.aa[i].id)}><p className="Posts_list_title">{this.state.aa[i].mssage}</p></a>)
                                                : <a href={('./message?PostsId=' + this.state.aa[i].id)}><p className="Posts_list_title">{this.state.aa[i].title}</p></a>
                                        }

                                        <div className="Posts_list_msg">
                                            <span className="Posts_list_name">{this.state.aa[i].username}</span>
                                            <p className="Posts_list_l">|</p>
                                            <p className="Posts_list_time">发表时间:<span>{this.state.aa[i].date.substring(0, 10)} {this.state.aa[i].date.substring(11, 16)}</span></p>
                                            <p className="Posts_list_ll">|</p>
                                            <p className="Posts_list_relpy">回复量:{this.state.aa[i].reply}</p>
                                        </div>
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
                        {/* <PageButton {...this.state} pageNext={this.pageNext} /> */}
                    </div>
                </div>
            </div>
        )
    }
}
