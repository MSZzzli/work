var express = require("express");
var app = express();

// 导入 mongoose 模块
var mongoose = require("mongoose");
// 配置链接数据库地址并且需要附加上数据库名（Student）
// 格式：mongodb://ip:port/db_name
mongoose.connect("mongodb://localhost:27017/Student");
// 链接数据库
var db = mongoose.connection;
// 监听链接状态：成功、失败、断开连接
db.on("connected",function(){
	console.log("数据库连接成功");
});
db.on("open",function(){
	console.log("数据库打开成功");
});
db.on("error",function(){
	console.log("数据库打开失败");
});
db.on("disconnected",function(){
	console.log("数据库断开连接");
});
// 获取 Schema（图表结构对象：负责创建集合 collection）
var Schema = mongoose.Schema;
// 创建一个数据集合（collection）
// para1：集合的 field（域）
// para2：集合的名字（collection_name）
var studentSchema = new Schema({name:String,age:Number},{collection:"H5-2"});
// 获取操作这个 "H5-2" 集合的增、删、改、查的构造函数（一行记录的数据 document）
var Student = mongoose.model("Student",studentSchema);

// 讲解增、删、改、查
// 增
app.get("/add",function(req,res){
	// 需要学生的姓名和年龄
	var name = req.query.name;
	var age = req.query.age;
	var stu = new Student({name,age});
	stu.save(function(err,data,status){
		// err：是否发生错误     data：返回的数据（把当前存的数据又返回给你了）  status：状态
		if (!err) {
			console.log(data);
			console.log(status);
			res.send("存储成功");
		} else{
			res.send("存储失败");
		}
	});
});

// 查
app.get("/find",function(req,res){
	// .find() 查找所有匹配到数据
	// .findOne() 查找配到的数据中的一个
	/*
	var name = req.query.name;
	if (name) {
		// 条件查找
		Student.find({name},function(err,data,status){
			if (!err) {
				res.send(data);
			}
		});
	} else{
		// 无条件查找
		Student.find(function(err,data,status){
			if (!err) {
				res.send(data);
			}
		});
	}*/
	
	// 查找年龄大于等于 30
	Student.find({age:{$gte: 30}},function(err,data,status){
		if (!err) {
			res.send(data);
		}
	});
	
	// 假设一页 2 条数据，我要获取第 3 页数据
	/*
	Student.find(function(err,data,status){
		if (!err) {
			res.send(data);
		}
	}).skip(2*2).limit(2);
	*/
	
	/*
	// 查找年龄最大的人
	Student.count(function(err,count){
		// count：表示匹配到数据的条数
		Student.find(function(err,data,status){
			if (!err) {
				res.send(data);
			}
			// 年龄升序            跳过的条数       取 1 条数据
		}).sort({age:1}).skip(count-1).limit(1);
	});
	*/
	
	// 简单方法：找最大的话，把最大的放在第一位（降序）；找最小的，就把最小的放在第一位（升序）
	/*
	Student.find(function(err,data,status){
		if (!err) {
			res.send(data);
		}
	}).sort({age:-1}).limit(1);
	*/
});

// 改
app.get("/update",function(req,res){
	// 修改 谁 的数据为 多少？（前端至少传递 2 个参数）
	var name = req.query.name;
	var age = req.query.age;
	// para1：谁   para2：要把 谁 修改为 什么 
	/*
	Student.update({name},{$set:{age}},function(err,result){
		if (!err) {
			res.send("修改成功");
		}else{
			res.send("修改失败");
		}
	});
	*/
	Student.update({name},{age},function(err,result){
		if (!err) {
			res.send("修改成功");
		}else{
			res.send("修改失败");
		}
	});
});

// 删
app.get("/delete",function(req,res){
	// 删除年龄最大的
	Student.find(function(err,data,status){
		// 查询操作没错，并且也找到了年龄最大的
		if (!err && data.length == 1) {
			var obj = data[0];
			// 删除
			Student.remove({_id:obj._id},function(err){
				if (!err) {
					res.send("删除年龄最大的成功");
				}
			});
		}
	}).sort({age:-1}).limit(1);
});

app.listen(3000,function(){
	console.log("服务器启动成功");
});
