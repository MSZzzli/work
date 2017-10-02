// question.js 只处理：问题相关的请求
var express = require("express"); // 服务器模块
var fs = require("fs"); // 处理文件写入/读出模块
var checkLogin = require("../module/checkLogin");

// 创建新路由
var router = express.Router();

// 发送提问请求接口
router.post("/ask",checkLogin,function(req,res){
	// 写入提问的问题
	// 生成问题文件的文件名
	var time = new Date();
	var filePath = "questions/" + time.getTime() + ".json";
	// 组合完善存储数据
	req.body.content = req.body.content.replace(/</g,"&lt;");
	req.body.content = req.body.content.replace(/>/g,"&gt;");
	req.body.ip = req.ip;
	req.body.time = time;
	req.body.username = req.cookies.username;
	// 写入文件
	fs.writeFile(filePath,JSON.stringify(req.body),function(err){
		if (!err) {
			// 页面重定向
			res.status(200).redirect("/");
		} else{
			res.status(200).json({code:2,msg:"系统错误，写入文件失败"});
		}
	});
});

// 发送答案请求接口
router.post("/answer",checkLogin,function(req,res){
	// 先根据 req.cookies.question 读取对应的文件
	var filePath = "questions/" + req.cookies.question + ".json";
	fs.readFile(filePath,function(err,data){
		if (!err) {
			var dataObj = JSON.parse(data);
			// 判断这个问题之前是否有过答案
			if (!dataObj.answers) {
				dataObj.answers = [];
			}
			// 把 answer 也封装成一个小对象
			// {content,time,ip,username}
			// req.body.content = req.body.content.replace(/</g,"&lt;");
			// req.body.content = req.body.content.replace(/>/g,"&gt;");
			req.body.time = new Date();
			req.body.ip = req.ip;
			req.body.username = req.cookies.username;
			
			// 把这个小回答的对象放到 answers 数组中
			dataObj.answers.push(req.body);
			
			// 修改过之后，重新写入文件
			fs.writeFile(filePath,JSON.stringify(dataObj),function(err){
				if (!err) {
					res.status(200).redirect("/");
				}else{
					res.status(200).json({code:2,msg:"系统错误，写入文件失败"});
				}
			});
		}
	});
});

// 导出处理问答路由
module.exports = router;