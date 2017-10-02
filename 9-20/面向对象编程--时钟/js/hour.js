// Hour：时钟的时钟（继承于 Second）
function Hour(){
	Second.call(this);
}
Hour.prototype = Object.create(Second.prototype);
Hour.prototype.constructor = Hour;


// 重写父类方法 renderData
Hour.prototype.renderData = function(){
	var data = {};
	data.zIndex = 7;
	data.duration = 12*3600;
	var date = new Date();
	data.delay = - (date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds());
	data.color = "blue";
	return data;
}

Hour.prototype.layoutData = function(){
	var data = {};
	data.widthRatio = 0.015;
	data.heightRatio = 0.5;
	data.radiusRatio = 0.6;
	return data;
}