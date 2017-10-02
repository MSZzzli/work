
//时钟的分针

//分针的构造函数（Minute继承于Second）
function Minute(color){
	Second.call(this,color || 'black');
}
Minute.prototype = Object.create(Second.prototype);
Minute.prototype.constructor = Minute;

//重写父类的方法
Minute.prototype.calcRender = function(){
	var args = {};
	args.zIndex = 8;
	args.during = 3600;
	var time = new Date();
	var second = time.getSeconds();
	var minute = time.getMinutes();
	args.delay = -((minute+15)*60 + second);
	return args;
}
Minute.prototype.calcLayout = function(){
	var args = {};
	args.eleWScale = 1.8;
	args.eleHScale = 0.04;
	args.spanEleWScale = 1.1;
	args.spanEleHScale = 0.04;
	return args;
}
