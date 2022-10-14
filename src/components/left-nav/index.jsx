import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import logo from "../../assets/images/logo.png";
import "./index.less";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends Component {
  // 1.使用map + 递归调用填写left-nav结构
  // getMenuNodes_map = (menuList) => {
  //   return menuList.map((item) => {
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes_map(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname; //声明当前页面的请求路径并赋值给path；

    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // console.log(this)
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        if (cItem) {
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    if (path.indexOf("/product") === "0") {
      path = "/product";
    }
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          // defaultSelectedKeys={[path]}//进入页面默认选中(针对第一次进入，使用一次))
          selectedKeys={[path]} //当前页面默认选中(动态变化)
          defaultOpenKeys={[openKey]} //默认
          mode="inline"
          theme="dark"
        >
          {/* {this.getMenuNodes_map(menuList)} */}
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
