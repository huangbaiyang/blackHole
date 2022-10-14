import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// BrowserRouter:路由器；Route：路由；Switch：精确匹配。
import Login from "./pages/login/login"; 
import Admin from "./pages/admin/admin";
//export：暴露（文件中分别声明多个export时为分别暴露）；export default:默认暴露（只暴露一个）；
export default class App extends Component {
  render() { 
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
