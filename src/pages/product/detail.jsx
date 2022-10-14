import React, { Component } from "react";
import { Card, Icon, List } from "antd";

import { reqCategory } from "../../api/index";
import { BASE_IMG_URL } from "../../utils/constants";
import LinkButton from "../../components/link-button";

const Item = List.Item;
export default class ProductDetail extends Component {
  state = {
    cName1: "", //一级分类名称
    cName2: "", //二级分类名称
  };

  // async componentDidMount() {
  //   const { cName1, cName2 } = this.state;
  //   const { pCategoryId, categoryId } = this.props.location.state.product;
  //   console.log("ddd", this.props.location.state.product);
  //   const result = await reqCategory(categoryId);
  //   console.log("ccc",result);

  //   if (pCategoryId === "0") {
  //     const cName1 = result.data.name;
  //     this.setState({ cName1 });
  //   } else {
  //     const results = await Promise.all([
  //       reqCategory(pCategoryId),
  //       reqCategory(categoryId),
  //     ]);
  //     const cName1 = results[0].data.name;
  //     const cName2 = results[1].data.name;
  //     this.setState({
  //       cName1,
  //       cName2,
  //     });
  //   }
  // }
  componentWillMount() {}

  render() {
    //读取携带过来的state数据
    console.log("打印", this.props.location.state);
    const { name, desc, price, detail, imgs } =
      this.props.location.state.product;
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ marginRight: "15px", fontSize: "20px" }}
            onClick={() => this.props.history.goBack()}
          ></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类:</span>
            <span>
              {cName1}
              {cName2 ? "-->" + cName2 : null}
            </span>
          </Item>
          <Item>
            <span className="left">商品图片:</span>
            <span>
              {imgs.map((img) => (
                <img
                  className="product-img"
                  key={img}
                  src={BASE_IMG_URL + img}
                  alt=""
                />
              ))}
            </span>
          </Item>
          <Item>
            <span className="left">商品详情:</span>
            <div
              dangerouslySetInnerHTML={{
                __html: detail,
              }}
            ></div>
          </Item>
        </List>
      </Card>
    );
  }
}
