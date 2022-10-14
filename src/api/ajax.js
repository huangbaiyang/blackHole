// 能发送异步ajax请求的函数模块
// 封装axios库
// 函数的返回值是promise对象
/* 
优化1:统一对请求异常进行处理？
在外层包一个由自己创建的promise对象
在请求出错时并不是执行reject(error)，而是错误提示
优化2:在进行统一验证时，不想得到response，只需要得到response.data,在请求成功时调用resolve(response.data)
 */
import axios from "axios";
import {message} from "antd";
export default function ajax(url, data = {}, type = "GET") {
  //接口需要查看的4个东西：地址url，请求方式get/post，参数params，响应数据response
  //下一步：优化：
  return new Promise((resolve, reject) => {
    // 1.执行异步ajax请求
    let promise;
    if (type === "GET") {
      //发送GET请求
      promise =  axios.get(url, {
        //配置对象
        params: data, //指定请求参数
      });
    } else {
      //发送post请求
      promise =  axios.post(url, data);
    }
    // 2.若成功，则调用resolve(value)
    promise.then(response => {
      resolve(response.data)
    }
    ).catch(error => message.error("请求出错了" + error.message))
    // 3.若失败，不调用reject(reason),而是提示错误信息
  });
}

//1.请求登录的接口
// ajax("/login", { username: "Tom", password: 12345 }, "POST").then();
//2.添加用户的接口
// ajax(
//   "/manage/user/add",
//   { username: "Tom", password: 12345, phone: 000000 },
//   "POST"
// ).then();
//以上两个接口例子总结：由于每次指定接口，发送请求都需要将全部参数数据输入，太麻烦，因此需要一个index文件将ajax方法打包
