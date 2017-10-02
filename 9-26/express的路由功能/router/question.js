// 创建一个专门处理问题相关的路由

var express = require("express");
var router = express.Router();
router.get("/ask",function(req,res){
	res.send("提问成功");
});
router.post("/answer",function(req,res){
	res.send("回答成功");
});

// 导出
module.exports = router;