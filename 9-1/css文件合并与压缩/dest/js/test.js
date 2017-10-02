
//控件类，页面所有可见元素都从这里继承
//提供了创建元素的功能（render方法）和布局界面的功能（layout方法）
console.log('改变了');
function Control(){
	this.render();
	this.layout();
}

//公共的填充颜色
Control.prototype.fillColor = 'black';

//添加到界面上（创建元素）
Control.prototype.render = function(){
	this.ele = document.createElement('div');
	this.ele.style.backgroundColor = this.fillColor;
	this.ele.style.position = 'absolute';
	document.body.appendChild(this.ele);
}

//调整大小及在页面上的位置
Control.prototype.layout = function(){
	
}

//构造函数.prototype.method = function(){}  调用时用对象调
//构造函数.method = function(){}  调用时用构造函数调

//添加窗口工作区宽高数据到Control，便于当窗口发生变化时，派生类使用
Control.windowResized = function(){
	Control.clientWidth = document.documentElement.clientWidth;
	Control.clientHeight = document.documentElement.clientHeight;
	//Control.radius = Control.clientWidth > Control.clientHeight ? Control.clientHeight / 2 : Control.clientWidth / 2;
	Control.radius = Math.min(Control.clientWidth,Control.clientHeight)/2;
	console.log('宽：'+Control.clientWidth+' 高：'+Control.clientHeight+' 半径：'+Control.radius);
}
Control.windowResized();



//时钟的秒针

//秒针的构造函数（Second继承于Control）
function Second(color){
	this.fillColor = color || 'red';
	Control.call(this);
}
Second.prototype = Object.create(Control.prototype);
Second.prototype.constructor = Second;

//给原型添加方法
Second.prototype.calcRender = function(){
	var args = {};
	args.zIndex = 9;
	args.during = 60;
	var time = new Date();
	var second = time.getSeconds();
	args.delay = -(second+15);
	return args;
}
Second.prototype.calcLayout = function(){
	var args = {};
	args.eleWScale = 2;
	args.eleHScale = 0.02;
	args.spanEleWScale = 1.2;
	args.spanEleHScale = 0.02;
	return args;
}

//重写基类方法
Second.prototype.render = function(){
	Control.prototype.render.call(this);
	var args = this.calcRender();
	//这个div负责转
	this.ele.style.backgroundColor = 'initial';
	this.ele.style.zIndex = args.zIndex;
	this.ele.style.animationName = 'rotation';
	this.ele.style.animationTimingFunction = 'linear';
	this.ele.style.animationIterationCount = 'infinite';
	this.ele.style.animationDuration = args.during + 's';
	this.ele.style.animationDelay = args.delay + 's';
	
	//这个span负责显示的
	this.spanEle = document.createElement('span');
	this.spanEle.style.display = 'block';
	this.spanEle.style.backgroundColor = this.fillColor;
	this.ele.appendChild(this.spanEle);
}
Second.prototype.layout = function(){
	var args = this.calcLayout();
	var r = Control.radius;
	//这个div负责转
	this.ele.style.width = r*args.eleWScale + 'px';
	this.ele.style.height = r*args.eleHScale + 'px';
	this.ele.style.left = Control.clientWidth / 2 - r*args.eleWScale / 2 + 'px';
	this.ele.style.top = Control.clientHeight / 2 - r*args.eleHScale / 2 + 'px';
	
	//这个span负责显示的
	this.spanEle.style.width = r*args.spanEleWScale+'px';
	this.spanEle.style.height = r*args.spanEleHScale + 'px';
	this.spanEle.style.borderRadius = r*args.spanEleHScale / 2 + 'px';
}











