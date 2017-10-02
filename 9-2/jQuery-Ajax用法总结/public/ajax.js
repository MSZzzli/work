
// Ajax：Asynchronous javascript and XML（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。

$("button.Ajax").click(function(){
	// 皮肤插件 Layer
	// tips 层  param1：提示信息   param2：弹出位置 param3：位置、颜色等设置
	// layer.tips("莫慌，紧急加载中……",this,{tips:[1,"#f00"]});
	// 提示框  param1：提示信息  param2：有表情地提示  param3：消失后的回调函数
	/*layer.msg("拼命加载中……",{icon: 6},function(){
		console.log("我要消失了（默认是3秒）");
	});*/
	// 页面过渡、页面刷新、刷新更多数据 param1：风格(0\1\2)  param2:时间
	var index = layer.load(3, {time: 10*1000});
	// setTimeout(function(){
		// 2s之后关闭(请求完成)
		// layer.close(index);
	// },2000);
	
	// 使用底层接口 jQuery.ajax($.ajax) 可以实现更加基础、更加底层的网络请求；但是同时你需要配置更多的属性和方法；
	$.ajax({
		// url (默认: 当前页面地址) 发送请求的地址。
		url: "/login",
		
		// type (默认: 'GET') 请求的方法 method，常用 GET/POST
		type: "POST",
		
		// dataType：从服务器返回你期望的数据类型（会影响到最终拿到的数据）。 如果没有指定，jQuery将尝试通过MIME类型的响应信息来智能判断
		// 可能的取值：default: Intelligent Guess (xml, json, script,text，jsonp， or html)
		// 我们设置的 dataType 最终转换到请求 Accept（比如：json --> accept: Application/json text --> accept: text/plain ……）
		dataType: "json",
		
		// async： (默认: true)所有请求均为异步请求（也就是说这是默认设置为 true ）
		async: true,
		
		// data：发送到服务器的数据（不区分get、post请求）。
		// data: "name=zhangsan&age=18",
		data: {name:"张三",age: 18},
		
		// cache： (默认: true, dataType为"script"和"jsonp"时默认为false)如果设置为 false ，浏览器将不缓存此页面。
		// true：http://localhost:3000/login?name=张三&age=18
		// false：http://localhost:3000/login?name=张三&age=18&_=1504318371993
		cache: false,
		
		// contentType：(default: 'application/x-www-form-urlencoded; charset=UTF-8') 
		// 当将数据发送到服务器时，使用该内容类型。multipart/form-data,application/json 或 text/plain
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		
		// beforeSend: 请求发送前的回调函数，用来修改请求发送前jqXHR对象
		beforeSend: function(xhr,settings){
			console.log("请求即将发送，请系好安全带");
			// 设置请求头
			xhr.setRequestHeader("questionID","666");
			// 取消请求
			// return false;
		},
		
		// headers：一个额外的"{键:值}"对映射到请求一起发送。此设置会在beforeSend 函数调用之前被设置 ;因此，请求头中的设置值，会被beforeSend 函数内的设置覆盖 
		headers:{questionID:777},
		
		// dataFilter：一个函数被用来处理XMLHttpRequest的原始响应数据
		dataFilter: function(data,type){
			// type == dataType
			// data == 原始后台数据;
			
			// 自行处理原始数据
			// data = "[" + data + "]";
			
			// 一定的有返回值
			return data;
		},
		
		// timeout：设置请求超时时间（毫秒）。值为0表示没有超时
		timeout: 30000,
		
		// error：请求失败时调用此函数。
		error: function(jqXHR,textStatus,errorThrown){
			// 有以下三个参数:
			// jqXHR对象：在 jQuery 1.4.x前为XMLHttpRequest
			// textStatus：可能取值 null，timeout，error，abort，parsererror
			// errorThrown 
			console.log("error");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		
		// success：请求成功后的回调函数。
		success: function(data,textStatus,jqXHR){
			// 有以下三个参数:
			// data：服务器返回的数据。根据dataType参数进行处理后的数据或dataFilter回调函数
			// textStatus：状态
			// jqXHR：jquery XMLHttpRequest 对象
			console.log("success");
			console.log(data);
			console.log(textStatus);
			console.log(jqXHR);
		},
		
		// complete：请求完成后回调函数。
		complete: function(jqXHR,textStatus){
			// 有以下二个参数:
			// jqXHR：jquery XMLHttpRequest 对象
			// textStatus：状态
			console.log("complete");
			console.log(jqXHR);
			console.log(textStatus);
			
			// 关闭皮肤
			layer.close(index);
		}
	});
});






















