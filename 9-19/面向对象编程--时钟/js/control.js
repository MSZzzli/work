// 基类：其他类都直接或者间接继承于这个基类
function Control(){
	this.render();
	this.layout();
}

// 在原型中添加方法
// render：创建一个 div 标签
Control.prototype.render = function(){
	this.ele = document.createElement("div");
	this.ele.style.background = "black";
	// 让所有的可视化标签元素都相对 body 做绝对定位
	this.ele.style.position = "absolute";
	document.body.appendChild(this.ele);
}
// layout：布局界面（控制标签元素的宽高和位置）
Control.prototype.layout = function(){
	
}

// 1.获取当前屏幕的宽和高的最小值
// 2.当屏幕大小发生改变是，重新获取其值
// Control.resizeWindow 是一个类方法，调用的时候不能对象调用，用类名去调用
// Control.nameabc = "123"; 是一个类属性，调用的时候不能对象调用，用类名去调用
Control.resizeWindow = function(){
	Control.width = document.documentElement.clientWidth;
	Control.height = document.documentElement.clientHeight;
	Control.radius = Math.min(Control.width,Control.height) / 2;
}
Control.resizeWindow();

