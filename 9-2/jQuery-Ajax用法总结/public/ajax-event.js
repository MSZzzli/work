
// setup 全局设置
// 对 Ajax 进行一次通用的全局设置，这样以后在发送 Ajax，就不用每次去设置了。
// 此处指定的设置会影响所有 $.ajax或基于AJAX的衍生方法，如$.get()的调用。这可能会导致不良的行为因为其他调用
// （例如，插件）可能希望正常的默认设置。出于这个原因，我们强烈建议您不要使用此API。
$.ajaxSetup({
	url:"/login",
	dataType: "json",
	timeout: 30000,
	async:true,
	cache: false
});


// 全局Ajax事件处理程序
$(document).ajaxStart(function(){
	alert("ajax请求开始");
	layer.load(3, {time: 3000});
});
$(document).ajaxSend(function(){
	alert("ajax请求已发送");
});
$(document).ajaxError(function(){
	alert("ajax请求失败");
});
$(document).ajaxSuccess(function(){
	alert("ajax请求成功");
});
$(document).ajaxComplete(function(){
	alert("ajax请求已完成");
});
$(document).ajaxStop(function(){
	alert("ajax请求停止");
});



// 发送 post 请求
$.ajax({
	type:"post",
	data: {a:"a",b:"b"},
	success: function(data){
		alert(data.msg);
	}
});
// 发送 get 请求
$.ajax({
	data: {c:"c",d:"d"},
	success: function(data){
		alert(data.msg);
	}
});