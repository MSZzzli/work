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

module.exports = {
	Class,
	Student
}










