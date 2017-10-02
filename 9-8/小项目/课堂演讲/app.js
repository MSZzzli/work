//加载模块包
var express = require('express');
var bodyParser = require('body-parser');

//处理文件的读写
var fs = require('fs');
var multer = require('multer');

var app = express();
var form = multer();

//中间插件和处理post请求数据

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

//处理获取数据 (获取账号和密码)
app.get('/message', function(req, res) {
	var name = req.query.name;
	var psw = req.query.psw;
	//	console.log(name);
	//	console.log(psw);
	//其实就是把message.txt文件里的数据读出来  返回给前端 (以JSON数据)
	//判断文件存在与否
	fs.exists('data/message.txt', function(exists) {
		if (exists) {
			//读取数据
			fs.readFile('data/message.txt', function(error, data) {
				//读取文件成功
				if (!error) {
					if (data.length == 0) {
						res.status(200).send('[]');
					} else {
						//去掉"," ,加上'['']'
						var result = '[' + data;
						result = result.substr(0, result.length - 1);
						result = result + ']';
						var arr = JSON.parse(result);
						console.log(arr);
						//返回给前端

						for (var i = 0; i < arr.length; i++) {
							//当注册用户已存在时 
							if (arr[i].name == name && arr[i].psw == psw) {
								res.status(200).send("登录成功");
								console.log("登录成功");
								return;
							} else if (arr[i].name == name && arr[i].psw != psw) {
								console.log("密码有误");
								res.status(200).send("密码有误");
								return;
							}
						}
						//如果没有注册 
						console.log("用户没有注册");
						res.status(200).send("用户没有注册");
					}
				} /*else {
					//返回给前端
					res.status(200).send("[]");
				}*/
			});
		}
	});
});

//处理提交数据(注册的账户信息)
app.post('/add', form.array(), function(req, res) {
	var name = req.body.name;
	var psw = req.body.psw;
	//判断账户是否存在
	//其实就是把message.txt文件里的数据读出来  判断账户是否存在 (以JSON数据)
	//判断文件存在与否
	//判断文件是否存在
	fs.exists('data', function(exits) {
		if (!exits) { //文件夹不存在
			fs.mkdirSync('data');
			fs.appendFile('data/message.txt', '');
		}
	});
	//把用户注册的数据保存到服务器
	var message = {
		name,
		psw
	};
	//读取数据
	fs.readFile('data/message.txt', function(error, data) {

		//文档里面得内容不为空是
		if (data.length != 0) {
			//去掉"," ,加上'['']'
			var result = '[' + data;
			result = result.substr(0, result.length - 1);
			result = result + ']';
			var arr = JSON.parse(result);
			for (var i = 0; i < arr.length; i++) {
				//当注册用户已存在时 
				if (arr[i].name == name) {

					res.status(200).send('用户已存在');
					return false;
				}
			}
			//当注册的用户不存在时，写入文档中
			//写入数据到文件夹中
			fs.appendFile('data/message.txt', JSON.stringify(message) + ',', function(error) {
				if (error) {
					console.log('保存文件时处错误啦' + error);
				}
			});
			res.status(200).send('注册成功');

		} else { //文档里面得数据为空时 即没有用户存在 时
			//写入数据到文件夹中
			fs.appendFile('data/message.txt', JSON.stringify(message) + ',', function(error) {
				if (error) {
					console.log('保存文件时处错误啦' + error);
				}
			});
			res.status(200).send('注册成功');
		}
	});
});

//监听端口
app.listen(3000, function() {
	console.log('server running......');
});