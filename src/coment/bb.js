import React, { Component } from 'react'
import PageButton from ".";
import List from ".";

const listData = [{
    key: "001",
    idd: "001",
    title: "webstorm连接github，方便的管理仓库",
    time: "2016-12-01",
    tag: " git ",
    contents: "66666666666666！"
}] //等等等多条数据

export default class listBox extends Component {

    constructor(props) {
        super(props);
        this.pageNext = this.pageNext.bind(this);
        this.setPage = this.setPage.bind(this);
        this.state = {
            indexList: [],//当前渲染的页面数据
            totalData: listData,
            current: 1, //当前页码
            pageSize: 4, //每页显示的条数
            goValue: 0,  //要去的条数index
            totalPage: 0,//总页数
        };

    }

    componentWillMount() {
        //设置总页数
        this.setState({
            totalPage: Math.ceil(this.state.totalData.length / this.state.pageSize),
        })
        this.pageNext(this.state.goValue)

    }

    //设置内容
    setPage(num) {
        this.setState({
            indexList: this.state.totalData.slice(num, num + this.state.pageSize)
        })
    }


    pageNext(num) {
        this.setPage(num)
    }



    render() {

        return (
            <div className="main">
                <div className="top_bar">
                </div>
                <div className="lists">
                    <ul className="index">
                        {this.state.indexList.map(function (cont) {
                            return <List {...cont} />
                        })}
                    </ul>

                    <PageButton {...this.state} pageNext={this.pageNext} />

                </div>
            </div>
        );
    }
}