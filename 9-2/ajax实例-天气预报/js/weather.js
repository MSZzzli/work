
//发送get请求获取数据
$.getJSON('http://api.map.baidu.com/telematics/v3/weather?callback=?'
,{
	location: "太原市",
	output: "json",
	ak: "iw5m2G7ayDow8ofDdDGVUMB3",
	mcode: "com.BaiduWeather"
}
,function(data){
	console.log(data);
	
});
