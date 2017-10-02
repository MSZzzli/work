	
//时钟的构造函数（创建点 创建秒针 创建分针 创建时针……）

function Clock(){
	//添加样式表
	var num = 0
	var styleEle = document.createElement('style');
	document.head.appendChild(styleEle);
	styleEle.sheet.insertRule('html{height:100%}',num++);
	styleEle.sheet.insertRule('body{margin:0;height:100%;}',num++);
	styleEle.sheet.insertRule('*{box-sizing:border-box}',num++);
	styleEle.sheet.insertRule('@keyframes rotation{from{transform: rotate(0);}to{transform: rotate(360deg);}}',num++);
	
	
	//创建时钟
	var dot = new Dot();
	var second = new Second();
	var minute = new Minute('blue');
	var hour = new Hour('green');
	
	var diamonds = [];
	for (var i = 0; i < 60; i++) {
		var diamond = null;
		if (i % 5 == 0) {
			diamond = new Diamond(i,0.02);
		} else{
			diamond = new Diamond(i,0.01);
		}
		diamonds.push(diamond);
	}
	
	//处理当窗口大小变化时重新布局
	window.onresize = function(){
		Control.windowResized();
		dot.layout();
		second.layout();
		minute.layout();
		hour.layout();
		for (var index in diamonds) {
			diamonds[index].layout();
		}
	}
	
}
