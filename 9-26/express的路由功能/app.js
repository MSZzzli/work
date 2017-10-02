// 这篇教程只是对 Express 路由做一个简单的介绍。路由（Routing）是由一个 URI（或者叫路径）
// 和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点
// 的访问。每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。

var express = require("express");

var app = express();

app.get("/test",function(req,res){
 	res.send("test 请求成功");
});

// 创建一个新的路由对象
var router = express.Router();

/*****************************初始路由*****************************/

// 使用路由定义请求
router.get("/info",function(req,res){
	res.send("info 请求成功");
});

// app 使用这个路由
// app.use(router);
// 这个 router（路由） 下的所有请求，都要经过 /api（上下文） 这个路径。
app.use("/api",router);


/*****************************路由例子*****************************/

// app 使用 user 相关的路由
app.use("/user",require("./router/user.js"));
app.use("/question",require("./router/question.js"));

app.listen(3000,function(){
	console.log("running……");
});






