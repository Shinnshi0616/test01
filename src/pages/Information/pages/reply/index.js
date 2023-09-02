import React, { Component } from 'react'
import './index.css'
import axios from 'axios';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stateLock: false
        })
    }

    UNSAFE_componentWillMount() {
        let isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(isAuth.id);
        const aa = []
        axios.get('http://localhost:3000/api1/information/reply?id= ' + isAuth.id).then(
            response => {
                // console.log(response.data);
                const res = response.data
                let reply_arr = new Array(res.length).fill('').map((item, index) => index);
                reply_arr.map((item) => {
                    aa.push(res[item])
                })
                console.log(res);
                this.setState({
                    reply_arr,
                    reply: aa,
                    stateLock: true
                })
            })
    }
    handleIsSee = (e) => {
        // console.log(e.target.parentNode.id)
        const code = e.target.parentNode.id
        const see = e.target.parentNode.parentNode.id
        let count = localStorage.getItem("count")
        console.log(see)
        console.log(count)
        if (see == "false") {
            count = count - 1
            localStorage.setItem("count", count)
        }
        axios.get('http://localhost:3000/api1/information/reply?code= ' + code).then(
            response => {
            })
    }
    render() {
        let isAuth = JSON.parse(localStorage.getItem("phone"))

        return (
            <div>

                {
                    this.state.stateLock ? (this.state.reply_arr.map((i) => {

                        return (
                            // 
                            <div className="reply_log" key={i} id={this.state.reply[i].see}>
                                <a href={('/message?PostsId=' + this.state.reply[i].id)} onClick={(e) => this.handleIsSee(e)} id={this.state.reply[i].code}>
                                    <p>{this.state.reply[i].username}</p>
                                    {
                                        isAuth != '' ? (<p>回复：{isAuth.name}:</p>) : []
                                    }
                                    <p>{this.state.reply[i].mssage}</p>
                                    {
                                        this.state.reply[i].see == "false" ? (<div className="nosee"></div>) : []
                                    }

                                </a>
                            </div>)

                    })) : [<div>正在加载中</div>]
                }

            </div>
        )
    }
}
