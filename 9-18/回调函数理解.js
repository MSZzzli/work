function b(goods,callback){
	alert("this is b");
	// 假设这里经过了非常复杂的计算，得到了结论和结果
	var result = {code:1,msg:"获取到了数据"+goods};
	if (typeof callback == "function") {
		// 如果使用此 API 的人，传递了回调函数过来，那么我才回调
		var data = callback(result);
		console.log(data);
	}
} 
