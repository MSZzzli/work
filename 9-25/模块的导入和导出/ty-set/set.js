// 自定义集合
// 自定义集合的构造函数有两种传递参数的方法：
// 1.传入一个可迭代对象，用迭代对象中的元素组成一个集合
// 2.传入多个参数，用这些参数组成一个集合
function Set(arg){
	// 判断传入参数的数据类型
	// A instanceof B：A是否是B的一个实例（对象）
	
	var item = null;
	if (arg instanceof Array) {
		item = arg;
	} else{
		item = Array.from(arguments);
	}
	this.item = Set.unique(item);
}
// 元素去重
Set.unique = function(item){
	// 只能用于纯数字
	/*
	var arr = [];
	var hash = {};
	for (var i = 0; i < item.length; i++) {
		if (!hash[item[i]]) {
			arr.push(item[i]);
			hash[item[i]] = true;
		}
	}
	return arr;
	*/
	
	var arr = [];
	for (var i = 0; i < item.length; i++) {
		if (arr.indexOf(item[i]) == -1) {
			arr.push(item[i]);
		}
	}
	return arr;
}

// 判断两个集合是否相等（这里指元素是否一样）
Set.prototype.equalTo = function(oSet){
	// 先比较数组长度
	if (this.item.length != oSet.item.length) {
		return false;
	}
	
	// 长度相等：拿第一个数组中的每一个元素去和第二个数组匹配，
	// 只要有一个匹配不上，就说明不等。
	for (var i = 0; i < this.item.length; i++) {
		// 不能这样写：this.item[i] == oSet.item[i]。就按照顺序比较了
		// 而常规上的集合是无序的。
		if (oSet.item.indexOf(this.item[i]) == -1) {
			return false;
		}
	}
	return true;
}

// 求两个集合的并集
Set.prototype.unite = function(oSet){
	var arr = this.item.concat(oSet.item);
	return new Set(arr);
}

// 求两个集合的交集
Set.prototype.intersection = function(oSet){
	var arr = [];
	this.item.forEach(function(value){
		if (oSet.item.indexOf(value) >= 0) {
			arr.push(value);
		}
	});
	return new Set(arr);
}

// 求两个集合的差集
Set.prototype.difference = function(oSet){
	var arr = [];
	this.item.forEach(function(value){
		if (oSet.item.indexOf(value) < 0) {
			arr.push(value);
		}
	});
	return new Set(arr);
}

// 在 nodejs 中，每一个 js 文件文件都是一个单独的代码块，如果外部 js 文件需要使用
// 某个 js 文件中的某个功能（函数、变量），就必须把本 js 文件中的这个功能导出。如果
// 没有任何功能导出，则外部不能使用 这个 js 文件中的任何东西。

// 导出模块：exports / module.exports

function say(){
	console.log("这里是 set.js 文件里面的 say 方法");
}

// 第一种导出：exports
/*
// module.exports.set = Set;
// module.exports.say = say;
exports.set = Set;
exports.say = say;
*/

// 第二种导出：module.export
// module.exports = {say,Set}; // 注意：这样写的话，属性 Set 的 S 是大写的。
module.exports = {say:say,set:Set};
