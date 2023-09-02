import React, { Component } from 'react'
import axios from 'axios'
import { FireOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './index.css'
import { Button, notification } from 'antd';
import Fu from '../../../img/fu.png'
import Pic from '../../../img/pic.png'
import Do from '../../../img/do.png'
import sectionStyle from '../../../utils/text'
import store from '../../../redux/store'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            aa: false,
            isshow: true
        })
    }


    UNSAFE_componentWillMount() {
        const aa = []
        const gg = []
        const hh = []
        const zz = []
        const url = decodeURI(window.location.href);
        const sub = url.indexOf('=')
        const type = url.substring(sub + 1, url.length)
        // console.log(type);
        // console.log(isAuth)
        axios.get('http://localhost:3000/api1/content?type=' + type).then(
            response => {
                // console.log(response.data)
                const res = response.data
                console.log(res);

                // console.log(res[0])
                // console.log(res[1])
                //帖子
                let Posts_arr = new Array(res[0].length).fill('').map((item, index) => index);
                Posts_arr.map((item) => {
                    aa.push(res[0][item])
                })
                //热门帖子，排序
                let Posts_hot_arr = new Array(res[1].length).fill('').map((item, index) => index);
                Posts_hot_arr.map((item) => {
                    gg.push(res[1][item])
                })
                //最新帖子
                let posts_tiem_arr = new Array(res[2].length).fill('').map((item, index) => index);
                posts_tiem_arr.map((item) => {
                    hh.push(res[2][item])
                })
                //求帖子ID
                let posts_id_arr = new Array(res[3].length).fill('').map((item, index) => index);
                posts_id_arr.map((item) => {
                    zz.push(res[3][item])
                })

                console.log(aa)
                this.setState({
                    Posts_arr,
                    Posts_hot_arr,
                    posts_tiem_arr,
                    prosts: aa,
                    Posts_hot: gg,
                    posts_tiem: hh,
                    posts_id: zz,
                    stateLock: true,
                    type,
                })
            },
            errror => { }
        )
    }
    handleposts = (e) => {
        let msg = this.refs.input2.value.replace(/\n/g, 'br').replace(/\s/g, 'nbsp');
        axios.get('http://localhost:3000/api1/content?text=' + msg).then(
            response => {
                // console.log(response.data);
                if (response.data == true) {
                    const aa = []
                    const gg = []
                    const hh = []
                    const zz = []
                    const isAuth = JSON.parse(localStorage.getItem("phone"))
                    let type = this.state.type
                    let title = this.refs.input1.value.replace(/\s/g, 'nbsp');
                    let msg = this.refs.input2.value.replace(/\n/g, 'br').replace(/\s/g, 'nbsp');
                    const paycomtent = this.state.paycomtent
                    const paypoint = this.state.paypoint
                    const name = ''
                    axios.get('http://localhost:3000/api1/content?type=' + type + '&&title=' + title + '&&msg=' + msg + '&&username=' + isAuth.name + '&&pic=' + isAuth.photo + '&&id=' + isAuth.id + '&&paycomtent=' + paycomtent + '&&paypoint=' + paypoint).then(
                        response => {
                            const res = response.data
                            console.log(res);
                            console.log(res[0])
                            console.log(res[1])
                            //帖子
                            let Posts_arr = new Array(res[0].length).fill('').map((item, index) => index);
                            Posts_arr.map((item) => {
                                aa.push(res[0][item])
                            })
                            //热门帖子，排序
                            let Posts_hot_arr = new Array(res[1].length).fill('').map((item, index) => index);
                            Posts_hot_arr.map((item) => {
                                gg.push(res[1][item])
                            })
                            //最新帖子
                            let posts_tiem_arr = new Array(res[2].length).fill('').map((item, index) => index);
                            posts_tiem_arr.map((item) => {
                                hh.push(res[2][item])
                            })
                            //求帖子ID
                            let posts_id_arr = new Array(res[3].length).fill('').map((item, index) => index);
                            posts_id_arr.map((item) => {
                                zz.push(res[3][item])
                            })

                            console.log(aa)
                            this.refs.input1.value = ''
                            this.refs.input2.value = ''
                            this.setState({
                                Posts_arr,
                                Posts_hot_arr,
                                posts_tiem_arr,
                                prosts: aa,
                                Posts_hot: gg,
                                posts_tiem: hh,
                                posts_id: zz,
                                stateLock: true,
                                type,
                            })
                        },
                        errror => { }
                    )
                } else {
                    alert("文中含有敏感词")
                }

            }
        )
    }


    handlePoint = () => {
        const isshow = this.state.isshow
        const pay = this.refs.fufei1
        // console.log(pay)
        if (isshow == true) {
            pay.style.display = "block"
        }
        else {
            pay.style.display = "none"
        }
        this.setState({
            isshow: !isshow
        })
    }
    handleFujian = () => {

    }
    handlePhoto = () => {

    }

    handlePointsubmit = () => {
        const paycomtent = this.refs.textarea1.value
        const paypoint = this.refs.input5.value
        notification['success']({
            message: '提交成功',
            description:
                '已经提交付费内容',
        })
        this.refs.input5.value = ''
        this.refs.textarea1.value = ''
        this.setState({
            paycomtent: paycomtent,
            paypoint: paypoint,
        })
    }

    render() {
        let id = ''
        let title = ''
        return (
            <div className="root_content" style={sectionStyle}>
                <div className="root_content_aa">
                    <div className="Posts_list">
                        <div className="Posts_list_top">
                            <div className="Posts_list_top_left">
                                <div className="Posts_list_icon_new">
                                    <ClockCircleOutlined />
                                    <p>最新</p>
                                </div>
                                <div className="Posts_list_icon_hot">
                                    <FireOutlined />
                                    <p>热门</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {
                            this.state.stateLock ? (this.state.Posts_arr.map((i) => {
                                const img = require('../../../portrait/' + this.state.prosts[i].photo + '.png').default
                                return (<ul className="Posts_list_ul" ket={i}>
                                    <li className="Posts_list_li">
                                        <img src={img} className="Posts_list_tou" />
                                        <a href={('./message?PostsId=' + this.state.prosts[i].id)}><p className="Posts_list_title">{this.state.prosts[i].title}</p></a>
                                        <div className="Posts_list_msg">
                                            <span className="Posts_list_name">{this.state.prosts[i].username}</span>
                                            <p className="Posts_list_l">|</p>
                                            <p className="Posts_list_time">发表时间:<span>{this.state.prosts[i].date.substring(0, 10)} {this.state.prosts[i].date.substring(11, 16)}</span></p>
                                            <p className="Posts_list_ll">|</p>
                                            <p className="Posts_list_relpy">回复量:{this.state.prosts[i].reply}</p>
                                        </div>
                                    </li>
                                    <hr />
                                </ul>)
                            })) : [<div>正在加载中</div>]
                        }

                    </div>

                    <div className="publish_posts">
                        <hr />
                        <p className="publish_posts_tie">发帖</p>
                        <hr />
                        <input className="publish_posts_title" ref="input1" />
                        <div className="chajian">
                            <img src={Fu} onClick={this.handlePoint} />
                            <img src={Do} onClick={this.handleFujian} />
                            <img src={Pic} onClick={this.handlePhoto} />
                        </div>
                        <div className="fufei" ref="fufei1">
                            <p>请输入要付费的内容</p>
                            <textarea className="pay_tontent" ref="textarea1"></textarea>
                            <p className="fufei_shoujia">售价</p>
                            <input ref="input5" />
                            <Button onClick={this.handlePointsubmit}>提交</Button>
                        </div>
                        <textarea className="publish_posts_content" ref="input2"></textarea>
                        <Button className="publish_posts_button" onClick={(e) => this.handleposts(e)}>发布帖子</Button>
                    </div>
                    <div className="content_list2">
                        <div className="report">
                            {/* <Button className="btn">发表新帖</Button> */}
                        </div>
                        <div className="hot">
                            <div className="model_title">
                                <span className="hot_model">本贴最热帖子</span>
                            </div>
                            <div className="news">
                                {
                                    this.state.stateLock ? (this.state.Posts_hot_arr.map((i) => {
                                        // const img = require('../../img/' + this.state.sundry[i].photo + '.png').default
                                        return (
                                            <div className="box_news">
                                                <a href={('./message?PostsId=' + this.state.Posts_hot[i].id)}><p>{this.state.Posts_hot[i].title}</p></a>
                                                {/* <p></p> */}
                                            </div>
                                        )
                                    })) : [<div>正在加载中</div>]
                                }
                            </div>
                        </div>
                        <div className="new_news">
                            <div className="model_title">
                                <span className="hot_model">本贴最新帖子</span>
                            </div>
                            <div className="news">
                                {
                                    this.state.stateLock ? (this.state.posts_tiem_arr.map((i) => {
                                        // const img = require('../../img/' + this.state.sundry[i].photo + '.png').default
                                        return (
                                            <div className="box_news">
                                                <a href={('./message?PostsId=' + this.state.posts_tiem[i].id)}><p>{this.state.posts_tiem[i].title}  -{this.state.posts_tiem[i].date.substring(5, 10)}</p></a>
                                                {/* <p></p> */}
                                            </div>
                                        )
                                    })) : [<div>正在加载中</div>]
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
