
// 请求模块
var express = require("express");
var bodyParser = require("body-parser");

// 获取服务器对象
var app = express();

// 指定静态文件夹作为跟目录
app.use(express.static("www"));

// 解析 post 请求到 body 属性中
app.use(bodyParser.urlencoded({extended:true}));

// post 请求
app.post("/login",function(req,res){
	var phone = req.body.phone;
	var psw = req.body.password;
	// 判断账号是否存在和密码是否正确（一般都是存在数据库，这里先写死）
	var result = "";
	if (phone == "18903869171") {
		if (psw == "123456") {
			result = "登录成功";
		} else{
			result = "密码错误";
		}
	} else{
		result = "账号不存在";
	}
	// 后台的响应
	res.status(200).send(result);
});

// 监听端口号
app.listen(3000,function(){
	console.log("nodejs server is running ……");
});
