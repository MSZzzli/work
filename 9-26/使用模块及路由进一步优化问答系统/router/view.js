// view.js 只处理：用户获取视图相关请求
var express = require("express"); // 服务器模块
var fs = require("fs"); // 处理文件写入/读出模块
var template = require("../module/template");

// 创建新路由
var router = express.Router();

// 获取注册页面请求接口
router.get("/register-page",function(req,res){
	res.render("register",{title: "注册"});
});

// 获取登录页面请求接口
router.get("/login-page",function(req,res){
	res.render("login",{title: "登录"});
});

// 获取提问页面请求接口
router.get("/ask-page",function(req,res){
	res.render("ask",{title: "提问"});
});

// 获取首页页面请求接口
router.get("/",function(req,res){
	// 返回所有问题（包含答案）
	// 获取一个文件夹中所有的字文件
	fs.readdir("questions",function(err,files){
		if (err) {
			// 读取失败
			res.status(200).json({code:0,msg:"系统错误，读取文件失败"});
		}else{
			// 读取所有的字文件成功
			// 数组逆序，目的：让最新的问题在上面
			files = files.reverse();
			// 创建一个数组，存放所有的问题对象
			var allquestions = [];
			
			// 方法一：用 for 循环来遍历所有文件
			/*
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				// 拼接读取文件的文件路径
				var filePath = "questions/" + file;
				// 读取文件
				// readFile() 异步    readFileSync()
				// 使用异步的话有可能前端拿不到数据：因为还没读取完毕你就已经响应
				var data = fs.readFileSync(filePath);
				var obj = JSON.parse(data);
				allquestions.push(obj);
			}
			// 响应 
			res.status(200).json(allquestions);
			*/
			
			// 方法二：使用递归来遍历，用异步读取数据
			var i = 0;
			function readQuestion(){
				if (i < files.length) {
					var file = files[i];
					// 拼接读取文件的文件路径
					var filePath = "questions/" + file;
					fs.readFile(filePath,function(err,data){
						if (!err) {
							var obj = JSON.parse(data);
							allquestions.push(obj);
							// 改变 i 的值，继续读取
							i ++;
							readQuestion();
						}
					});
				}else{
					// 响应 
					res.status(200).render("index",{
						title: "首页",
						username: req.cookies.username,
						data: allquestions
					});
				}
			}
			readQuestion();
		}
	});
});

// 获取上传页面请求接口
router.get("/upload-page",function(req,res){
	res.status(200).render("upload",{title: "个人资料"});
});

router.get("/answer-page",function(req,res){
	res.status(200).render("answer",{title: "回答"});
});

// 导出处理界面的路由
module.exports = router;
