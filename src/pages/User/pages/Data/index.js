import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import { Button } from 'antd';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            truethname: '',
            Usersex: '',
            brith: '',
            place: '',
            sign: '',
        })
    }



    _handleSubmit = (e) => {
        e.preventDefault();
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(this.state.truethname, this.state.Usersex, this.state.brith, this.state.place, this.state.sign)
        axios.get('http://localhost:3000/api1/setting/data?truethname=' + this.state.truethname + '&&Usersex=' + this.state.Usersex + '&&brith=' + this.state.brith + '&&place=' + this.state.place + '&&sign=' + this.state.sign + '&&id=' + isAuth.id).then(
            response => {
                console.log(response.data)
            }
        )
    }
    truethname = (e) => {
        const isshow = e.target.parentNode.children
        if (isshow[isshow.length - 1].value == "true") {
            console.log(111)
            this.setState({
                truethname: e.target.value
            })
        }
        else {
            this.setState({
                truethname: ''
            })
        }
    }

    Usersex = (e) => {
        const isshow = e.target.parentNode.children
        if (isshow[isshow.length - 1].value == "true") {
            console.log(111)
            this.setState({
                Usersex: e.target.value
            })
        }
        else {
            this.setState({
                Usersex: ''
            })
        }
    }

    brith = (e) => {
        // console.log(e.target.value)
        const year = this.refs.year.value
        const month = this.refs.month.value
        const day = this.refs.day.value
        const brith = year + '-' + month + '-' + day
        const isshow = e.target.parentNode.children
        if (isshow[isshow.length - 1].value == "true") {
            console.log(111)
            this.setState({
                brith: brith
            })
        }
        else {
            this.setState({
                brith: ''
            })
        }
    }

    place = (e) => {
        const isshow = e.target.parentNode.children
        if (isshow[isshow.length - 1].value == "true") {
            console.log(111)
            this.setState({
                place: e.target.value
            })
        }
        else {
            this.setState({
                place: ''
            })
        }
    }

    sign = (e) => {
        const isshow = e.target.parentNode.children
        if (isshow[isshow.length - 1].value == "true") {
            console.log(111)
            this.setState({
                sign: e.target.value
            })
        }
        else {
            this.setState({
                sign: ''
            })
        }
    }

    render() {
        // console.log(this.state.Usersex)
        const arr2 = Array.apply(null, { length: 122 }).map((v, i) => i)
        var arr = Object.keys(Array.apply(null, { length: 122 })).map(function (item) {
            let year = 2022 - item * 1
            return item = year - 1;
        });
        const arr3 = Array.apply(null, { length: 12 }).map((v, i) => i)
        var arr4 = Object.keys(Array.apply(null, { length: 12 })).map(function (item) {
            return item = 1 * item + 1;
        });
        const arr5 = Array.apply(null, { length: 30 }).map((v, i) => i)
        var arr6 = Object.keys(Array.apply(null, { length: 30 })).map(function (item) {
            return item = 1 * item + 1;
        });
        // console.log(arr4)
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        // console.log(isAuth)
        return (
            <div>
                <div>
                    <form onSubmit={(e) => this._handleSubmit(e)}>
                        <ul className="User_data_ul">
                            <li>
                                <p>用户名</p>
                                <p>{isAuth.name}</p>

                            </li>
                            <li onChange={(e) => this.Usersex(e)}>
                                <p>性别</p>
                                <select className="User_data_sex">
                                    <option>男</option>
                                    <option>女</option>
                                </select>
                                <select className="User_data_show" >
                                    <option value="false">隐藏</option>
                                    <option value="true" >公开</option>
                                </select>

                            </li>
                            <li>
                                <p>真实姓名</p>
                                <input className="User_data_trueName" onChange={(e) => this.truethname(e)} />
                                <select className="User_data_show">
                                    <option value="false">隐藏</option>
                                    <option value="true" >公开</option>
                                </select>
                            </li>
                            <li className="User_data_time" onChange={(e) => this.brith(e)} >
                                <p>生日</p>
                                <select className="User_data_year" ref="year">
                                    {
                                        arr2.map((i) => {
                                            return (
                                                <option key={i}>{arr[i]}</option>
                                            )
                                        })
                                    }

                                </select>
                                <select className="User_data_month" ref="month">
                                    {
                                        arr3.map((i) => {
                                            return (
                                                <option key={i}>{arr4[i]}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="User_data_day" ref="day">
                                    {
                                        arr5.map((i) => {
                                            return (
                                                <option key={i}>{arr6[i]}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className="User_data_show">
                                    <option value="false">隐藏</option>
                                    <option value="true" >公开</option>
                                </select>
                            </li>
                            <li>
                                <p>出生地</p>
                                <input className="user_data_place" ref="place" onChange={(e) => this.place(e)} />
                                <select className="User_data_show"  >
                                    <option value="false">隐藏</option>
                                    <option value="true" >公开</option>
                                </select>
                            </li>
                            <li>
                                <p>个人签名</p>
                                <input className="user_data_sign" ref="sign" onChange={(e) => this.sign(e)} />
                                <select className="User_data_show" >
                                    <option value="false">隐藏</option>
                                    <option value="true" >公开</option>
                                </select>
                            </li>
                        </ul>
                        {/* <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} /> */}
                        <Button type="submit" onClick={(e) => this._handleSubmit(e)}>提交</Button>
                    </form>
                </div>
            </div>
        )
    }
}
