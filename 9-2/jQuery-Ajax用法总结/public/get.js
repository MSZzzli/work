/*
 * 说明：介绍快捷方法 $.get() $.post()
 * 需要传递三个参数：
 * param1：请求的 url。
 * param2：请求的数据。（注意：get请求，参数既可以写在url后面，也可以写在这里；post请求参数一定要写在这里）
 * param3：请求成功之后的回调函数。回调函数中也有三个参数：
 * 		a：data 服务器响应的数据（这个数据已经经过 jquery 处理过了）
 * 		b：textStatus 请求的状态信息
 * 		c：jqXHR jquery XHR 核心对象
 */

$("button.GET").click(function(){
	/*
	$.get("/login?name=zs&age=20",function(data,status,jqXHR){
		console.log(data);
	}).done(function(data,status,jqXHR){
		// 请求成功
		console.log(data);
	}).fail(function(jqXHR,status,thrown){
		// 请求出错
		console.log(status);
	}).always(function(){
		// 请求完成
		// console.log(arguments);
		// 当成功时：data status jqXHR
		// 当失败时：jqXHR status thrown
		console.log("请求完成");
	});*/
	
	$.get("/login",{name:"lisi",age:30},function(data){
		console.log(data);
	});
});
