// 创建一个专门处理用户相关的路由

var express = require("express");
var router = express.Router();
router.get("/login",function(req,res){
	res.send("登录成功");
});
router.post("/register",function(req,res){
	res.send("注册成功");
});

// 导出
module.exports = router;
