import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { 
  Button, 
  Icon,
  Form,
  Input, 
  message
 } from "antd";
// import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import logo from "../../assets/images/logo.png";
import "./login.less";
const Item = Form.Item; //不能写在import之前
class Login extends Component {
  validatePwd = (rule, value, callback) => {
    // console.log("rule是指:", rule, "value是指:", value);
    // callback():不传参数时表示校验成功；callback("message"):传入参数时表示校验失败并提示参数的内容
    if (!value) {
      callback("密码必须输入");
    } else if (value.length < 4) {
      callback("密码最少4位");
    } else if (value.length > 12) {
      callback("密码最多12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是英文、数字或下划线组成!");
    } else {
      callback();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault(); //阻止事件的默认行为(停止事件冒泡)
    const form = this.props.form; //得到Form组件上的props里面的form对象
    form.validateFields(async (err, values) => {
      if (!err) {
        // console.log("提交的Ajax请求", values);
        // 做好相应配置后请求登录（先import对应的东西）
        // const { username, password } = values;
        /*         reqLogin(username, password)
          .then((response) => console.log("成功了", response.data))
          .catch((error) => console.log("失败了", error));
*/
        //继续对trycatch优化：
        // const result = await reqLogin(username, password);
        // if (result.status === 0) {
        //   message.success("登录成功");
          //保存user
          const user = {_id:"admin"};
          memoryUtils.user = user;
          storageUtils.saveUser(user);
          this.props.history.replace("/");
        }
         else {
          message.error("校验失败");
        }
      }
    );

    /*     const values = form.getFieldsValue(); //获取表单项的输入数据
    console.log("handleSubmit()", values);
 */
  };
  render() {
    //防止用户强制跳转到login页面，需要在进入login页面时对是否登录做判断
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator("username", {
                initialValue: "admin",
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "用户名必须输入！",
                  },
                  { min: 4, message: "用户名最少4位!" },
                  { max: 12, message: "用户名最多12位!" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成!",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validatePwd }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
const warpLogin = Form.create()(Login);
export default warpLogin;
/* 
asnyc 与 await
asnyc ：简化promise
await ：
作用：简化promise对象的使用，不用再使用then()来指定成功/失败的回调函数(通俗的说法)
      以同步的编码(消除了回调函数)方式实现异步流程
在哪里写await？
      在返回promise的表达式左侧写await；不想得到promise，想要得到promise异步执行的成功的value数据
在哪里写async？
      在await所在函数(最近的)定义的左侧写,代表声明了一个async函数
 */
