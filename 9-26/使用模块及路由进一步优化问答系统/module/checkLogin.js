// checkLogin.js 只处理：请求处理管理-判断是否登录
// 判断是否登录的请求处理管线
function checkLogin(req,res,next){
	// 通过 cookie 中的 username 判断用户有没有登录
	// (既然进入提问页面提问，不是已经说明登录了吗？1.在提问页面把cookie移出了呢
	// 2.我们 cookie 存储一个月，在临界点点击提问，刚好进入提问页面，但是cookie被清除)
	var username = req.cookies.username;
	if (username) {
		next();
	}else{
		// req.xhr 是一个布尔值。
		// true：表示发送的请求是 XHR
		// false：表示是一个表单请求或者是一个普通的网页请求
		// console.log(req.xhr);
		if (req.xhr) {
			// 代表用户发送的是 xhr 请求，即表示用户要自行处理数据
			res.status(200).json({code:0,msg:"登录异常，请重新登录"});
		} else{
			// 代表是一个表单请求，意味着用户不能处理数据，意味着我们帮前端处理
			// res.redirect("/login-page?param1=参数");
			res.redirect("/login-page");
		}
	}
}

// 导出 checkLogin 方法
module.exports = checkLogin;