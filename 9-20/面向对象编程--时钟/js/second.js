// Second：秒针（考虑分针、时针要继承于秒针，这里需要再次提取公共功能，进行封装）
function Second(){
	Control.call(this);
}
Second.prototype = Object.create(Control.prototype);
Second.prototype.constructor = Second;


// 在原型中添加方法
Second.prototype.renderData = function(){
	var data = {};
	data.zIndex = 9;
	data.duration = 60;
	data.delay = - (new Date().getSeconds());
	data.color = "red";
	return data;
}
Second.prototype.layoutData = function(){
	var data = {};
	data.widthRatio = 0.005;
	data.heightRatio = 0.8;
	data.radiusRatio = 0.9;
	return data;
}


// 重写父类的方法
Second.prototype.render = function(){
	Control.prototype.render.call(this);
	// 获取数据
	var data = this.renderData();
	// 秒针独有的样式
	this.ele.style.backgroundColor = "initial";
	this.ele.style.zIndex = data.zIndex;
	this.ele.style.animation = "rot " + data.duration + "s linear infinite";
	this.ele.style.animationDelay = data.delay + "s";
	// 创建一个子标签
	this.spanEle = document.createElement("span");
	this.spanEle.style.display = "block";
	this.spanEle.style.backgroundColor = data.color;
	this.ele.appendChild(this.spanEle);
}
Second.prototype.layout = function(){
	Control.prototype.layout.call(this);
	// 获取数据
	var data = this.layoutData();
	// 秒针独有的布局
	this.ele.style.width = Control.radius*data.widthRatio*2 + "px";
	this.ele.style.height = Control.radius*data.heightRatio*2 + "px";
	this.ele.style.top = Control.height/2 - Control.radius*data.heightRatio + "px";
	this.ele.style.left = Control.width/2 - Control.radius*data.widthRatio + "px";
	// 设置子标签样式
	this.spanEle.style.width = "100%";
	this.spanEle.style.height = Control.radius*data.radiusRatio + "px";
	this.spanEle.style.borderRadius = Control.radius*data.widthRatio*2 + "px";
}




