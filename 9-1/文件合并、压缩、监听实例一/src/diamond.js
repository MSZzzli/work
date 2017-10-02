
//时钟周围小圆点的

//小圆点的构造函数（Diamond继承与Control）
function Diamond(minute,size){
	this.minute = minute;
	this.size = size;
	//弧度
	this.angle = (this.minute - 15)*Math.PI/30;
	Control.call(this);
}
Diamond.prototype = Object.create(Control.prototype);
Diamond.prototype.constructor = Diamond;

//重写的基类的方法
Diamond.prototype.render = function(){
	Control.prototype.render.call(this);
	this.ele.style.borderRadius = '50%';
	this.ele.style.zIndex = 6;
}
Diamond.prototype.layout = function(){
	//大小
	this.ele.style.width = Control.radius*this.size*2 + 'px';
	this.ele.style.height = Control.radius*this.size*2 + 'px';
	
	//位置
	//x = x0 + r*cos(α)   
	//y = y0 + r*sin(α)
	var left = Control.clientWidth / 2 + Control.radius * Math.cos(this.angle);
	var top = Control.clientHeight / 2 +  Control.radius * Math.sin(this.angle);
	this.ele.style.left = left - Control.radius*this.size + 'px';
	this.ele.style.top = top - Control.radius*this.size + 'px';
}







