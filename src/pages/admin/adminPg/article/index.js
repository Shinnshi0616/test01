import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import './index.css'
// import moduleName from '../../../../portrait'
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            show: false
        })
    }
    UNSAFE_componentWillMount() {
        const aa = []
        const prosts = []
        axios.get('http://localhost:3000/api1/article').then(
            res => {

                let model_arr = new Array(res.data.length).fill('').map((item, index) => index);
                model_arr.map((item) => {
                    aa.push(res.data[item])
                })
                const type = aa[0].type
                // console.log(aa[0].type)
                axios.get('http://localhost:3000/api1/article?type=' + type).then(
                    res => {
                        let Posts_arr = new Array(res.data.length).fill('').map((item, index) => index);
                        Posts_arr.map((item) => {
                            prosts.push(res.data[item])
                        })
                        this.setState({
                            Posts_arr,
                            prosts,
                            show: true,
                            model_arr,
                            aa,
                            stateLock: true,
                            type: type
                        })
                    })

                // this.setState({
                //     model_arr,
                //     aa,
                //     stateLock: true,
                // })
            })
    }

    ChangeModel = (e) => {
        console.log(e.target.value);
        const prosts = []
        const title = e.target.value
        const obj = this.state.aa.find(function (item) {
            if (item.title == title) {
                return item.photo
            }
        })
        const type = obj.type
        // console.log(obj.type)
        axios.get('http://localhost:3000/api1/article?type=' + type).then(
            res => {
                let Posts_arr = new Array(res.data.length).fill('').map((item, index) => index);
                Posts_arr.map((item) => {
                    prosts.push(res.data[item])
                })
                console.log(Posts_arr)
                console.log(prosts)
                this.setState({
                    Posts_arr,
                    prosts,
                    show: true,
                    type: type
                })
            })
    }
    deletePosts = (e) => {
        const prosts = []
        const id = e.target.parentNode.parentNode.id
        const newtype = this.state.type
        // console.log(this.state.type)
        // console.log(id)
        axios.get('http://localhost:3000/api1/article?id=' + id + "&&newtype=" + newtype).then(
            res => {
                let Posts_arr = new Array(res.data.length).fill('').map((item, index) => index);
                Posts_arr.map((item) => {
                    prosts.push(res.data[item])
                })
                this.setState({
                    Posts_arr,
                    prosts,
                    show: true,
                })
            })
    }
    render() {
        return (
            <div>
                <div>
                    <select onChange={(e) => this.ChangeModel(e)}>
                        {
                            this.state.stateLock ? (this.state.model_arr.map((i) => {
                                return (
                                    // <option>1111</option>
                                    <option key={i}>{this.state.aa[i].title}</option>
                                )
                            })) : [<div>正在加载中</div>]
                        }
                    </select>
                </div>
                <div>
                    {
                        this.state.show ? (this.state.Posts_arr.map((i) => {
                            const img = require('../../../../portrait/' + this.state.prosts[i].photo + '.png').default
                            return (<ul className="Posts_list_ul" ket={i} id={this.state.prosts[i].id}>
                                <li className="Posts_list_li" ref="li1" id={this.state.prosts[i].id}>
                                    <img src={img} className="Posts_list_tou" />
                                    <a href={('./message?PostsId=' + this.state.prosts[i].id)}><p className="Posts_list_title">{this.state.prosts[i].title}</p></a>
                                    <div className="Posts_list_msg">
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
                </div>
            </div>
        )
    }
}
