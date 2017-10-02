
var btn = document.querySelector("button");
btn.onclick = function(){
	// 1. 创建 XHR 请求对象
	var xhr = new XMLHttpRequest();
	// 2. 监听状态的变化
	xhr.onreadystatechange = function(event){
		// console.log(xhr.readyState);
		// 0:请求未初始化  1:和服务器连接成功  2:请求已经被接收  3:请求正在处理中 4:请求处理完毕
		switch (xhr.readyState){
			case 0:
				console.log("0:请求未初始化");
				break;
			case 1:
				console.log("1:和服务器连接成功");
				break;
			case 2:
				console.log("2:请求已经被接收");
				console.log("状态码："+xhr.status);
				console.log("状态码信息："+xhr.statusText);
				break;
			case 3:
				console.log("3:请求正在处理中");
				console.log("状态码："+xhr.status);
				console.log("状态码信息："+xhr.statusText);
				console.log("响应数据："+xhr.responseText);
				break;
			case 4:
				console.log("4:请求处理完毕");
				console.log("状态码："+xhr.status);
				console.log("状态码信息："+xhr.statusText);
				console.log("响应数据："+xhr.responseText);
				alert(xhr.responseText);
				break;
			default:
				break;
		}
	}
	// 3.设置网络请求
	var str = document.querySelector("#comment").value;
	xhr.open("GET","/comment?name=zm&score=5&comment="+str);
	// 4.发送请求（注意 get 请求时，请求数据写在哪里）
	xhr.send();
}
