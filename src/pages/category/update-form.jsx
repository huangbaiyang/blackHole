import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
class UpdateForm extends Component {
  // 对传入的categoryName的属性值进行类型限制
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const categoryName = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: "",
            rules: [{ required: true, message: "分类名称必须输入" }],
          })(<Input placeholder="请输入分类名称"></Input>)}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(UpdateForm);
