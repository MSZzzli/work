
// 自定义警告框

// 警告框构造函数
function Alert(message,willDismiss,didDismiss){
	// 展示的提示信息
	this.message = message;
	// 函调函数：在内部保留该回调函数(先不执行)，当点击确定时
	// 再来回调该函数。
	this.willDismiss = willDismiss;
	this.didDismiss = didDismiss;
}

// 在原型中添加方法
// 创建最外层的 div
Alert.prototype.showMask = function(){
	// 弹出警告框时禁止滚动
	document.documentElement.style.overflow = 'hidden'
	var mask = document.createElement('div');
	mask.className = 'mask-div';
	document.body.appendChild(mask);
}

// 整个警告框
Alert.prototype.showBox = function(){
	// 警告框
	var box = document.createElement('div');
	box.className = 'box-div';
	document.body.appendChild(box);
	
	// 提示信息
	var msg = document.createElement('div');
	msg.className = 'msg-div';
	msg.innerText = this.message;
	box.appendChild(msg);
	
	// 灰色横条
	var btnBar = document.createElement('div');
	btnBar.className = 'btnBar-div';
	box.appendChild(btnBar);
	
	// 点击按钮
	var btn = document.createElement('div');
	btn.className = 'btn-div';
	btn.innerText = '确定';
	box.appendChild(btn);
	var _this = this;
	btn.onclick = function(){
		// 回调函数告诉别人警告框要消失，你要做什么事
		if (typeof _this.willDismiss == 'function') {
			_this.willDismiss();
		}
		// 关闭警告框
		_this.close();
		// 回调函数告诉别人警告框要消失，你要做什么事
		if (typeof _this.didDismiss == 'function') {
			_this.didDismiss();
		}
	}
}

// 消失
Alert.prototype.close = function(){
	document.documentElement.style.overflow = 'auto';
	var maskDiv = document.getElementsByClassName('mask-div')[0];
	var boxDiv = document.getElementsByClassName('box-div')[0];
	document.body.removeChild(maskDiv);
	document.body.removeChild(boxDiv);
}

// 展示这个警告框的方法
Alert.prototype.show = function(){
	this.showMask();
	this.showBox();
}

