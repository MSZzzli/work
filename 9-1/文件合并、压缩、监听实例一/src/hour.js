

//时钟的时针

//时针的构造函数（Hour继承于Second）
function Hour(color){
	Second.call(this,color || 'black');
}
Hour.prototype = Object.create(Second.prototype);
Hour.prototype.constructor = Hour;

//重写父类的方法
Hour.prototype.calcRender = function(){
	var args = {};
	args.zIndex = 7;
	args.during = 43200;
	var time = new Date();
	var second = time.getSeconds();
	var minute = time.getMinutes();
	var hour = time.getHours();
	args.delay = -((hour+3)*60*60+minute*60+second);
	return args;
}
Hour.prototype.calcLayout = function(){
	var args = {};
	args.eleWScale = 1.6;
	args.eleHScale = 0.05;
	args.spanEleWScale = 1;
	args.spanEleHScale = 0.05;
	return args;
}
