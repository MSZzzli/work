/*
 * 面试一
 * 实现一个 compose 函数，能够连续的调用单参函数（只有一个参数的函数）。
 * 比如：compose(d(c(b(a(num)))));
 * 实现形式：compose(d,c,b,a);
 * 
 * 实例：
 * function addOne(num){
 * 	return num + 1;
 * }
 * function multiTwo(num){
 * 	return num * 2;
 * }
 * function divThree(num){
 * 	return num / 3;
 * }
 * function toString(num){
 * 	return num + '';
 * }
 * 执行顺序从后往前
 * compose(addOne,multiTwo,divThree,toString);
 */


// 方法一
// 定义一个构造函数
function Method(num){
	this.num = num;
}
// 原型写方法
Method.prototype.compose = function(){
	// 这里不能写形参，因为不知道调用这个方法的人传递了几个实参过来。
	// 这里不限制用户传递几个参数，但是我们可以通过 arguments 获取实参。
	var result = this.num;
	for (var i = arguments.length-1; i > -1; i--) {
		result = arguments[i](result);
	}
	return result;
}

// 方法二
/*
function compose(){
	var args = arguments;
	return function(num){
		for (var i = args.length-1; i > -1; i--) {
			num = args[i](num);
		}
		return num;
	}
}
*/

// 方法三
function compose(){
	var args = arguments;
	return function(num){
		// 不用 for 循环，用递归
		var i = args.length-1;
		function di(){
			if (i > -1) {
				num = args[i](num);
				i --;
				di();
			}
		}
		di();
		return num;
	}
}










