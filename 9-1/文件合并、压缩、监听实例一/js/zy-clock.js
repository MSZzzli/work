/*智游教育*/

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








	
//时钟的构造函数（创建点 创建秒针 创建分针 创建时针……）

function Clock(){
	//添加样式表
	var num = 0
	var styleEle = document.createElement('style');
	document.head.appendChild(styleEle);
	styleEle.sheet.insertRule('html{height:100%}',num++);
	styleEle.sheet.insertRule('body{margin:0;height:100%;}',num++);
	styleEle.sheet.insertRule('*{box-sizing:border-box}',num++);
	styleEle.sheet.insertRule('@keyframes rotation{from{transform: rotate(0);}to{transform: rotate(360deg);}}',num++);
	
	
	//创建时钟
	var dot = new Dot();
	var second = new Second();
	var minute = new Minute('blue');
	var hour = new Hour('green');
	
	var diamonds = [];
	for (var i = 0; i < 60; i++) {
		var diamond = null;
		if (i % 5 == 0) {
			diamond = new Diamond(i,0.02);
		} else{
			diamond = new Diamond(i,0.01);
		}
		diamonds.push(diamond);
	}
	
	//处理当窗口大小变化时重新布局
	window.onresize = function(){
		Control.windowResized();
		dot.layout();
		second.layout();
		minute.layout();
		hour.layout();
		for (var index in diamonds) {
			diamonds[index].layout();
		}
	}
	
}
