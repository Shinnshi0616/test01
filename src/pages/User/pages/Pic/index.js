import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import uuid from 'react-uuid'
import { notification } from 'antd';


export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            file: "imageUrl:",
            imagePreviewUrl: '',
            MoveXX: '',
            MoveYY: '',
        })
    }
    UNSAFE_componentWillMount() {
        const isAuth = JSON.parse(localStorage.getItem("phone"))
        console.log(isAuth)
        this.setState({
            isAuth: isAuth,

        })
    }
    _handleSubmit(e) {
        e.preventDefault();
        axios({
            method: "Post",
            url: 'http://localhost:3000/api1/setting/Pic',
            data: {
                url: this.state.imagePreviewUrl,
                id: this.state.isAuth.id,
                name: this.state.isAuth.name,
                uuid: uuid(),
            },
            // maxPostSize: "-1"
        }).then(
            res => {
                console.log(res.data)
                // console.log(this.state.isAuth)
                localStorage.clear();
                localStorage.setItem("phone", JSON.stringify(res.data));
            }
        );
    }
    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(reader);
        console.log(file);

        let ddd = file.type.indexOf('png')
        if (ddd == -1) {
            notification['error']({
                message: '上传失败',
                description:
                    '只能上传PNG格式图片',
            })
        }
        else {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file)
        }

    }
    // componentDidUpdate() {

    //     if (this.state.imagePreviewUrl != '') {
    //         const mask = this.refs.mask1
    //         const img1 = this.refs.img1
    //         let moveX = mask.offsetLeft - img1.offsetLeft
    //         let moveY = mask.offsetTop
    //     } else {
    //         console.log(222);
    //     }
    // }
    render() {
        // console.log(this.state.isAuth)
        console.log(this.state.moveXX);

        let img = require('../../../../portrait/' + this.state.isAuth.photo + '.png').default
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<div>
                <div className="setting_img_bg" ref="img_div1">
                    < img src={imagePreviewUrl} ref="img1" />
                </div>
            </div>
            );
        } else {
            let img2 = require('../../../../portrait/setting_img_default.png').default
            $imagePreview = (<div className="setting_img_bg">
                <img src={img2} />
            </div>);
        }
        return (
            <div>
                <div>
                    <p>当前头像</p>
                    <img src={img} className="setting_img" />
                    <p>提示：头像上传成功后，请按ctrl+f5刷新网页查看最新头像显示效果</p>
                    <div>
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <input className="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} />
                            <button className="submitButton" type="submit" onClick={(e) => this._handleSubmit(e)}>上传图片</button>
                        </form>
                    </div>
                    {$imagePreview}
                </div>
            </div>
        )
    }
}
