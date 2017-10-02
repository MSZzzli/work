//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

// 导入处理用户模块：User
var User = require('../db/user.js');
// 导入处理文章模块：Post
var Post = require('../db/post.js');
// 导入加密算法模块：crypto
var crypto = require('crypto');

module.exports = function(app){
	// 显示首页的网络请求
	// 第一：如果没有登录，重定向到登录页面，登录成功之后再跳回首页，显示登录用户的博客。
	/*
	app.get('/',checkNotLogin,function(req, res) {
		Post.find({name:req.session.user.name},function(err,data){
			res.render('index',{
				title: '首页',
				data: data,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	*/
	// 第二：不管登录与否，首页都显示所有用户的博客。
	app.get('/',function(req, res) {
		Post.find({},function(err,data){
			res.render('index',{
				title: '首页',
				data: data,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	
	// 处理注册
	app.get('/register',checkLogin,function(req,res){
		res.render('register',{
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/register',function(req,res){
		var name = req.body.name;
		var password = req.body.password;
		var repsw = req.body.repassword;
		// 首先：密码是否相等
		if (password != repsw) {
			req.flash('error','两次输入密码不一致');
			return res.redirect('/register');
		}
		// 然后：判断用户名是否已经存在
		User.find(name,function(err,data){
			if(err){
				req.flash('error',err);
				return res.redirect('/register');
			}
			if(data){
				req.flash('error','用户已被抢注');
				return res.redirect('/register');
			}
			// 最后：存储用户
			// 加密：采用 md5 进行加密（32位）
			var md5 = crypto.createHash('md5');
			password = md5.update(password).digest('hex');
			// 存储
			var user = new User({name,password,email:req.body.email});
			user.save(function(err,data){
				if(err){
					req.flash('error',err);
					res.redirect('/register');
				}else{
					// 注册成功，免登陆跳转首页。把用户信息保存到 session 中
					req.session.user = user;
					req.flash('success','注册成功');
					res.redirect('/');
				}
			});
		});
	});
	
	// 处理登陆
	app.get('/login',checkLogin,function(req,res){
		res.render('login',{
			title: '登陆',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/login',function(req,res){
		User.find(req.body.name,function(err,data){
			// 判断用户是否存在
			if (!data) {
				req.flash('error','用户不存在！');
				return res.redirect('/login');
			}
			// 判断密码是否正确
			var md5 = crypto.createHash('md5');
			password = md5.update(req.body.password).digest('hex');
			if (password != data.password) {
				req.flash('error','密码错误！');
				return res.redirect('/login');
			}
			// 登陆成功
			req.flash('success','登陆成功');
			req.session.user = data;
			res.redirect('/');
		});
	});
	
	// 退出登陆
	app.get('/logout',function(req,res){
		req.session.user = null;
		req.flash('success','退出登陆成功！');
		res.redirect('/login');
	});
	
	// 处理发表
	app.get('/post',checkNotLogin,function(req,res){
		res.render('post',{
			title: '发表',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/post',function(req,res){
		req.body.name = req.session.user.name;
		var post = new Post(req.body);
		post.save(function(err,data){
			if (err) {
				req.flash('error',err);
				return res.redirect('/post');
			}
			req.flash('success','发布成功！');
			res.redirect('/post');
		});
	});
	
	// 检测没有登陆
	function checkNotLogin(req,res,next){
		if (!req.session.user) {
			req.flash('error','未登录，请先登陆！');
			return res.redirect('/login');
		}
		next();
	};
	
	// 检测已经登陆
	function checkLogin(req,res,next){
		if (req.session.user) {
			req.flash('error','已经登陆，请务重复登陆！');
			return res.status(200).send('<script>history.go(-1);</script>');
		}
		next();
	}
	
}


