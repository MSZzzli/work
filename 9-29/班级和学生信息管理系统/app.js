// 导入模块
var express = require("express");
var bodyParser = require("body-parser");
var template = require("art-template");

// 服务器对象
var app = express();
app.use(express.static("www"));

// 解析 post 数据
app.use(bodyParser.urlencoded({extended:false}));

// 配置模板
app.engine('.html', template.__express);
app.set('view engine', 'html');
template.config('cache', false);

// 导入数据库操作模块
var db = require("./db");
var Class = db.Class;
var Student = db.Student;

// 创建新的班级
app.post("/create-class",function(req,res){
	// 获取当前这一学科有多少班级
	console.log(req.body);
	Class.count({subject:req.body.subject},function(err,count){
		req.body.session = count + 1;
		// 存储
		var cla = new Class(req.body);
		cla.save(function(err){
			if(!err){
				res.redirect("/");
			}
		});
	});
	
});

// 获取 添加新的学生 页面
app.get("/create-student",function(req,res){
	// 获取当前所有可选择的班级
	Class.find({},function(err,data){
		if (!err) {
			res.render("create-student",{data});
		}
	});
});

// 上传 新的学生的信息 
app.post("/create-student",function(req,res){
	var stu = new Student(req.body);
	stu.save(function(err,data){
		if(!err){
			res.redirect("/create-student");
		}
	});
});

// 展示所有的 班级信息
app.get("/all-class",function(req,res){
	Class.find({},function(err,data,code){
		if (!err) {
			res.render("all-class",{data});
		}
	}).sort({subject:1});// 对学科进行排序，让同一科靠拢
});

// 展示所有的 学生信息
app.get("/all-student",function(req,res){
	Student.find(req.query,function(err,data,code){
		if (!err) {
			res.render("all-student",{data});
		}
	}).populate("classInfo");
});

// 端口
app.listen(3000,function(){
	console.log("服务器已启动……");
});
