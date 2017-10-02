var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ZhiYou");
var db = mongoose.connection;
db.on("open",function(){
	console.log("数据库打开成功");
});
var Schema = mongoose.Schema;

// 班级数据集合
var classSchema = new Schema({
	subject: String,
	session: Number,
	classroom: String,
	teacher: String
});
var Class = mongoose.model("Class",classSchema);

// 学生数据集合
// {versionKey:false}：去掉版本号（__v:0）
var studentSchema = new Schema({
	name: String,
	age: Number,
	// 类似外键 (ref：这个 field 域 和 那个数据集合建立映射关系)
	classInfo: {type:Schema.Types.ObjectId,ref:"Class"}
},{versionKey:false});
var Student = mongoose.model("Student",studentSchema);


//var cla = new Class({
//	subject:"VR",
//	session:1,
//	classroom:"软楼305",
//	teacher:"张老师"
//});
//cla.save();


//Class.findOne({subject:"H5",session:1},function(err,cla){
//	var stu = new Student({
//		name: "王五",
//		age: 35,
//		classInfo: cla._id
//	});
//	stu.save();
//});


// 找 H5 1 班的所有学生
Class.findOne({subject:"H5",session:1},function(err,cla){
	Student.find({classInfo:cla._id},function(err,data){
		console.log(data);
	}).populate("classInfo");
	// populate()：把查询结果中的某一列（classInfo）（前提：这一列必须提前关联过某个
	// 数据集合）的对应数据信息直接从对应集合查询并添加到这个属性上面。
});












