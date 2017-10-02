var app = require("./module/app");

// 使用 view.js 里面的路由
app.use(require("./router/view"));
// 使用 user.js 里面的路由
app.use("/user",require("./router/user"));
// 使用 question.js 里面的路由
app.use("/question",require("./router/question"));

app.listen(3000,function(){
	console.log("问答项目服务器已启动……");
});







