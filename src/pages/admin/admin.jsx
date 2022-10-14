import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";
import Home from "../home/home";

import memoryUtils from "../../utils/memoryUtils";

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    // console.log("sfdsdf", user);
    //内存中没有存储user ===> 当前没有登录
    if (!user || !user._id) {
      //自动跳转到登录界面（在render中用<Redirect/>跳转，在回调函数中用history.replace方法跳转）
      return <Redirect to="/Login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin:20, backgroundColor: "#fff" }}>
            <Switch>
            <Route path="/home" component={Home} />
            <Route path="/category" component={Category} />
            <Route path="/product" component={Product} />
            <Route path="/role" component={Role} />
            <Route path="/user" component={User} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/pie" component={Pie} />
            <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
//重定向组件：输入任意路径都会返回指定路径的页面