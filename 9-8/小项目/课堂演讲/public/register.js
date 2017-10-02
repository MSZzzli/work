	var str = '';
	
	//定义两个开关 来控制信息填写是否准确  进而判断是否能注册
	var onOff1 = false;
	var onOff2 = false;
	$("#name").change(function() {
		str = $("#name").val();
		if (str == '') {
			$("#user").html('输入为空，请输入账号!');
			onOff1 = false;
		} else if (isNaN(str)) {
			$("#user").html('输入的不是数字，请重新输入!!');
			onOff1 = false;
		} else if (str.charAt(0) == 0) {
			$("#user").html('第一个数字不能是0，请重新输入!');
			onOff1 = false;
		} else if (parseInt(str) != parseFloat(str)) {
			$("#user").html('输入的数字不能是小数，请重新输入!');
			onOff1 = false;
		} else if (str.length >= 5 && str.length <= 10) {
			$("#user").html('账户输入正确！');
			onOff1 = true;
		} else {
			$("#user").html('输入的数字需5<=x<=10，请重新输入！');
			onOff1 = false;
		}
	});
	var psw = '';
	
	$("#psw").change(function() {
		psw = $("#psw").val();

		if (psw.length >= 6 && psw.length <= 12) {
			$("#pass").html('密码输入正确！');
			onOff2 = true;
		} else {
			$("#pass").html('输入的密码需6<=x<=12，请重新输入！');
			onOff2 = false;
		}
	});


//把注册信息发送给app.js
document.forms[0].onsubmit = function(event) {
	//阻止默认事件
	event.preventDefault();
	if(onOff1 == true && onOff2 == true){
	//自己处理请求上传数据
	var data = new FormData(this);
	//创建对象
	var xhr = new XMLHttpRequest();
	
	//等待服务器返回内容
	//当状态值发生改变时触发onreadystatechange 0，1，2，3，4
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {   //响应内容解析完成
			if (xhr.status == '200') {
				//获取服务器返回的数据
				console.log(xhr.responseText);
				alert(xhr.responseText);
				if(xhr.responseText == "注册成功"){
				window.location.href = "index.html";
				}
			}
		}
	}
	xhr.open('POST', '/add');

	/*xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	
	var name = document.querySelector("#name").value;
	var psw = document.querySelector("#psw").value;
	var str = 'name='+name+'&psw='+psw;
	alert(str);*/
	//"name=zhagnsan&psw=12345"
	
	//发送数据请求
	xhr.send(data);
}else if(onOff1 == false){
	alert("用户名格式不准确，请重新填写");
}else if(onOff2 == false){
	alert("密码格式不准确，请重新填写");
}
		
}
