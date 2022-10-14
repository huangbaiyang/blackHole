// 包含应用中所有接口请求函数的模块
//每个函数的返回值都是promise对象
import ajax from "./ajax";
import jsonp from "jsonp";

import { message } from "antd";
// const BASE = "http://localhost:5000";//这种做法容易写死，不好改正确赋值为'';
const BASE = "";

//1.请求登录的接口暴露
// export function reqLogin(username,password){
//     ajax("/login", {username,password}, "POST")
// }
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

//2.请求添加用户的接口暴露
export const reqAddUser = (
  user //user参数的数据信息在课件
) => ajax(BASE + "/manage/user/add", user, "POST");
//3. 通过jsonp请求获取天气数据信息
export function reqWeather(city) {
  const url =
    "http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2";
  return new Promise((resolve, reject) => {
    jsonp(
      url,
      {
        param: "callback",
      },
      (error, response) => {
        if (!error && response.status === "success") {
          const { dayPitcureUrl, weather } =
            response.results[0].weather_data[0];
          resolve(dayPitcureUrl, weather);
        } else {
          message.error("获取天气信息失败");
        }
      }
    );
  });
}
// 4.请求获取1，2级分类列表
export const reqCategorys = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId }, "GET");
// 5.添加分类
export const reqAddCategorys = (categoryName, parentId) =>
  ajax(BASE + "/manage/category/add", { categoryName, parentId }, "POST");

// 6.更新分类
export const reqUpdateCategorys = ({ categoryName, categoryId }) =>
  ajax(BASE + "/manage/category/update", { categoryName, categoryId }, "POST");

// 7.获取分页商品列表数据
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize }); //"GET"请求可不写

// 8.获取搜索的产品数据(根据关键字searchName分两种类型名称productName或者描述productDesc进行搜索)
export const reqSearchProducts = (pageNum, pageSize, searchType, searchName) =>
  ajax(BASE + "/manage/product/list", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  }); 

  // 9.获取一个商品的分类
export const reqCategory = (categoryId) =>
ajax(BASE + "/manage/category/info", {categoryId}); 

  // 10.更新商品在售/下架状态
export const reqUpdateStatus = (porductId, status) =>
ajax(BASE + "/manage/category/info", {porductId,status}); 
