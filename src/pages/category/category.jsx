import React, { Component } from "react";
import { Card, Icon, message, Table, Modal } from "antd";

import UpdateForm from "./update-form";
import AddForm from "./add-form";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddCategorys, reqUpdateCategorys } from "../../api";

export default class Category extends Component {
  state = {
    categorys: [],
    loading: true,
    // 默认显示一级分类列表(初始化状态)
    parentId: "0",
    parentName: "",
    subCategorys: [], //二级分类列表
    showStatus: 0, //设置card右侧的修改分类的modal组件属性，0:都隐藏；1:显示；2:更新
  };

  // 异步获取(一二级)分类列表并显示
  getCategorys = async () => {
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    // 取出后台返回数据（可能是1级或者2级列表，需要选择性更新列表状态）
    if (result.status === 0) {
      this.setState({
        loading: false,
      });
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subCategorys: categorys,
        });
      }
    } else {
      message.error("获取一级分类列表失败!");
    }
  };

  // 显示指定 一级分类/二级分类 的列表
  showSubCategorys = (category) => {
    // 由于setState()是异步更新，不能马上取得更新后数据，因此需要在setState()设置一个回调函数来获取；
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategorys();
      }
    );
    // console.log("parentId",this.state.parentId);//获取失败
  };

  // 在二级分类列表时点击返回显示一级列表
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };

  // 显示添加的对话框
  showAdd = () => {
    this.setState({ showStatus: 1 });
  };

  addCategory = async () => {
    // 隐藏确认框
    this.setState({
      showStatus: 0,
    });
    // console.log("???",this.form);
    // 收集数据,并提交添加分类的要求
    const { parentId, categoryName } = this.form.getFieldsValue();
    // 清除添加框的数据
    this.form.resetFields();
    const result = await reqAddCategorys(categoryName, parentId);
    if (result.status === 0) {
      // 重新获取列表显示:前提是添加的分类是当前页面下的分类；
      if (parentId === this.state.parentId) {
        this.getCategorys();
      } else if (parentId === "0") {
        this.getCategorys("0");
      }
    }
  };

  handleCancel = () => {
    // 清除数据
    this.form.resetFields();
    // 隐藏界面
    this.setState({
      showStatus: 0,
    });
  };

  showUpdate = (category) => {
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };

  // 更新分类
  updateCategory = () => {
    // 1.隐藏确定框
    this.setState({
      showStatus: "0",
    });
    // 只有当数据校验通过时才能提交后台
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //2.准备数据
        const categoryId = this.category._id;
        const { categoryName } = values;
        console.log(categoryName, "categoryName");
        // 3.清除数据
        this.form.resetFields();
        // 4.发请求更新分类
        const result = await reqUpdateCategorys({ categoryName, categoryId });
        if (result.status === 0) {
          // 5.重新显示列表
          this.getCategorys();
        }
      }
    });
  };
  // 为第一次render()准备数据(与render()同步的)
  componentWillMount() {
    // 初始化table所有列的数组
    this.columns = [
      //此处操作是给组件添加columns属性，属性值为数组
      {
        title: "分类的名称",
        dataIndex: "name",
      },
      {
        width: 300,
        title: "操作",
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {this.state.parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCategorys(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
    // this.initColumns();
    // console.log("ahhaha",this)
  }

  // 异步获取一级分类列表显示
  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const category = this.category || {};
    const {
      categorys,
      loading,
      parentId,
      parentName,
      subCategorys,
      showStatus,
    } = this.state;
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: "10px" }}></Icon>
          <span>{parentName}</span>
        </span>
      );
    // Card的右侧button
    const extra = (
      <button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </button>
    );

    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            loading={loading}
            rowKey="_id"
            dataSource={parentId === "0" ? categorys : subCategorys}
            columns={this.columns}
            pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          />
          <Modal
            title="添加分类"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm
              categorys={categorys}
              parentId={parentId}
              setForm={(form) => {
                this.form = form;
              }}
            />
          </Modal>
          ;
          <Modal
            title="更新分类"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm
              categoryName={category.name}
              setForm={(form) => (this.form = form)}
            />
          </Modal>
        </Card>
      </div>
    );
  }
}
