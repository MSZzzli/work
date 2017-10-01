/*
// Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
var a = 10;
var b = 20;
console.log(a + b);

var zs = {name:"zhangsan",age:18};
console.log(zs.name);

function test(){
	console.log("我是test方法");
}
test();

for (var i = 0; i < 5; i++) {
	// 每一行的空格数
	var strSpace = "";
	for (var j = 0; j < 5-i; j++) {
		strSpace += " ";
	}
	// console.log(strSpace);
	// 每一行的星星个数
	var strStar = "";
	for (var k = 0; k < i+1; k++) {
		strStar += "* ";
	}
	// console.log(strStar);
	
	console.log(strSpace + strStar);
}
*/

// url：统一资源定位符。
// url的组成：网络请求协议 + ip/域名（DNS 域名解析服务器） + 端口号 
//          http://192.168.81.23:3000


// Nodejs 写后台

// 处理网络请求资源模块 express(http)
// 安装方法：npm install express --save
var express = require('express');

// 处理post请求数据请求资源模块 body-parser
// 安装方法：npm install body-parser --save
var bodyParser = require('body-parser');

// 创建一个服务器对象
var app = express();

// 指定静态资源文件夹，当请求该服务器时，默认会去这个静态资源文件夹中寻找（若未指定文件，默认找 index.html(index.jsp)）
app.use(express.static('wwwroot'));

// 用 bodyParser 处理 post 的请求数据，将请求数据放入 body 对象中
// where the value can be a string or array (when extended is false), 
// or any type (when extended is true).
app.use(bodyParser.urlencoded({extended:false}));

// get 请求（express 默认支持 get 请求的）
// param1: 请求的上下文路径  param2: 回调函数（请求 request，响应 response）
app.get("/user",function(req,res){
	// console.log("收到 user 请求了");
	
	// get 请求发送到后台的数据默认保存在 query 属性里面。
	// console.log(req.query);
	var name = req.query.name;
	var age = req.query.age;
	// console.log(name +　age);
	
	// res：服务器响应    status：状态码      send：后台向前端发送数据
	// res.status(200).send("后台请求已收到");
	res.status(200).send("后台收到的数据是：name = <b>" +　name + "</b>,age = " + age);
});

// post 请求
// param1: 请求的上下文路径  param2: 回调函数（请求 request，响应 response）
app.post("/user",function(req,res){
	// post 请求发送到后台的数据会通过 bodyParser 解析到 body 属性里面。
	// console.log(req.body);
	
	var name = req.body.name;
	var age = req.body.age;
	
	// res.status(200).send("收到 /user 的 post 请求");
	res.status(200).send("收到 /user 的 post 请求: name = <i>" +　
	name + "</i>,age = <i>" +　age + "</i>");
});

// 开启服务器，监听端口号
app.listen(3000,function(){
	console.log("服务器已启动……");
});


/*
猜测：
express.js
通过 require express.js 文件的返回值拿到手
拿到手的是一个 express 方法
通过调用express() 能返回一个对象 app
对象有对象的 属性和方法，其中  listen 就是app的方法之一
*/