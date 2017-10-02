// app.js 只处理：服务器对象 app以及相关配置
var express = require("express"); // 服务器模块
var bodyParser = require("body-parser"); // 处理解析post请求数据模块
var cookieParser = require("cookie-parser"); // 解析 cookie 模块

// 创建服务器对象
var app = express();
// 指定跟目录文件夹
app.use(express.static("www"));
// 解析请求数据
app.use(bodyParser.urlencoded({extended: true}));
// 解析 cookie 数据
app.use(cookieParser());

// 把服务器对象 app 导出
module.exports = app;