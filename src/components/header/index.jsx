import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";

import "./index.less";
// import logo from "../../assets/images/logo.png";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { formateDate } from "../../utils/dateUtils";
import { reqWeather } from "../../api/index";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/index"

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: "",
    weather: "",
  };
  getTime = () => {
    this.intervalId =  setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime });
    }, 1000);
  };

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather("北京");
    this.setState({ dayPictureUrl, weather });
  };
  getTitle = () => {
    // console.log(this);
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.key === path);
        //接下来判断cItem是否存在很重要，只有能找到cItem才能确定将title的值，不能忽略！
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  logout = () => {
    Modal.confirm({
      title: "确定退出吗?",
      content: "",
      onOk:() => {
        // console.log(this);
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
    });
  };

  componentDidMount() {
    //时间更新（）
    this.getTime();
    // 获取天气
    this.getWeather();
    this.getTitle();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { currentTime, dayPictureUrl, weather } = this.state;
    const { username } = memoryUtils.user;
    const title = this.getTitle();
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <LinkButton onClick={this.logout}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="暂无天气图片" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
