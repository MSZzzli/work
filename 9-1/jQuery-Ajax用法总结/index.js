
// 加载模块
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");

// 创建服务器对象
var app = express();
// 创建 multer 对象
var upload = multer();

// 创建一个根目录，静态资源文件夹
app.use(express.static("public"));

// 解析 post 请求数据到 body 中
app.use(bodyParser.urlencoded({extended:false}));

// get 请求
// es6的箭头函数：() => {}  == function(){}
app.get("/login",(req,res)=>{
	console.log("get = " +　req.query);
	setTimeout(function(){
		res.status(200).json({
			code: 1,
			msg: "登录成功"
		});
	},3000);
});

// post 请求
app.post("/login",upload.array(),function(req,res){
	console.log("post = " +　req.body);
	setTimeout(function(){
		res.status(200).json({
			code: 1,
			msg: "登录成功"
		});
	},3000);
});

// 监听端口
app.listen(3000,function(){
	console.log("nodejs server is running ……");
});
