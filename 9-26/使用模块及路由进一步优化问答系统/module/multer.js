// multer.js 只处理：用户上传头像相关
var multer = require("multer"); // 处理 formdata 格式提交数据模块

// 配置上传头像存储
var storage = multer.diskStorage({
	destination: "www/uploads",
	// cb：请求处理管线
	filename: function(req,res,cb){
		var username = req.cookies.username;
		cb(null,username + ".jpg");
	}
});
var upload = multer({storage});

// 导出上传对象
module.exports = upload;