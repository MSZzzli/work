
//时钟中央的圆点

//创建Dot的构造函数（Dot继承于Control）
function Dot(){
	Control.call(this);
}
Dot.prototype = Object.create(Control.prototype);
Dot.prototype.constructor = Dot;

//派生类重写基类方法
Dot.prototype.render = function(){
	Control.prototype.render.call(this);
	this.ele.style.borderRadius = '50%';
	this.ele.style.zIndex = 10;
}
Dot.prototype.layout = function(){
	var r = Control.radius*0.03;
	this.ele.style.width = r * 2 + 'px';
	this.ele.style.height = r * 2 + 'px';
	this.ele.style.top = Control.clientHeight / 2 - r + 'px';
	this.ele.style.left = Control.clientWidth / 2 - r + 'px';
}




