
// Ajax：Asynchronous javascript and XML（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。

$("button.Ajax").click(function(){
	// 皮肤插件 Layer
	// tips 层  param1：提示信息   param2：弹出位置 param3：位置、颜色等设置
	// layer.tips("莫慌，紧急加载中……",this,{tips:[1,"#f00"]});
	// 提示框  param1：提示信息  param2：有表情地提示  param3：消失后的回调函数
	/*layer.msg("拼命加载中……",{icon: 6},function(){
		console.log("我要消失了（默认是3秒）");
	});*/
	// 页面过渡、页面刷新、刷新更多数据 param1：风格(0\1\2)  param2:时间
	var index = layer.load(3, {time: 10*1000});
	setTimeout(function(){
		// 2s之后关闭(请求完成)
		layer.close(index);
	},2000);
	
	// 晚上任务：1.把grunt练习一下  2.把layer文档练练（http://layer.layui.com/api.html#layer.msg）
	// 3.把Ajax认真看一遍（http://www.css88.com/jqapi-1.9/jQuery.ajax/）
});






















