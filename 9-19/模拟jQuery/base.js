// 自运行匿名函数
// 1.首先要解决的第一个问题是：如何把 jQuery 和 $ 暴露给外部全局变量
(function (window,document,undefined) {
	// jQuery/$ 是一个函数，调用这个函数得到对象
	function jQuery(arg){
		return new Base(arg);
	}
	
	// 2. 创建一个构造函数 Base
	function Base(arg){
		// 给 Base 添加一个 elements 属性，记录、保存匹配到的标签元素
		this.elements = [];
		// 判断 arg 的类型：字符串 匹配元素；回调函数 当 DOM 加载完毕后回调
		if (typeof arg == "string") {
			// 是选择器 #id .class tagName
			/*
			var list = document.querySelectorAll(arg);
			for (var i = 0; i < list.length; i++) {
				this.elements.push(list[i]);	
			}
			*/
			switch (arg.charAt(0)){
				case "#":
					// id 选择器
					this.elements.push(document.getElementById(arg.slice(1)));
					break;
				case ".":
					// class 选择器
					var list = document.getElementsByClassName(arg.slice(1));
					for (var i = 0; i < list.length; i++) {
						this.elements.push(list[i]);
					}
					break;
				default:
					// tagName 选择器
					var list = document.getElementsByTagName(arg);
					for (var i = 0; i < list.length; i++) {
						this.elements.push(list[i]);
					}
					break;
			}
		} else if (typeof arg == "function"){
			// 是回调函数，这个方法要 DOM 加载完的时候才回调
			var listener = window.addEventListener("DOMContentLoaded",function(){
				// 回调
				arg();
				// 移除监听
				window.removeEventListener("DOMContentLoaded",listener,true);
			});
		}else{
			// 其他情况（未定），自行补充
			// ……
		}
	}
	
	// 3.在原型中添加更多的方法
	Base.prototype.init = function(){
		alert("我是初始化的操作");
		return this;
	}
	Base.prototype.each = function(cb){
		for (var i = 0; i < this.elements.length; i++) {
			// 修改 this 指向，使 each 里面的回调函数 this 指向当前遍历到的标签元素
			cb.call(this.elements[i],i,this.elements[i]);
		}
		return this;
	}
	// 还有很多API：.eq()、addClass()、css()、.first()……
	
	
	// 还可以直接在 jQuery/$ 上挂载方法
	// $.each()、
	jQuery.init = function(){
		console.log("我是工具类函数");
	}
	jQuery.noConflict = function(){
		window.$ = undefined;
	}
	
	
	// 拓展插件类 $.extend() $.fn.extend
	jQuery.extend = function(name,cb){
		Base.prototype[name] = cb;
	}
	
	
	// 解决外部可以访问 jQuery 和 $。
	window.jQuery = window.$ = jQuery;
	
})(window,document,undefined)
