import React, { Component } from 'react'
import { Button, notification } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import axios from 'axios'
import './index.css'
import sectionStyle from '../../../../utils/text'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false,
            Refresh: false,
            Payshow: false,
            show: false,
            replyshow: false,
            collect: false
        })
    }



    UNSAFE_componentWillMount() {

        const url = decodeURI(window.location.href);
        const sub = url.indexOf('=')
        const id = url.substring(sub + 1, url.length)
        const aa = []
        const bb = []
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        axios.get('http://localhost:3000/api1/message?id=' + id + "&&uid=" + isAuth.id).then(
            response => {
                const res = response.data.res
                const medal = response.data.bb
                console.log(response.data.isCol);
                let medal_arr = new Array(medal.length).fill('').map((item, index) => index);
                let filterResult = res.filter(value => new RegExp('null', 'i').test(value.recode));
                console.log(filterResult)
                let message_arr = new Array(filterResult.length).fill('').map((item, index) => index);
                message_arr.map((item) => {
                    aa.push(filterResult[item])
                })
                message_arr.map((item) => {
                    // console.log(res[item].isPay)
                    if (filterResult[item].isPay == "true") {
                        // console.log(res[item].isPay)
                        bb.push(filterResult[item])
                        // console.log(bb[0].id)
                        const Payid = bb[0].id
                        axios.get('http://localhost:3000/api1/message?Payid=' + Payid + "&&Checkid=" + isAuth.id).then(
                            response => {
                                const res = response.data
                                console.log(res)
                                console.log(res[0][0])
                                console.log(res[1][0])
                                if (res[0][0] != undefined && res[1][0] != undefined) {
                                    console.log("res00为Undefined");
                                    this.setState({
                                        Payshow: true,
                                        PayMes: res[0][0],
                                        stateLock: true,
                                        show: true,
                                    })
                                }
                                else if (res[0][0] == undefined) {
                                    console.log("res为Undefined");
                                    this.setState({
                                        Payshow: false,
                                        PayMes: res[0][0],
                                        stateLock: true,
                                        show: false,
                                    })
                                }
                                else if (res[0][0] != undefined && res[1][0] == undefined) {
                                    console.log("res为Undefined");
                                    this.setState({
                                        Payshow: false,
                                        PayMes: res[0][0],
                                        stateLock: true,
                                        show: true,
                                    })
                                }
                            }
                        )
                    }
                    else {
                        this.setState({
                            message_arr,
                            message: aa,
                            res,
                            stateLock: false,
                            show: false
                        })
                    }
                })
                this.setState({
                    title: response.data.title,
                    medal_arr,
                    message_arr,
                    medal,
                    message: aa,
                    res,
                    stateLock: true,
                    collect: response.data.isCol,
                })
            }
        )
    }

    componentDidMount() {
        // axios.get("")
        setTimeout(() => {
            this.onEdit()
        }, 100);
    }
    handleposts = () => {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        const msg = this.refs.input1.value
        const url = decodeURI(window.location.href);
        const sub = url.indexOf('=')
        const id = url.substring(sub + 1, url.length)
        const Refresh = this.state.Refresh
        let msgg = []
        axios.get('http://localhost:3000/api1/message?id=' + id + '&&username=' + isAuth.name + '&&message=' + msg + '&&photo=' + isAuth.photo + '&&point=undefined').then(
            response => {
                console.log(response.data)
                const res = response.data
                if (res == false) {
                    notification['error']({
                        message: '发送失败',
                        description:
                            '内容含有敏感词',
                    })
                }
                else {
                    let filterResult = res.filter(value => new RegExp('null', 'i').test(value.recode));
                    console.log(filterResult)
                    let message_arr = new Array(filterResult.length).fill('').map((item, index) => index);
                    console.log(message_arr)
                    message_arr.map((item) => {
                        msgg.push(filterResult[item])
                    })
                    console.log(msgg)
                    this.refs.input1.value = ''
                    this.setState({
                        message_arr,
                        message: msgg,
                        res,
                        stateLock: true
                    })
                }

            }
        )
    }

    Buy = () => {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        const owner = this.state.message[0].username
        const payid = this.state.PayMes.id
        const id = isAuth.id
        const point = this.state.PayMes.point
        axios.get("http://localhost:3000/api1/message?Userid=" + id + "&&point=" + point + "&&pensvie=" + payid + "&&owner=" + owner).then(
            response => {
                const res = response.data
                console.log(res)
                if (res[0] == undefined) {
                    alert("积分不足")
                    this.setState({
                        Payshow: false,
                    })
                }
                else {
                    this.setState({
                        Payshow: true,
                        stateLock: true,
                    })
                }
            }
        )
    }


    onEdit = (e) => {
        const message_ul = this.refs.message_ul
        const gif1 = this.refs.message_ul
        var arr = Object.keys(Array.apply(null, { length: this.state.message.length })).map(function (item) {        //获取总共有多少数据从1开始的数组
            return item = item * 1 + 1;
        });
        const brr = new Array(arr.length).fill('').map((item, index) => index);                                     //从0开始循环遍历每个textarea
        const bb = arr.map((i) => { return message_ul.children[i].children[1].children[1] })
        brr.map((i) => {
            bb[i].style.height = 'auto';
            if (bb[i].scrollHeight >= bb[i].offsetHeight) {
                bb[i].style.height = bb[i].scrollHeight + 'px'
            }
        })
        arr.map((i) => {                                                                                        //设置勋章的宽度
            let medal_length = gif1.children[i].children[0].children.length - 2
            var aa_arr = Object.keys(Array.apply(null, { length: medal_length })).map(function (item) {        //获取总共有多少数据从2开始的数组
                return item = item * 1 + 2;
            })
            aa_arr.map((k) => {
                let ad = gif1.children[i].children[0].children[k].children[0]
                if (ad.scrollWidth >= 200) {
                    ad.style.width = "100px"
                    ad.style.height = "100px"
                }
            })
        })
    }

    handelReplyShow = (e) => {
        const show = this.state.replyshow
        const ac = e.currentTarget.parentNode.children
        if (show == false) {
            ac[ac.length - 1].className = "reply_mes_xq reply_show"
        }
        else {
            ac[ac.length - 1].className = "reply_mes_xq"
        }
        this.setState({
            replyshow: !show
        })

    }
    handleReply = (e) => {
        let msgg = []
        const ac = e.currentTarget.parentNode.children
        const code = e.currentTarget.parentNode.parentNode.id
        const reply = ac[ac.length - 2].value
        const url = decodeURI(window.location.href);
        const sub = url.indexOf('=')
        const id = url.substring(sub + 1, url.length)
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(code)
        axios.get('http://localhost:3000/api1/message?id=' + id + '&&username=' + isAuth.name + '&&reply=' + reply + '&&photo=' + isAuth.photo + '&&code=' + code).then(
            response => {
                console.log(response.data)
                const res = response.data
                if (res == false) {
                    notification['error']({
                        message: '发送失败',
                        description:
                            '内容含有敏感词',
                    })
                }
                else {
                    ac[ac.length - 2].value = ''
                    this.setState({
                        res,
                    })
                }

            }
        )
        // console.log(111)
    }
    handlecollection = (e) => {
        const url = decodeURI(window.location.href);
        const sub = url.indexOf('=')
        const id = url.substring(sub + 1, url.length)
        const col = this.state.collect
        const isAuth = JSON.parse(localStorage.getItem("phone"))

        // console.log(col);
        if (col == false) {
            console.log(111);
            axios.get("http://localhost:3000/api1/message?colid=" + isAuth.id + "&&Poid=" + id).then(
                response => {
                    const res = response.data
                    if (res == true) {
                        notification['success']({
                            message: '收藏成功',
                            description:
                                '成功收藏',
                        });
                    }
                }
            )
        }
        else {
            console.log(2222);
            axios.get("http://localhost:3000/api1/message?colid=" + isAuth.id + "&&Poid=" + id + "&&dele=true").then(
                response => {
                    const res = response.data
                    if (res == true) {
                        notification['success']({
                            message: '取消收藏',
                            description:
                                '成功取消收藏',
                        });
                    }
                }
            )
        }
        this.setState({
            collect: !col
        })

    }
    render() {
        // console.log(this.state.collect);
        console.log(this.state.message);

        const isAuth = JSON.parse(localStorage.getItem("phone"))
        if (isAuth != undefined) {
            var userimg = require('../../../../portrait/' + isAuth.photo + '.png').default
        }
        return (
            <div className="message_info" style={sectionStyle}>
                <div className="message_info_aa">
                    <div className="message_center">
                        <ul className="message_ul" ref="message_ul">
                            <p className="message_right_title">{this.state.title}</p>
                            {
                                this.state.stateLock ? (this.state.message_arr.map((i) => {
                                    const img = require('../../../../portrait/' + this.state.message[i].photo + '.png').default
                                    const num = this.state.res[i].code
                                    const reply = this.state.res.filter(value => new RegExp(num, 'i').test(value.recode));
                                    const reply_arr = new Array(reply.length).fill('').map((item, index) => index);
                                    return (<li className="message_li" key={i} >
                                        <div className="message_left">
                                            <p className="message_username">{this.state.message[i].username}</p>
                                            <img src={img} className="message_user_img" />
                                            {
                                                this.state.medal_arr.map((k) => {
                                                    const gif = require('../../../../medal/' + this.state.medal[k].medalphoto + '.gif').default
                                                    if (this.state.message[i].username == this.state.medal[k].username) {
                                                        return (<div className="message_medal_img_div"><img src={gif} /></div>)
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className="message_right" id={this.state.message[i].code}>
                                            <p className="message_right_time">发表于: <span>{this.state.message[i].date.substring(0, 10)} {this.state.message[i].date.substring(12, 16)}</span></p>
                                            <textarea value={this.state.message[i].mssage.replace(/br/g, " \n ").replace(/nbsp/g, ' ')} className="message_right_p" readOnly="readOnly" ref="textarea1"></textarea>
                                            <Button className="reply_mes" onClick={(e) => this.handelReplyShow(e)}>回复</Button>
                                            <div className="reply_mes_xq">
                                                <ul>
                                                    {
                                                        (reply != '') ? (reply_arr.map((item) => {
                                                            const pic = require('../../../../portrait/' + reply[item].photo + '.png').default
                                                            return (
                                                                <li className="reply_mes_xq_li">
                                                                    <img src={pic} className="reply_msg_img" />
                                                                    <p className="reply_mes_xq_name">{reply[item].username}：</p>
                                                                    <p className="reply_mes_xq_reply">{reply[item].mssage}</p>
                                                                    <p className="reply_mes_xq_time">{reply[item].date.substring(0, 10)} {reply[item].date.substring(12, 16)}</p>
                                                                </li>
                                                            )
                                                        })) : []
                                                    }
                                                </ul>
                                                <textarea ref="reply11" ></textarea>
                                                <Button onClick={(e) => this.handleReply(e)}>我也说一句</Button>
                                            </div>
                                        </div>
                                    </li>)
                                })) : [<div>正在加载中</div>]
                            }
                            {
                                this.state.show
                                    ? (this.state.Payshow
                                        ? (<p className="Pay_div">{this.state.PayMes.comtent}</p>)
                                        : (<div className="Pay_div"><p>请先购买</p><p className="Pay_p">需要积分：{this.state.PayMes.point}</p><Button className="Pay_button" onClick={this.Buy}>购买</Button></div>))
                                    : [<div></div>]
                            }
                        </ul>
                    </div>
                    <div className="publish_message">
                        <div className="publish_message_tu">
                            <img src={userimg} className="message_user_img" />
                        </div>
                        <textarea className="publish_message_content" ref="input1"></textarea>
                        <Button className="publish_message_button" onClick={(e) => this.handleposts(e)}>发布帖子</Button>
                    </div>
                    <div className="mesg_collect">
                        {
                            this.state.stateLock ? (
                                this.state.collect ? (<HeartFilled style={{ fontSize: '35px', color: 'red' }} onClick={(e) => this.handlecollection(e)} />) : <HeartFilled style={{ fontSize: '35px' }} onClick={(e) => this.handlecollection(e)} />
                            ) : [<div>正在加载中</div>]
                        }
                        {/* <HeartFilled style={{ fontSize: '35px' }} onClick={(e) => this.handlecollection(e)} /> */}
                    </div>
                </div>
            </div>
        )
    }
}
