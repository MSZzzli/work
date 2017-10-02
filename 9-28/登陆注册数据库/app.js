// 导入模块
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var multer = require("multer");
var crypto = require("crypto");
var mongoose = require("mongoose");

// 服务器对象
var app = express();
app.use(express.static("wwwroot"));

// 解析body数据
app.use(bodyParser.urlencoded({extended:false}));

// 解析cookie数据
app.use(cookieParser());

// 数据库
mongoose.connect("mongodb://localhost:27017/Student");
var db = mongoose.connection;
db.on("open",function(){
	console.log("数据库打开成功");
});
// 创建集合
var accountSchema = new mongoose.Schema({
	username:String,
	psw:String,
	headerUrl:{type:String,default:"/uploads/user.png"}
});
// 生成 Model 
var Account = mongoose.model("Account",accountSchema);

// 注册
app.post("/register",function(req,res){
	var username = req.body.username;
	var psw = req.body.psw;
	var repsw = req.body.repsw;
	
	// 判断密码是否一致
	if (psw != repsw) {
		res.status(200).json({
			code:0,
			msg:"密码不一致"
		});
		return;
	} 
	
	// 判断账号是否可用
	Account.findOne({username},function(err,data){
		// data 不是一个数组，是一个数据对象
		if (data) {
			res.status(200).json({
				code:0,
				msg:"账号已抢注"
			});
			return;
		} else{
			// 对密码进行 md5 加密
			var md5 = crypto.createHash('md5');
			psw = md5.update(psw).digest('hex');
			// 存储
			var account = new Account({username,psw});
			account.save(function(err,data,code){
				if (!err) {
					res.status(200).json({
						code:1,
						msg:"注册成功"
					});
				}else{
					res.status(200).json({
						code:2,
						msg:"注册失败"
					});
				}
			});
		}
	});
});

// 登录
app.post("/login",function(req,res){
	var username = req.body.username;
	var psw = req.body.psw;
	
	// 判断用户是否存在
	Account.findOne({username},function(err,data){
		// data 不是一个数组，是一个数据对象
		if (!data) {
			res.status(200).json({
				code:0,
				msg:"账号不存在"
			});
			return;
		} else{
			// 判断密码是否正确
			var md5 = crypto.createHash('md5');
			psw = md5.update(psw).digest('hex');
			if (psw == data.psw) {
				// 登录成功之后把用户名（或者 access_token）存到本地
				var time = new Date();
				time.setMonth(time.getMonth() + 1);
				res.cookie("username",username,{expires:time});
				res.status(200).json({
					code:1,
					msg:"登录成功"
				});
			}else{
				res.status(200).json({
					code:2,
					msg:"密码错误"
				});
			}
		}
	});
});


// 上传头像
var storage = multer.diskStorage({
	// 设置图片/文件的存放位置
	// destination: 'www/uploads',
	destination: function(req, file, cb){
		cb(null,'wwwroot/uploads');
	},
	// 设置图片/文件的存放名字
	// filename: 'a.png'
	filename: function(req, file, cb){
		var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
		var name = new Date().getTime() + str.charAt(Math.floor(Math.random()*52));
		// 数据库更新操作（headerUrl）
		if (req.cookies.username) {
			// 更新操作
			Account.update(
				{username:req.cookies.username},
				{headerUrl:"/uploads/"+name+".jpg"},
				function(err,result){
				 	// console.log(err);
				});
			cb(null,name + ".jpg");
		}else{
			res.end("未登录");
		}
	}
});
// 上传对象 upload
var upload = multer({storage});
// post请求处理多张图片上传（表单上传 formdata）
// upload.array('photo', 6)  上传图片的键 上传图片的最大个数
app.post("/upload",upload.single('photo'),function(req,res){
	res.status(200).json({
		code: 1,
		msg: "上传图片成功"
	});
});


app.get("/info",function(req,res){
	Account.findOne({username:req.cookies.username},function(err,data){
		res.send(data);
	});
});

// 修改

// 删除

// 自行完成

app.listen(3000,function(){
	console.log("服务器已启动");
});
