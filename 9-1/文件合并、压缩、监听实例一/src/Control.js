
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

