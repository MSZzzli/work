// express 模块的导入及使用

var express = require("express");

var app = express();

app.listen(3000,function(){
	console.log("启动……");
});


// Set 模块模拟和效仿 express 的导入及使用

var tySet = require("ty-set");
var set = tySet();
console.log(set);

