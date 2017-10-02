
// https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects
// FormData 对象的使用：数据格式化工具，格式化成键值对
// 通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。它可以更灵活方便的发送表单数据，
// 因为可以独立于表单使用。如果你把表单的编码类型设置为multipart/form-data ，则通过FormData传输
// 的数据格式和表单通过submit() 方法传输的数据格式相同
// 1.var formData = new FormData(); formData.append("key","value");
// 2.var formData = new FormData(someFormElement);
// 3.var form = document.getElementById("form"); var data = form.getFormData();


var form = document.getElementById("register");

// 给 form 表单绑定提交事件
form.onsubmit = function(event){
	// form 的提交事件是它的默认事件
	event.preventDefault();
	
	// 发送 post 的 xhr 请求
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			console.log("请求完成 = " + xhr.responseText);
		}
	}
	// param1:method   param2:uri   param3:async（true 异步  false 同步）
	xhr.open("POST","comment",true); 
	
	// 前端往后台传递数据：
	/*
	// 1.
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	var inputs = this.getElementsByTagName("input");
	var username = inputs[0].value;
	var password = inputs[1].value;
	var email = inputs[2].value;
	xhr.send("username="+username+"&password="+password+"&email="+email);
	*/
	
	/*
	// 2.
	// 用 formData.append 不用设置请求头，但是需要后台需要一个 multer 的模块帮你解析数据到 body 里面
	var inputs = this.getElementsByTagName("input");
	var formData = new FormData();
	formData.append("username",inputs[0].value);
	formData.append("password",inputs[1].value);
	formData.append("email",inputs[2].value);
	xhr.send(formData);
	*/
	
	// 3.
	// 用 new FormData(this) 参数需要传一个表单（要上传数据的表单），但是需要后台需要一个 multer 的模块帮你解析数据到 body 里面
	var formData = new FormData(this);
	xhr.send(formData);
}
