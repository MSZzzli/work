
// 加载模块
var express = require("express");
var bodyParser = require("body-parser");
// 处理数据上传的（post 文件的上传）
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
app.get("/comment",function(req,res){
	// console.log(req.query);
	// 在终端输出  JSON.stringify():以 json 数据格式输出
	console.log("收到get请求：" + JSON.stringify(req.query));
	res.status(200).send("感谢您的评价");
});

// post 请求
// 第二个参数 upload.array()，在正式处理数据之前处理以 FormData 方式提交的数据
// 如果发现有 FormData 提交的数据，会把这些数据提取出来放在 req.body 中。
app.post("/comment",upload.array(),function(req,res){
	// 请求相关的知识点：
	// req.query（获取 url 里 ？后面的数据）
	// req.body 获取 post 请求数据
	// req.route 获取请求的一些信息
	// req.originalUrl 请求路径
	
	// 响应相关的知识点：
	// res.status 返回相应的状态码
	// res.set("key","value") 设置响应头
	// res.append 添加/拼接响应体
	// res.send 发送响应体
	// res.end 结束相应体
	// res.json 转化为 json 格式的响应数据
	
	console.log(req.query);
	console.log(req.body);
	res.status(200).send("感谢您的评价");
});

// 监听端口
app.listen(3000,function(){
	console.log("nodejs server is running ……");
});
