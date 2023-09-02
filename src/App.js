import React, { Component } from 'react'
import { BrowserRouter, Link, Redirect, Switch, Route, withRouter } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/index'
import Sign from './pages/sign'
import Mission from './pages/Mission'
import Medal from './pages/Medal'
import Clock from './pages/Clock'
import Search from './pages/search'
import Admin from './pages/admin'
import Another from './coment/bb'
import Content from './pages/Home/content'
import Message from './pages/Home/content/message'
import User from './pages/User'
import Information from './pages/Information'
import Admin_login from './pages/admin/adminPg/admin_login'
import './App.css'
import { SearchOutlined } from '@ant-design/icons'
import logo from './logo.gif'
import store from './redux/store'
import { Button } from 'antd';
import axios from 'axios';




class App extends Component {
    constructor(props) {
        super(props);
        // const isAuth = store.getState()
        this.state = ({
            lists: [1, 2, 3, 4, 5],
            isAuth: "false",
            isadmin: false,
        })
    }

    UNSAFE_componentWillMount() {
        const pathname = this.props.history.location.pathname.substring(1)
        console.log(pathname)
        if (pathname == "admin_login") {
            this.setState({
                isadmin: true
            })
        }
        const admin = store.getState()
        console.log(admin);
        this.setState({
            count: store.getState()
        })
    }

    myRef = React.createRef()
    removeColor = () => {
        var li = this.myRef.current.children
        this.state.lists.map((item) => {
            li[item].removeAttribute("class", "cur");
            li[item].children[0].removeAttribute("style", "color");
        })


    }
    changeColor = (e) => {
        this.removeColor()
        e.currentTarget.className = "cur"
        e.currentTarget.children[0].style.color = '#6ad1dd'
    }
    searchTitle = () => {
        var input = this.refs.input1
        if (input.clientWidth === 0) {
            input.style.display = "block"
            setTimeout(() => {
                input.style.width = 150 + "px"
            }, 10);
        }
        else {
            input.style.width = 0 + "px"
            setTimeout(() => {
                input.style.display = "none"
            }, 810);
        }
    }
    Layout = () => {
        localStorage.clear();
        this.props.history.replace('/login')
        this.setState({
            user: null
        })
    }

    handleSearch = (e) => {
        if (e.keyCode !== 13) return
        console.log(e.target.value)
        console.log(this)
        const title = e.target.value
        this.props.history.replace(`/search?title=${title}`)
        window.location.reload();
    }
    render() {
        let isAuth = JSON.parse(localStorage.getItem("phone"))
        let isadmin = ''
        let bb = store.getState()
        console.log(bb)
        console.log(bb.isAdmind)
        if (bb.isAdmind == undefined) {
            isadmin = false
        }
        else {
            isadmin = true
        }
        let count = JSON.parse(localStorage.getItem("count"))
        let name = ''
        const arr = [1]
        return (
            <BrowserRouter>
                {
                    isadmin ? (<div></div>) : [<div id="nav"><ul className="navList" ref={this.myRef}>
                        <img src={logo} />
                        <li onClick={(e) => this.changeColor(e)} className="cur">
                            <Link to='/home' style={{ color: '#6ad1dd' }}>论坛</Link>
                        </li>
                        <li onClick={(e) => this.changeColor(e)}>
                            <Link to='/mission'>任务</Link>
                        </li>
                        <li onClick={(e) => this.changeColor(e)}>
                            <Link to='/medal'>勋章</Link>
                        </li>
                        <li onClick={(e) => this.changeColor(e)}>
                            <Link to='/clock'>签到</Link>
                        </li>
                        <li onClick={(e) => this.changeColor(e)}>
                            <Link to='/another'>其他</Link>
                        </li>

                        <Link to='/content'></Link>
                        <Link to='/message'></Link>
                        <Link to='/setting'></Link>
                        <Link to='/search'></Link>
                        <Link to='/amidn'></Link>
                        <Link to='/information'></Link>
                        <Link to='/admin_login'></Link>
                        <div className="Sear">
                            <input type="text" ref="input1" onKeyUp={(e) => this.handleSearch(e)} />
                            <SearchOutlined className="search" onClick={() => this.searchTitle()} />
                            {/* <Button onClick={this.handleclick}>aaa</Button> */}
                        </div>
                        {

                            isAuth = (isAuth == null || isAuth == '') ? (<div className="sign"><Link to='/login'>登陆</Link><Link to='/sign'>注册</Link></div>) : (
                                arr.map((i) => {
                                    let img = require('./portrait/' + isAuth.photo + '.png').default
                                    return (
                                        <div className="user_img" key={i}>
                                            <img src={img} className="user_app_img" />
                                            <a href="" className="sign_a" >{isAuth.name}</a>
                                            {
                                                count != null && count != 0 ? (<a className="red_reply_msg"><p>{count}</p></a>) : (<div></div>)
                                            }
                                            <div className="user_info">
                                                <a href={('http://localhost:3000/information')}>个人</a>
                                                <a href={('http://localhost:3000/setting')}>设置</a>
                                                <a onClick={() => this.Layout()}>退出</a>
                                            </div>
                                        </div>
                                    )

                                })
                            )
                        }

                    </ul>  </div>]
                }


                <Switch>
                    <Route exact path='/home' component={Home}></Route>
                    <Route path='/mission' component={Mission}></Route>
                    <Route path='/medal' component={Medal}></Route>
                    <Route path='/clock' component={Clock}></Route>
                    <Route path='/another' component={Another}></Route>
                    <Route path='/Login' component={Login}></Route>
                    <Route path='/sign' component={Sign}></Route>
                    <Route path='/content' component={Content}></Route>
                    <Route path='/message' component={Message}></Route>
                    <Route path='/setting' component={User}></Route>
                    <Route path='/information' component={Information}></Route>
                    <Route path='/search' exact component={Search}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/admin_login' component={Admin_login}></Route>
                    <Redirect to={{ pathname: '/home', state: { from: '/' } }}></Redirect>
                </Switch>

            </BrowserRouter>
        )
    }
}

export default withRouter((App))
