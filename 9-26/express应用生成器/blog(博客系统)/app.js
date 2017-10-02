
// 导入 express 模块
var express = require('express');

// 导入 path 模块
// 提供了很多用于处理文件路径的小工具
// 参考：node.js教程|菜鸟教程 --> 工具模块 --> Path 模块
var path = require('path');

// 有一个名称为serve-favicon的中间件，可以用于请求网页的logo。
// var favicon = require('serve-favicon');

// morgan：记录器。主要功能：在控制台显示 request 请求信息
// 例如：
// GET / 200 27.017 ms - 207
// GET /stylesheets/style.css 304 2.793 ms - -
var logger = require('morgan');

// 导入 cookie-parser 模块
var cookieParser = require('cookie-parser');

// 导入 body-parser 模块
var bodyParser = require('body-parser');

// 导入路由对象 routes (注意：这里导出的 routes 其实并不是路由，只是一个回调函数而已)
var routes = require('./routes/index');

// 导入路由对象 users（注意：使用这个路由，需要加上上下文路径 /users）
// var users = require('./routes/users');

// 导入数据库连接信息
var settings = require('./settings');

// 安装flash
// 插件flash 是一个在 session 中用于存储信息的特定区域。信息写入 flash ，下一次显示完毕后即被清除。
// 典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面。
var flash = require('connect-flash');

// 为了让node.js支持会话，这里要安装两个插件
// 导入会话 express-session 模块
var session = require('express-session'); 
// 导入将会话存到数据库模块 connect-mongo
var mongoStore = require('connect-mongo')(session);

// 生成服务器对象
var app = express();

// 使用 session 会话
app.use(session({
	// 防止篡改 cookie
	secret: settings.cookieSecret,
	// 设置存储的位置（数据库）
	key: settings.db,
	// 设置 cookie 的生命周期
	cookie: {maxAge:30*24*60*60*1000},
	// 存储（设置数据库当前连接地址）
	store: new mongoStore({url:'mongodb://localhost/blog'}),
	// resave：强制将 session 保存到 mongoStore 中
	resave: false,
	// 强制保存没有初始化的 session 到 storage 中
	saveUninitialized: true
}));

// view engine setup
// __dirname：获取当前模块文件所在目录的完整路径
// path.join：用于连接路径。该方法的主要用途在于，会正确使用当前系统
// 的路径分隔符，Unix系统是"/"，Windows系统是"\"。
app.set('views', path.join(__dirname, 'views'));
// 设置视图引擎 ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 使用 flash
app.use(flash());
// 记录器
app.use(logger('dev'));
// 处理 post 请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 使用 cookie
app.use(cookieParser());
// 指定静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 一般使用路由的常用写法
// app.use('/', routes);
// 这里这样写：routes 是一个回调函数，把 app 对象传到模块 index.js 文件里面
// 那么在 index.js 中就能正常使用 app 这个变量处理请求了。
routes(app);

// 添加端口号和监听
app.listen(3000,function(){
	console.log('running……');
});
