
// 只处理与文章相关的数据集合操作
var mdb = require('./db');

// 创建构造函数
var Post = function(post){
	this.name = post.name;
	this.title = post.title;
	this.post = post.post;
}
// 添加 save 方法
Post.prototype.save = function(callback){
	var date = new Date();
	var time = {
		date: date,
		shortTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
		longTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+
				  ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	}
	var post = {
		name: this.name,
		title: this.title,
		post: this.post,
		time: time
	}
	// 打开数据库
	mdb.open(function(err,db){
		if (err) {
			return callback('打开数据库失败');
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mdb.close();
				return callback('读取集合posts失败');
			}
			collection.insert(post,{safe:true},function(err,data){
				mdb.close();
				callback(err,data);
			});
		});
	});
}

// 获取文章的方法
Post.find = function(condition,callback){
	mdb.open(function(err,db){
		if (err) {
			return callback('打开数据库失败');
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mdb.close();
				return callback('读取集合posts失败');
			}
			collection.find(condition).sort({time:-1}).toArray(function(err,data){
				mdb.close();
				return callback(err,data);
			});
		});
	});
};

// 导出文章模块：Post
module.exports = Post;