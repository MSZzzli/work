
// 只处理数据库的连接行为
// 导入数据库连接信息
var settings = require('../settings');
// 获取数据库
var Database = require('mongodb').Db;
// 获取连接数据库
var Connection = require('mongodb').Connection;
// 获取数据库服务
var Server = require('mongodb').Server;

// 创建数据库对象
// 数据库名字   server{数据库连接地址  数据库端口号}   安全写入数据
var db = new Database(settings.db,
	new Server(settings.host,settings.port),
    {safe:true});
   
// 这里做 打开数据库、关闭数据库、增、删、改、查等都离不开 db 对象。   
module.exports = db;