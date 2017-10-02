/*
 * 面试题二
 * 
 * 实现一个 People 类
 * 
 * 假设 p 是 People 类的一个对象
 * 
 * 当执行 p.on('resolve',function1);
 *       p.on('resolve',function2);
 *       p.on('click',function3);
 * 也就说，通过 on 方法可以给对象绑定方法
 * 
 * 当执行 p.emit('resolve') 时，可以触发对应状态下回调函数(可能不止一个)
 * 
 * 当执行 p.off('resolve',function) 时，可以解除 resolve 状态下的 function 事件
 * （如果用户没有传递 function，那么我们直接全部解除 resolve 状态下的事件）
 */


// 实现一个 People 类
function People(){
	// 将来存储键和对应回调函数的形式：{resolve:[fun1,fun2],reject:[fun]}
	this.list = {};
}

// 在 People 原型中添加 on emit 和 off 事件
// 绑定事件 on
People.prototype.on = function(state,callback){
	// 根据状态  state 判断之前是否已经绑定过这类事件；如果绑定过，
	// 直接在数组中追加；如果没有绑定，给这个对象的属性创建一个新的数组；
	if (!this.list[state]) {
		this.list[state] = [];
	}
	// 添加
	this.list[state].push(callback);
}
// 触发
People.prototype.emit = function(state){
	// 根据传递过来的 state 找到对应回调函数，依次触发回调函数
	var cbArr = this.list[state];
	if (cbArr) {
		for (var i = 0; i < cbArr.length; i++) {
			// 修改 this 指向，保证回调函数里面 this 指向对象 p 本身
			cbArr[i].call(this,"把结果在这传递回去");
		}
	}else{
		alert("此状态　" + state + "　还未绑定事件");
	}
}
// 解除
People.prototype.off = function(state,callback){
	var cbArr = this.list[state];
	if (cbArr) {
		if (callback) {
			// 传递了 callback 就只移除 state 状态下的 callback 方法
			var index = cbArr.indexOf(callback);
			if (index == -1) {
				// 找不到该回调方法
				alert("该方法还未绑定?你可能已经移除过?");
				return;
			}
			cbArr.splice(index,1);
		} else{
			// 没传递 callback,把 state 状态下的方法全部移除
			// this.list[state] = null;
			cbArr.length = 0;
		}
	}else{
		alert("此状态 " + state + " 还未绑定事件");
	}
}
