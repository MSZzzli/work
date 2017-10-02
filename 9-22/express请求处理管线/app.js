
// express 请求处理管线
// 每次请求的多个回调函数组成一个请求处理管线，管线中的每一个函数可以
// 得到这次请求的数据，也可以修改响应中的数据，总结一句话每一个回调函
// 数都可以单独处理这次请求。一般用在：对于处理请求的某种公共（通用）
// 的梳理（处理），可以单独写在一个处理管线中。

var express = require("express");
var app = express();

// req：请求对象
// res：响应对象
// next：下一个等待处理请求的回调函数
function setHeader(req,res,next){
	console.log("所有的请求都会经过该方法的处理");
	
	// res.set() 设置响应头
	// 还可以写成res.set({})批量设置响应头。
	// 形如：res.set({Content-type:"text/html; charset=utf-8",Content-lenght:200})
	// 在Content-Type响应头中设置编码可以解决乱码问题
	res.set("Content-type","text/html; charset=utf-8");
	
	// 这块内容处理完毕，就可以接着往下执行
	next();
}
// app.use()：在默认处理管线（所有的请求接口都会调用的回调方法）中，添加一个回调函数，
// 那么每次请求都会先执行默认处理管线中的方法，然后再执行各自接口的处理函数。
app.use(setHeader);

function firstFun(req,res,next){
	console.log("我是第一个请求处理函数");
	next();
}

function secondFun(req,res,next){
	console.log("我是第二个请求处理函数");
	next();
}

// 可以在请求上下文路径后面写很多个回调函数，用 "," 隔开。
// app.get("/",firstFun,secondFun,function(req,res){
//	 res.end("收到来自 / 的请求");
// });

// 也可以以数组的形式，把请求回调函数写在一起
app.get("/",[firstFun,secondFun],function(req,res){
	res.end("收到来自 / 的请求");
});

app.get("/info/:age",function(req,res){
	// 获取客户端数据：
    // 1、获取url中的querystring(?后面的name=value，通过GET方法发送)
    //     req.query.name
    // 2、获取请求体中的数据（通过POST方法发送，有多种编码方式）
    //     req.body.name
    //     如果是 urlencoded 编码需要使用 body-parser 模块
    //     如果是 multipart/form-data 需要使用 multer 模块
    // 3、获取cookie中的数据
    //     req.cookies.name
    //     需要使用 cookie-parser 模块
    // 4、获取请求头中的数据
    //     req.get('name')
    // 5、获取url路径Path中的数据
    //     req.params.age
    //     需要设置请求地址模式   '/hi/:age'
    // 将参数放入Path相对于将参数放入QueryString
    // 更加容易被人和搜索引擎识别
    // 因此被称为友好URL，friendly url 
    
	// res.end("收到来自 /info 的请求");
	res.end("收到来自 /info 的请求" + req.params.age);
});

app.listen(3000,function(){
	console.log("服务器已启动");
});
