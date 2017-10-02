// 加载模块
var express = require("express");
var template = require('art-template');

// 生成服务器对象，指定资源文件夹
var app = express();
app.use(express.static("www"));

// 设置服务器模板文件类型
// app.engine('art', require('express-art-template'));
app.engine(['.html', template.__express],function(){
	console.log(123);
});

app.set('view engine', 'html');

// 配置模板引擎是否缓存
template.defaults.cache = false;

app.get("/",function(req,res){
	// 假设这里有好多数据（来源：本地文件或者数据库）
	var data = {
		title: "编程类书籍",
		list: [
			{name:"HTML新手指南",price:"38.8",currentPrice:"38"},
			{name:"CSS教程",price:"40.9",currentPrice:"35"},
			{name:"Javascript高级编程",price:"99.9",currentPrice:"90"}
		]
	}
	
	// template();
	
	// __dirname + "template/t1.html"：需要绝对路径
	// var htmlStr = template(__dirname + "/template/t1.html",data);
	// res.send(htmlStr);
	
	// 在高版本的art-template里面模板后缀名默认为 .art
	// 如果后缀名改为 .art 的话：需要把  {{each object as value index}} -> 
	// {{each object value index}}（语法变了）
	var htmlStr = template(__dirname + "/template/t2",data);
	res.send(htmlStr);
});

app.get("/info",function(req,res){
	// 假设这里有好多数据（来源：本地文件或者数据库）
	var data = {
		title: "编程类书籍",
		list: [
			{name:"HTML新手指南",price:"38.8",currentPrice:"38"},
			{name:"CSS教程",price:"40.9",currentPrice:"35"},
			{name:"Javascript高级编程",price:"99.9",currentPrice:"90"}
		]
	}
	
	// .render()
	
	// 如果后缀名改为 .art 的话：需要把  {{each object as value index}} -> 
	// {{each object value index}}（语法变了）
	
	// 在高版本里面，模板文件夹用不用 views 都不影响（默认它不会去 views文件夹找模板）
	// ./views/t3：相对路径
	var render = require('./views/t3');
	var html = render(data);
	res.send(html);
});

app.listen(3000,function(){
	console.log("启动成功……");
});


