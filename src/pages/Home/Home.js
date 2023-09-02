import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
import { Carousel, Button, notification } from 'antd';
import 'antd/dist/antd.css';
import { SoundOutlined } from '@ant-design/icons';
import lb from '../../img';
import store from '../../redux/store'
import Content from './content'
import sectionStyle from '../../utils/text'



// const bg = Math.round(Math.random() * 15);
// let back = require('C:/Users/于嘉滨/Desktop/毕业设计/work/src/img/bg' + bg + '.png').default
// var sectionStyle = {
//     backgroundImage: "url('" + back + "')",
//     backgroundRepeat: "no-repeat",
//     zIndex: 0,
//     position: "relative",
//     minHeight: "100%",
//     backgroundSize: "100%",
//     backgroundAttachment: "fixed" + ',' + "scroll",
//     width: "100%",
// };
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            isShow: false,
            horn_msg: false
        })
    }
    UNSAFE_componentWillMount() {
        const cc = []
        const dd = []
        const ee = []
        const ff = []
        const gg = []
        const hh = []
        const ii = []
        let isAuth = JSON.parse(localStorage.getItem("phone"))
        axios.get(isAuth != null ? ('http://localhost:3000/api1/home?replyname=' + isAuth.name) : ('http://localhost:3000/api1/home')).then(
            response => {
                const res = response.data.homedata
                if (response.data.count != undefined) {
                    const count = response.data.count
                    console.log(count)
                    store.dispatch({ type: 'count', data: { count: count } })
                    console.log(store.getState())
                    localStorage.setItem("count", JSON.stringify(response.data.count));
                }


                console.log(res)
                //轮播图
                let lb_arr = new Array(res[0].length).fill('').map((item, index) => index);
                lb_arr.map((item) => {
                    cc.push(res[0][item].photo)
                })
                //公告
                let Notice_arr = new Array(res[1].length).fill('').map((item, index) => index);
                Notice_arr.map((item) => {
                    dd.push(res[1][item].title)
                })
                //综合区
                let comprehensive_arr = new Array(res[2].length).fill('').map((item, index) => index);
                comprehensive_arr.map((item) => {
                    ee.push(res[2][item])
                })
                //杂项
                let sundry_arr = new Array(res[3].length).fill('').map((item, index) => index);
                sundry_arr.map((item) => {
                    ff.push(res[3][item])
                })
                //热门板块，排序
                let hot_arr = new Array(res[4].length).fill('').map((item, index) => index);
                hot_arr.map((item) => {
                    gg.push(res[4][item])
                })
                //最新帖子
                let posts_arr = new Array(res[5].length).fill('').map((item, index) => index);
                posts_arr.map((item) => {
                    hh.push(res[5][item])
                })
                // console.log(hh)
                //小喇叭
                let horn_arr = new Array(res[6].length).fill('').map((item, index) => index);
                horn_arr.map((item) => {
                    ii.push(res[6][item])
                })
                this.setState({
                    lb_arr,
                    Notice_arr,
                    comprehensive_arr,
                    sundry_arr,
                    hot_arr,
                    posts_arr,
                    horn_arr,
                    aa: cc,
                    notice: dd,
                    comprehensive: ee,
                    sundry: ff,
                    hot: gg,
                    posts: hh,
                    horn: ii,
                    stateLock: true,
                })
            },
            error => {
                console.log('no', error)
            }
        )


    }

    Show = () => {
        const show = this.state.isShow
        var list = this.refs.content_list
        this.setState({
            isShow: !show
        }, () => {
            if (this.state.isShow === true) {

                list.style.display = "none"

            }
            else {
                list.style.display = "block"
            }
        })



    }
    handlemsg = (e) => {
        const ii = []
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        const input1 = this.refs.input1.value
        console.log(input1)
        if (isAuth != null) {
            if (input1 != '') {
                axios.get("http://localhost:3000/api1/home?username=" + isAuth.name + '&&comtent=' + input1).then(
                    response => {
                        if (response.data == false) {
                            notification['error']({
                                message: '发送失败',
                                description:
                                    '内容含有敏感词',
                            })
                        }
                        else {
                            axios.get('http://localhost:3000/api1/home/').then(
                                response => {
                                    const res = response.data.homedata
                                    console.log(res);

                                    let horn_arr = new Array(res[6].length).fill('').map((item, index) => index);
                                    horn_arr.map((item) => {
                                        ii.push(res[6][item])
                                    })
                                    this.refs.input1.value = ''
                                    this.setState({
                                        horn_arr,
                                        horn: ii,
                                    })
                                })
                        }

                    },
                    error => { }
                )
            }
            else {
                alert("输入框不能为空")
            }
        }
        else {
            alert("尚未登陆，请先登录")
            this.props.history.replace('/login')
        }
    }
    passVal = (e) => {

    }
    render() {
        const isAuth = store.getState()
        const { collapsed_no } = lb
        return (
            <div id="con" ref="con_div" style={sectionStyle}>
                <div className="con_opti">
                    <div className="container">
                        <div className="photo">
                            <Carousel autoplay >
                                {
                                    this.state.stateLock ? (this.state.lb_arr.map((i) => {
                                        const img = require('../../img/' + this.state.aa[i] + '.png').default
                                        return (<div key={i}>
                                            <img src={img} className="aa" alt="text" />
                                        </div>)
                                    })) : [<div>正在加载中</div>]
                                }
                            </Carousel>
                        </div>
                        <div className="notice">
                            <SoundOutlined className="voice" />
                            <Carousel dotPosition="left" autoplay dots="false">
                                {
                                    this.state.stateLock ? (this.state.Notice_arr.map((i) => {
                                        return (<div key={i}>
                                            <h3 className="bb">{this.state.notice[i]}</h3>
                                        </div>)
                                    })) : [<div>正在加载中</div>]
                                }
                            </Carousel>
                        </div>
                        <div className="content">
                            <div className="content_title">
                                <span className="con_span"></span>
                                <h3 className="con_title">小喇叭</h3>
                                <img src={collapsed_no} className="collapsed_no" onClick={() => this.Show()} />
                            </div>
                            <div className="content_list" ref="content_list">
                                <div>
                                    {
                                        this.state.stateLock ? (this.state.horn_arr.map((i) => {
                                            return (<ul key={i}>
                                                <li>
                                                    <p>{this.state.horn[i].username} 说：{this.state.horn[i].comtent}<span className="horn_time">{this.state.horn[i].date.substring(5, 10)}:{this.state.horn[i].date.substring(11, 16)}</span></p>
                                                </li>
                                            </ul>
                                            )
                                        })) : [<div>正在加载中</div>]
                                    }
                                </div>
                                <div className="horn_in">
                                    <input className="horn_input" ref="input1" />
                                    <Button onClick={(e) => this.handlemsg(e)}>发送</Button>
                                </div>
                            </div>
                        </div>
                        <div className="comprehensive">
                            <div className="content_title">
                                <span className="con_span"></span>
                                <h3 className="con_title">综合区</h3>
                            </div>
                            <hr />
                            <div className="comprehensive_div">
                                <ul>
                                    {
                                        this.state.stateLock ? (this.state.comprehensive_arr.map((i) => {
                                            const img = require('../../img/' + this.state.comprehensive[i].photo + '.png').default
                                            return (
                                                <li key={i} onClick={(e) => this.passVal(e)}>
                                                    <a href={('./content?type=' + this.state.comprehensive[i].type)}><img src={img} alt="text" className="home_model_img" /></a>
                                                    <div className="comprehensive_div_text">
                                                        <a href={('./content?type=' + this.state.comprehensive[i].type)}><p>{this.state.comprehensive[i].title}</p></a>
                                                        <p>贴子数：{this.state.comprehensive[i].count}</p>
                                                    </div>
                                                </li>
                                            )
                                        })) : [<div>正在加载中</div>]
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="comprehensive">
                            <div className="content_title">
                                <span className="con_span"></span>
                                <h3 className="con_title">杂项</h3>
                            </div>
                            <hr />
                            <div className="comprehensive_div">
                                <ul>
                                    {
                                        this.state.stateLock ? (this.state.sundry_arr.map((i) => {
                                            const img = require('../../img/' + this.state.sundry[i].photo + '.png').default
                                            return (
                                                <li key={i}>
                                                    <a href={('./content?type=' + this.state.sundry[i].type)}><img src={img} alt="text" className="home_model_img" /></a>
                                                    <div className="comprehensive_div_text" >
                                                        <a href={('./content?type=' + this.state.sundry[i].type)}><p>{this.state.sundry[i].title}</p></a>
                                                        <p>贴子数：{this.state.sundry[i].count}</p>
                                                    </div>
                                                </li>
                                            )
                                        })) : [<div>正在加载中</div>]
                                    }
                                    <hr />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="con_list">
                        <div className="report">
                            <Button className="btn">发表新帖</Button>
                        </div>
                        <div className="hot">
                            <div className="model_title">
                                <span className="hot_model">热门板块</span>
                            </div>
                            <ul>
                                {
                                    this.state.stateLock ? (this.state.hot_arr.map((i) => {
                                        return (
                                            <li key={i} className="left">
                                                <a href={('./content?type=' + this.state.hot[i].type)}><p>{this.state.hot[i].title}</p></a>

                                            </li>
                                        )
                                    })) : [<div>正在加载中</div>]
                                }
                            </ul>
                        </div>
                        <div className="new_news">
                            <div className="model_title">
                                <span className="hot_model">最新帖子</span>
                            </div>
                            <div className="news">
                                {
                                    this.state.stateLock ? (this.state.posts_arr.map((i) => {
                                        return (
                                            <div className="box_news" key={i}>
                                                <a href={('./message?Postsid=' + this.state.posts[i].id)}> <p>{this.state.posts[i].title} {this.state.posts[i].date.substring(5, 10)}</p></a>

                                                {/* <p></p> */}
                                            </div>
                                        )
                                    })) : [<div>正在加载中</div>]
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}
