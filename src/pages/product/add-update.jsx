import React, { Component } from "react";
import { Card, Icon, Form, Input, Cascader, Button, message } from "antd";

import LinkButton from "../../components/link-button";
import { reqCategorys } from "../../api/";

const { Item } = Form;
const { TextArea } = Input;
const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    isLeaf: false,
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    isLeaf: false,
  },
];

class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  submit = () => {
    //提交之前必须进行表单校验，通过才能发送请求
    this.props.form.validateFields((error, values) => {
      if (!error) {
        alert("发送请求");
      }
    });
  };

  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback();
    } else {
      callback("价格必须大于0");
    }
  };

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    // load options lazily延迟加载选项
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
          isLeaf: true,
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
          isLeaf: true,
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  initOptions = (categorys) => {
    categorys.map((c)=> ({
      value: 
      label: "Jiangsu",
      isLeaf: false,
  
    }))
  }

  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      this.initOptions(categorys);
    }
  };
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ fontSize: 20 }}></Icon>
        </LinkButton>
        <span>添加商品</span>
      </span>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [{ required: true, message: "必须输入商品名称" }],
            })(<Input placeholder="请输入商品名称"></Input>)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: "",
              rules: [{ required: true, message: "必须输入商品描述" }],
            })(
              <TextArea
                placeholder="请输入商品描述"
                autoSize={{ minRows: 2, maxRows: 6 }}
              ></TextArea>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: "",
              rules: [{ required: true, message: "必须输入商品价格" }],
              validator: this.validatePrice,
            })(
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              ></Input>
            )}
          </Item>
          <Item label="商品分类">
            <Cascader options={this.state.options} loadData={this.loadData} />
          </Item>
          <Item label="商品图片">
            <div>商品图片</div>
          </Item>
          <Item label="商品详情">
            <div>商品详情</div>
          </Item>
          <Button type="primary" onClick={this.submit}>
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(ProductAddUpdate);
