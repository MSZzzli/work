function getWeather(city){
	//发送get请求获取数据
	$.getJSON('http://api.map.baidu.com/telematics/v3/weather?callback=?'
	,{
		location: city,
		output: "json",
		ak: "iw5m2G7ayDow8ofDdDGVUMB3",
		mcode: "com.BaiduWeather"
	}
	,function(data){
		console.log(data);
		
		// 取出一个天气结果
		var result = data.results[0];
		
		// 处理 header
		// 显示城市信息
		$("header").text(result.currentCity);
		
		// 处理 main
		// 取出 pm25 的值
		var pm25 = result.pm25;
		// 取出当前实时天气情况
		var currentW = result.weather_data[0];
		// 显示天气图片
		var hour = new Date().getHours();
		var pictureUrl = "";
		if (hour >= 6 && hour <= 18) {
			// 白天
			// pictureUrl = currentW.dayPictureUrl;
			pictureUrl = currentW.dayPictureUrl.slice(currentW.dayPictureUrl.lastIndexOf("/")+1);
			pictureUrl = "days/" +　pictureUrl;
		} else{
			// 晚上
			// pictureUrl = currentW.nightPictureUrl;
			pictureUrl = currentW.nightPictureUrl.slice(currentW.nightPictureUrl.lastIndexOf("/")+1);
			pictureUrl = "nights/" +　pictureUrl;
		}
		$("main div.icon").css("background-image","url(" + pictureUrl + ")");
		// 显示温度
		$("main div.temper").text(currentW.temperature);
		// 显示天气情况
		$("main div.weather").text(currentW.weather);
		// 显示度
		$("main div.wind").text(currentW.wind);
		// 实时
		var nowTemp = currentW.date.slice(currentW.date.indexOf("：")+1);
		nowTemp = nowTemp.replace(")","");
		$("main div.current").text("实时温度" + nowTemp + ",空气指数" +　pm25 +　"，" +　getPM25String(pm25));
		
		// 处理 footer
		var sections = $("footer section");
		for (var i = 0; i < sections.length; i++) {
			// 取出对应的 section
			var section = sections[i];
			// 取出这个section对应的天气
			var weather = result.weather_data[i+1];
			// 显示
			$("footer div.week").text(weather.date);
			// 判断白天黑夜或者显示我们的图片自行处理,和上面一样
			$("div.icon",section).css("background-image",weather.dayPictureUrl);
			$("div.temper",section).text(weather.temperature);
			$("div.weather",section).text(weather.weather);
			$("div.wind",section).text(weather.wind);
		}
	});
}

function getPM25String(pm25){
	if (pm25 <= 50) {
		return "优";
	} else if(pm25 <= 100){
		return "良";
	} else if(pm25 <= 150){
		return "轻度污染";
	} else if(pm25 <= 200){
		return "中度污染";
	} else if(pm25 <= 300){
		return "重度污染";
	} else{
		return "严重污染,来场大风,刮到其他国家!";
	}
}


// 获取当前定位信息
function getCurrentCity(){
	 $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
            alert('国家：' + remote_ip_info.country + '<BR>省：' + remote_ip_info.province + '<BR>市：' + remote_ip_info.city + '<BR>区：' + remote_ip_info.district + '<BR>ISP：' + remote_ip_info.isp + '<BR>类型：' + remote_ip_info.type + '<BR>其他：' + remote_ip_info.desc);
        	var city = remote_ip_info.city + "市";
        	getWeather(city);
        } else {
            alert('没有找到匹配的IP地址信息！');
        }
    });
}

getCurrentCity();