// Minute：时钟的分针（继承于 Second）
function Minute(){
	Second.call(this);
}
Minute.prototype = Object.create(Second.prototype);
Minute.prototype.constructor = Minute;


// 重写父类方法 renderData
Minute.prototype.renderData = function(){
	var data = {};
	data.zIndex = 8;
	data.duration = 3600;
	var date = new Date();
	data.delay = - (date.getMinutes()*60 + date.getSeconds());
	data.color = "green";
	return data;
}

Minute.prototype.layoutData = function(){
	var data = {};
	data.widthRatio = 0.01;
	data.heightRatio = 0.7;
	data.radiusRatio = 0.8;
	return data;
}

