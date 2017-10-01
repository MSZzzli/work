
var btn = document.querySelector("button");
btn.onclick = function(){
	// 1. 创建 xhr 请求对象
	var xhr = new XMLHttpRequest();
	// 2. 监听请求状态的变化
	xhr.onreadystatechange = function(){
		// 判断 readyState == 4
		if (xhr.readyState == 4) {
			// 请求成功（在这做你想做的事：弹警告框、页面跳转、数据本地持久化……）
			console.log(xhr.responseText);
			alert(xhr.responseText);
		}
	}
	// 3. 设置网络请求
	xhr.open("POST","comment?a=b");
	// 4. 设置请求头（如果是 post 请求，必须要设置一下请求头 Content-Type 才行）
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.setRequestHeader("run","running,is boom");
	// 5. 发送数据
	xhr.send("name=zm&score=5&commnet=质量不错，好评如潮，凑够15个字");
}