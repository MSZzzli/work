// template.js 只处理：模板对象相关的配置
var template = require("art-template"); // 模板引擎

// 导入 app 模块
var app = require("./app");

// 设置模板引擎类型
app.engine(".html",template.__express);

// 设置视图引擎
app.set("view engine","html");
// 关闭模板引擎的缓存
template.config("cache",false);
// 给模板添加辅助函数(过滤器)
// template.helper(name, callback)
// 调用：{{question.time（实参一） | millisecond}}
// 传递多个参数：{{question.time（实参一） | millisecond : 实参二 , 实参三}}
template.helper("millisecond",function(time){
	return new Date(time).getTime();
});
template.helper("formatTime",function(time){
	time = new Date(time);
	var y = time.getFullYear();
	var M = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	M = M < 10 ? "0"+M : M;
	d = d < 10 ? "0"+d : d;
	h = h < 10 ? "0"+h : h;
	m = m < 10 ? "0"+m : m;
	s = s < 10 ? "0"+s : s;
	return y+"-"+M+"-"+d+" "+h+":"+m+":"+s;
});
template.helper("formatIp",function(ip){
	var regExp = /::1/ig;
	if (ip.match(regExp)) {
		return "127.0.0.1";
	} else{
		return ip.substr(7);
	}
});

// 导出模板对象
module.exports = template;