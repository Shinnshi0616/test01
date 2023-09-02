import React, { Component } from 'react'
import axios from 'axios';
import uuid from 'react-uuid'
import './index.css'
import { Button, notification } from 'antd';
// import moduleName from '../../../../img'

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            file: "imageUrl:",
            file2: "imageUrl:",
            file3: "imageUrl:",
            stateLock: false,
            ModelImg: [],
            img: [],
            show: [1],
            divshow: false
        })
    }


    UNSAFE_componentWillMount() {                                                   //初次加载
        const bb = []
        const cc = []
        const dd = []
        const ee = []
        const ff = []
        axios.get('http://localhost:3000/api1/admin_home').then(
            res => {
                console.log(res.data)
                //修改轮播图
                let lb_arr = new Array(res.data[0].length).fill('').map((item, index) => index);
                lb_arr.map((item) => {
                    cc.push(res.data[0][item].photo)
                })
                //修该公告
                let notice_arr = new Array(res.data[1].length).fill('').map((item, index) => index);
                notice_arr.map((item) => {
                    bb.push(res.data[1][item].title)
                })
                //删除小喇叭
                let horn_arr = new Array(res.data[2].length).fill('').map((item, index) => index);
                horn_arr.map((item) => {
                    dd.push(res.data[2][item])
                })
                //更改模块
                let model_arr = new Array(res.data[3].length).fill('').map((item, index) => index);
                model_arr.map((item) => {
                    ee.push(res.data[3][item])
                })
                model_arr.map((item) => {
                    ff.push({ photo: res.data[3][item].photo, title: res.data[3][item].title })
                })
                console.log(ff[0].title)
                const obj = ff.find(function (item) {
                    if (item.title == ff[0].title) {
                        return item.photo
                    }
                })
                console.log(obj)
                this.setState({
                    lb_arr,
                    notice_arr,
                    horn_arr,
                    model_arr,
                    bb,
                    cc,
                    dd,
                    ee,
                    ModelImg: ff,
                    img: obj,
                    stateLock: true
                })
            }
        )
    }

    _handleSubmit(e) {                                                   //提交修改的轮播图
        e.preventDefault();
        console.log(this.state.imagePreviewUrl);

        axios({
            method: "Post",
            url: 'http://localhost:3000/api1/admin_home',
            data: {
                imgurl: this.state.imagePreviewUrl,
                uuid: uuid()
            }
        }).then(
            res => {
                notification['success']({
                    message: '上传成功',
                    description:
                        '已成功上传轮播图',
                });
                console.log(res.data)
            }
        );
    }
    _handleImageChange(e) {                                                   //上传图片到浏览器
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    ModelchangeSubmit(e) {                                                   //提交修改的模块图片
        e.preventDefault();
        console.log(this.state.imagePreviewUrl2);
        const photo = this.state.img.photo
        console.log(photo)
        axios({
            method: "Post",
            url: 'http://localhost:3000/api1/admin_home',
            data: {
                imgurl2: this.state.imagePreviewUrl2,
                uuid2: uuid(),
                photo: photo
            }
        }).then(
            res => {
                notification['success']({
                    message: '上传成功',
                    description:
                        '已成功上传轮播图',
                });
                console.log(res.data)
            }
        );
    }

    ModelImageChange(e) {                                                   //上传图片到浏览器
        e.preventDefault();
        let reader = new FileReader();
        let file2 = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file2: file2,
                imagePreviewUrl2: reader.result
            });
        }
        reader.readAsDataURL(file2)
    }

    InsertModelImg(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file3 = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file3: file3,
                imagePreviewUrl3: reader.result
            });
        }
        reader.readAsDataURL(file3)
    }
    InsertModelImgSubmit(e) {
        e.preventDefault();
        const title = this.refs.input4.value
        var select = this.refs.select2.value
        if (select == "综合区") {
            select = 2
        }
        else if (select == "杂项") {
            select = 1
        }
        console.log(title, select);

        axios({
            method: "Post",
            url: 'http://localhost:3000/api1/admin_home',
            data: {
                imgurl3: this.state.imagePreviewUrl3,
                uuid3: uuid(),
                title: title,
                model: select
            }
        }).then(
            res => {
                notification['success']({
                    message: '上传成功',
                    description:
                        '已成功上传',
                });
                console.log(res.data)
            }
        );
    }
    handleDelete = (e) => {                                                   //删除轮播图
        const cc = []
        console.log(e.target.id)
        axios.get('http://localhost:3000/api1/admin_home?photo=' + e.target.id).then(
            res => {
                console.log(res.data)
                let lb_arr = new Array(res.data.length).fill('').map((item, index) => index);
                lb_arr.map((item) => {
                    cc.push(res.data[item].photo)
                })
                notification['success']({
                    message: '删除成功',
                    description:
                        '已删除所选轮播图',
                });
                this.setState({
                    lb_arr,
                    cc,
                    stateLock: true
                })
            })
    }
    NoticeDelete = (e) => {                                                   //删除公告
        const bb = []
        const title = this.refs.select1.value
        // console.log(title)
        axios.get('http://localhost:3000/api1/admin_home?title=' + title + '&&photo=undefined').then(
            res => {
                console.log(res.data)
                //修该公告
                let notice_arr = new Array(res.data.length).fill('').map((item, index) => index);
                notice_arr.map((item) => {
                    bb.push(res.data[item].title)
                })
                notification['success']({
                    message: '删除成功',
                    description:
                        '已删除所选公告',
                });
                this.setState({
                    notice_arr,
                    bb,
                    stateLock: true
                })
            })
    }
    AddNotice = () => {                                                   //添加公告
        const bb = []
        // const a = "干"
        const title = this.refs.input1.value
        // console.log(title.indexOf(a));
        // if (title.indexOf(a) > -1) {
        //     alert("输入字符不能含有敏感词")
        // }
        // console.log(typeof title)
        if (title != '') {
            axios.get('http://localhost:3000/api1/admin_home?Addtitle=' + title + '&&photo=undefined').then(
                res => {
                    console.log(res.data)
                    //修该公告
                    let notice_arr = new Array(res.data.length).fill('').map((item, index) => index);
                    notice_arr.map((item) => {
                        bb.push(res.data[item].title)
                    })
                    notification['success']({
                        message: '上传成功',
                        description:
                            '已成功上传公告',
                    });
                    this.refs.input1.value = ''
                    this.setState({
                        notice_arr,
                        bb,
                        stateLock: true
                    })
                })
        }
    }


    HornDelete = (e) => {                                                   //删除小喇叭
        const dd = []
        const horn = this.refs.select2.value
        const sub = horn.indexOf('说：')
        const tt = horn.substring(sub + 1, horn.length)
        const comtent = tt.substring(1)
        const name = horn.substring(0, sub)
        console.log(name);

        axios.get('http://localhost:3000/api1/admin_home?horn=' + comtent + '&&photo=undefined' + '&&name=' + name).then(
            res => {
                // console.log(res.data)
                //修该公告
                let horn_arr = new Array(res.data.length).fill('').map((item, index) => index);
                horn_arr.map((item) => {
                    dd.push(res.data[item])
                })
                // console.log(dd);

                notification['success']({
                    message: '删除成功',
                    description:
                        '已删除所选公告',
                });
                this.setState({
                    horn_arr,
                    dd,
                    stateLock: true
                })
            })
    }

    ModelImg = (e) => {                                                   //根据名称查询模块的图片
        console.log(e.target.value)
        const title = e.target.value
        const obj = this.state.ModelImg.find(function (item) {
            if (item.title == title) {
                return item.photo
            }
        })
        this.setState({
            img: obj
        })
    }
    ChandeModelimg = (e) => {                                               //修改图片box框
        e.preventDefault();

        const div = this.refs.div1
        // console.log(div.style.display)
        const divshow = this.state.divshow
        this.setState({
            divshow: !divshow
        }, () => {
            if (this.state.divshow == true) {
                div.style.display = "block"
                setTimeout(() => {
                    div.style.height = 300 + "px"
                }, 1);


                console.log(div.style.height)
            }
            else {
                div.style.height = 0 + "px"
                setTimeout(() => {
                    div.style.display = "none"
                }, 1500);

                console.log(div.style.height)
            }
        })

        // console.log(div.style.display)
    }
    ChangeModelTitle = () => {                                                   //更改模块标题
        const ee = []
        console.log(this.state.img.title);
        const localTitle = this.state.img.title
        const Changetitle = this.refs.input3.value
        // console.log(title);
        axios.get('http://localhost:3000/api1/admin_home?Changetitle=' + Changetitle + '&&photo=undefined' + '&&localTitle=' + localTitle).then(
            res => {
                console.log(res.data)
                //修该公告
                let model_arr = new Array(res.data.length).fill('').map((item, index) => index);
                model_arr.map((item) => {
                    ee.push(res.data[item])
                })
                notification['success']({
                    message: '修改成功',
                    description:
                        '已成功修改模块标题',
                });
                this.refs.input3.value = ''
                this.setState({
                    model_arr,
                    ee,
                    stateLock: true
                })
            })
    }
    DeleteModel = () => {
        console.log(this.state.img.title)
        const title = this.state.img.title
        const ee = []
        axios.get("http://localhost:3000/api1/admin_home?deletitle=" + title + '&&photo=undefined').then(
            response => {
                const res = response.data
                let model_arr = new Array(res.length).fill('').map((item, index) => index);
                model_arr.map((item) => {
                    ee.push(res[item])
                })
                this.setState({
                    model_arr,
                    ee,
                    stateLock: true
                })
            }
        )
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (< img src={imagePreviewUrl} className="admin_home_lb_img" />);
        }
        let { imagePreviewUrl2 } = this.state;
        let $imagePreview2 = null;
        if (imagePreviewUrl2) {
            $imagePreview2 = (< img src={imagePreviewUrl2} className="admin_home_model_img" />);
        }
        let { imagePreviewUrl3 } = this.state;
        let $imagePreview3 = null;
        if (imagePreviewUrl3) {
            $imagePreview3 = (< img src={imagePreviewUrl3} className="admin_home_model_img2" />);
        }
        return (
            <div className="admin_home">
                <div className="admin_home_div">
                    <p className="admin_home_lb_p">更改轮播图</p>
                    {
                        this.state.stateLock ? (this.state.lb_arr.map((i) => {
                            const img = require('../../../../img/' + this.state.cc[i] + '.png').default
                            return (<div key={i} className="admin_loop_box">
                                <img src={img} className="admin_loop" alt="text" />
                                <p className="admin_loop_delete" id={this.state.cc[i]} onClick={(e) => this.handleDelete(e)}>X</p>
                            </div>)
                        })) : [<div>正在加载中</div>]
                    }
                    <div>
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} />
                            <button className="submitButton" type="submit" onClick={(e) => this._handleSubmit(e)}>上传图片</button>
                        </form>
                    </div>
                    {$imagePreview}
                </div>
                <div className="admin_notice">
                    <p className="admin_home_notice_p">修改公告</p>
                    <select ref="select1">
                        {
                            this.state.stateLock ? (this.state.notice_arr.map((i) => {
                                return (
                                    <option key={i}>{this.state.bb[i]}</option>
                                )
                            })) : [<div>正在加载中</div>]
                        }
                        {/* <option>1111</option> */}
                    </select>
                    <Button onClick={(e) => this.NoticeDelete(e)}>删除</Button>
                     添加公告：
                    <input ref="input1" />
                    <Button onClick={(e) => this.AddNotice(e)}>上传</Button>
                </div>
                <div className="admin_horn">
                    <p className="admin_home_horn_p">删除小喇叭</p>
                    <select ref="select2" size="10">
                        {
                            this.state.stateLock ? (this.state.horn_arr.map((i) => {
                                return (
                                    <option key={i}>{this.state.dd[i].username} 说：{this.state.dd[i].comtent}</option>
                                )
                            })) : [<div>正在加载中</div>]
                        }
                    </select>
                    <Button onClick={(e) => this.HornDelete(e)}>删除</Button>
                </div>
                <div className="admin_area_left">
                    <p className="admin_home_horn_p">更改或删除模块</p>
                    <div className="admin_area_box">
                        {
                            this.state.stateLock ? (this.state.show.map((i) => {
                                const img = require('../../../../img/' + this.state.img.photo + '.png').default
                                return (<img src={img} key={i} className="admin_area_box_img" />)
                            })

                            ) : [<div>正在加载中</div>]
                        }

                        <select onChange={(e) => this.ModelImg(e)}>
                            {
                                this.state.stateLock ? (this.state.model_arr.map((i) => {
                                    return (
                                        <option key={i}>{this.state.ee[i].title}</option>
                                    )
                                })) : [<div>正在加载中</div>]
                            }
                        </select>
                        <Button onClick={(e) => this.ChandeModelimg(e)}>更换图片</Button>
                        <div className="changeimgshow" ref="div1">
                            <form>
                                <input className="fileInput" type="file" onChange={(e) => this.ModelImageChange(e)} />
                                <Button className="changeimgshow_button" type="submit" onClick={(e) => this.ModelchangeSubmit(e)}>上传图片</Button>
                            </form>
                            {$imagePreview2}
                        </div>
                        <input ref="input3" />
                        <Button onClick={this.ChangeModelTitle}>更换标题</Button>
                        <Button onClick={this.DeleteModel}>删除此模块</Button>
                    </div>
                </div>
                <div className="admin_area_right">
                    <p className="admin_home_horn_p">增加模块</p>
                    <div>
                        <form>
                            <input className="fileInput" type="file" onChange={(e) => this.InsertModelImg(e)} />
                            标题:
                            <input ref="input4" />
                            <select ref="select2">
                                <option>综合区</option>
                                <option>杂项</option>
                            </select>
                            <Button className="InsertModelImg" type="submit" onClick={(e) => this.InsertModelImgSubmit(e)}>上传图片</Button>
                        </form>
                        {$imagePreview3}
                    </div>
                </div>
            </div >
        )
    }
}
