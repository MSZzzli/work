// 加载模块
var express = require("express");
var template = require('art-template');

// 生成服务器对象，指定资源文件夹
var app = express();
app.use(express.static("www"));

// 设置服务器模板文件类型（在高版本4.12.1默认后缀.art）
app.engine('.html', template.__express);

// 设置服务器模板视图引擎（类似前端 type="text/html"）
app.set('view engine', 'html');

// 配置模板引擎是否缓存
// 一般在开发（development）环境，需要经常修改代码，所以没必要设置缓存，可以先暂时关闭
// 但是在生产（production）环境，建议把此选项打开（提高访问效率）
template.config('cache', false);

// 注意：当请求路径写 "/" 的时候：
// 如果此时的 www 文件中有 index.html 文件，那么当发送 http://localhost:3000/ 请
// 求时，访问的是 index.html 文件。也就是说这个 get 请求废了。
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
	
	// 服务器跟文件夹路径
	console.log(__dirname);
	
	// 在服务端使用模板引擎：
	// .template() 用数据去渲染一个html模板，此函数函数的依然是htmlString
	// 参数说明：1. html 模板文件路径    2. 渲染的数据
	// var htmlStr = template(__dirname+"/template/t1",data);
	var htmlStr = template("template/t1",data);
	res.status(200).send(htmlStr);
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
	
	// .render()：指定模板和数据，拼接成字符串并自动返回给客户端
	// 参数说明： 1. html 模板文件路径    2. 渲染的数据
	// 使用 .render() 方法，默认会去 views 文件夹中寻找模板（路径不要再加 views）
	res.status(200).render("t2",data);
});

app.listen(3000,function(){
	console.log("启动成功……");
});



