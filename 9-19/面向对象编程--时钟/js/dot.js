// 时钟中间的小圆点
function Dot(){
	// 构造函数继承
	Control.call(this);
}
// 原型继承
Dot.prototype = Object.create(Control.prototype)
Dot.prototype.constructor = Dot;

// 重写父类方法
Dot.prototype.render = function(){
	Control.prototype.render.call(this);
	// 添加自己独有的功能
	this.ele.style.borderRadius = "50%";
	this.ele.style.zIndex = 10;
}
Dot.prototype.layout = function(){
	Control.prototype.layout.call(this);
	// 添加自己独有的功能
	// 大小
	var r = Control.radius*0.025;
	this.ele.style.width = r*2 + "px";
	this.ele.style.height = r*2 + "px";
	// 位置
	this.ele.style.top = Control.height / 2 - r  +　"px";
	this.ele.style.left = Control.width / 2 - r + "px";
}




