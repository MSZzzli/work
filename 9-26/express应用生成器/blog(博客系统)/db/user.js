
// 只处理与用户相关的数据集合操作
var mdb = require('./db');
// 创建构造函数
function User(user){
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}
// 为了模仿 mongoose 模块，save 方法用对象调用，其他（update，find……）用构造函数调用

// 生成 save 方法
User.prototype.save = function(callback){
	// 存入数据
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	}
	// 打开数据库
	mdb.open(function(err,db){
		if (err) {
			// 如果打开失败，通过回调函数告诉调用 save 的人。
			return callback(err);
		}
		// 读取 users 这个集合（没有会帮你自动创建的）
		db.collection('users',function(err,collection){
			if (err) {
				// 读取集合失败
				// 记得关闭数据库
				mdb.close();
				return callback(err);
			}
			collection.insert(user,{safe:true},function(err,user){
				// 关闭数据库
				mdb.close();
				callback(err,user);
			});
		});
	});
}

// 生成 find 方法
// 根据 name 查找是否有这个用户
User.find = function(name,callback){
	// 打开数据库
	mdb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		// 读取 user 集合
		db.collection('users',function(err,collection){
			if (err) {
				// 记得关闭数据库
				mdb.close();
				return callback(err);
			}
			// 查找用户
			collection.findOne({name:name},function(err,user){
				// 关闭数据库
				mdb.close();
				callback(err,user);
			});
		});
	});
};

// 导出用户模块：User
module.exports = User;
