
// 取出本地存储 cookie 中的 username
/*
var username = document.cookie;
username = window.decodeURIComponent(username);
username = username.split("=")[1];
console.log(username);
*/

var username = $.cookie("username");

// 判断 username 有没有值，改变 user 的样式和行为
if (username) {
	$("#user").find("span").last().text(username);
} else{
	$("#user").find("span").last().text("登录").end()
	.end().removeAttr("data-toggle").click(function(){
		location.href = "login.html";
	});
}

// 点击提问按钮
$("#ask").click(function(){
	if (username) {
		location.href = "ask.html";
	} else{
		location.href = "login.html";
	}
});

// 退出登录
$("#logout").click(function(){
	$.post("/user/logout",function(resData){
		// 如果退出正常退出登录，刷新下本页面
		if (resData.code == 1) {
			location.reload();
		}
	});
});


// 获取首页数据
$.get("/question/all",function(resData){
	// 遍历所有的问题
	var htmlStr = "";
	for (var i = 0; i < resData.length; i++) {
		// 这里采用 bootstrap 里面的 对媒体对象（Media Object）
		var question = resData[i];
		htmlStr += "<div>"
		htmlStr += question.content;
		htmlStr += "</div>"
	}
	$("#questions").html(htmlStr);
});