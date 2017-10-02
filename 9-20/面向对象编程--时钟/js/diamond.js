// Diamond：表盘一周的小圆点（继承 Control）
function Diamond(index){
	// 对应点的索引
	this.index = index;
	// 对应点的弧度
	this.angle = index*6*Math.PI/180;
	Control.call(this);
}
Diamond.prototype = Object.create(Control.prototype);
Diamond.prototype.constructor = Diamond;

// 重写基类的方法
Diamond.prototype.render = function(){
	Control.prototype.render.call(this);
	// 添加自己独有的样式
	this.ele.style.borderRadius = "50%";
	this.ele.style.zIndex = 5;
}
Diamond.prototype.layout = function(){
	Control.prototype.layout.call(this);
	var size = this.index % 5 == 0 ? 0.02 : 0.01;
	this.ele.style.width = this.ele.style.height = Control.radius*size*2+"px";
	// 公式
	// x = x0 + r*cos(a)
	// y = y0 + r*sin(a)
	this.ele.style.left = Control.width/2 + 
	Control.radius*0.8*Math.cos(this.angle) - Control.radius*size +"px";
	this.ele.style.top = Control.height/2 + 
	Control.radius*0.8*Math.sin(this.angle) - Control.radius*size +"px";
}
