// user.js 只处理用户相关的请求
var express = require("express"); // 服务器模块
var fs = require("fs"); // 处理文件写入/读出模块
var upload = require("../module/multer");

// 创建新路由
var router = express.Router();

// 发送注册请求接口
router.post("/register",function(req,res){
	// 先判断用户是否已经被注册过
	var filePath = "users/"+ req.body.username + ".json";
	fs.exists(filePath,function(exi){
		if (exi) {
			// 用户存在
			res.status(200).json({code:2,msg:"用户名已存在，请重新填写"});
		} else{
			// 用户不存在，直接把注册等信息写到本地
			// 在 body 里面添加 注册时间和ip
			req.body.ip = req.ip;
			req.body.time = new Date();
			fs.writeFile(filePath,JSON.stringify(req.body),function(err){
				if (err) {
					res.status(200).json({code:0,msg:"系统写入文件失败，请稍后再试"});
				} else{
					res.status(200).json({code:1,msg:"注册成功"});
				}
			});
		}
	});
});

// 发送登录请求接口
router.post("/login",function(req,res){
	// 判断用户是否存在
	var filePath = "users/" + req.body.username + ".json";
	fs.exists(filePath,function(exi){
		if (exi) {
			// 用户存在，接着判断密码是否正确(读取本地文件)
			fs.readFile(filePath,function(err,data){
				if (err) {
					// 读取文件失败
					res.status(200).json({code:2,msg:"系统错误，读取文件失败"});
				} else{
					// 注意 data 是一个字符串
					var user = JSON.parse(data);
					if (req.body.password == user.password) {
						// 把用户名存到响应报文的 cookie(1.把用户名以 cookie 的形式保存在前端，可以
						// 作为是否登录的一个凭证；2.发送网络请求的时候，会把 cookie 带到后台)
						// param1：键    param2：值   param3：过期时间 对象 Object{expires}
						var time = new Date();
						time.setMonth(time.getMonth() + 1);
						res.cookie("username",req.body.username,{expires:time});
						res.status(200).json({code:1,msg:"登录成功"});
					} else{
						res.status(200).json({code:3,msg:"密码错误"});
					}
				}
			});
		} else{
			// 用户名不存在
			res.status(200).json({code:0,msg:"用户名不存在"});
		}
	});
});

// 退出登录
router.get("/logout",function(req,res){
	// 清除 cookie 中的 username(access_token、timestamp)
	res.clearCookie("username");
	res.status(200).redirect("/");
});

// 发送上传请求接口
// upload.array("photo",1) == upload.single("photo")
router.post("/upload",upload.single("photo"),function(req,res){
	// res.status(200).json({code:1,msg:"上传头像成功"});
	// res.status(200).send('<script>alert("上传头像成功");location.href="/";</script>');
	res.status(200).redirect("/");
});

// 导出用户相关路由
module.exports = router;