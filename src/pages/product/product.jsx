import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductAddUpdate from "./add-update";

export default class Product extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/product" component={ProductHome}></Route>
          <Route exact path="/product/detail" component={ProductDetail}></Route>
          <Route exact
            path="/product/addupdate"
            component={ProductAddUpdate}
          ></Route>
          <Redirect to="/product"/>
        </Switch>
      </Router>
    );
  }
}
