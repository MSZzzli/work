document.forms[0].onsubmit = function(event) {
	var name = document.querySelector("#name").value;
	var psw = document.querySelector("#psw").value;
	//阻止默认事件
	event.preventDefault();
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) { //响应内容解析完成时
			if (xhr.status == 200) {
				console.log(xhr.responseText);
				var arr = xhr.responseText;
				if (arr == "登录成功") {
					window.location.href = "comment.html";
				} else if (arr == "密码有误") {
					alert("密码有误,请重新输入");
					window.location.href = "index.html";
				} else if (arr == "用户没有注册") {
					alert("用户没有注册,请注册");
					window.location.href = "index.html";
				}

			}
		}
	}
	xhr.open("GET", '/message?name=' + name + '&psw=' + psw);

	xhr.send();

}