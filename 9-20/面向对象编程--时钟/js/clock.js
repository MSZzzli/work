// Clock：负责创建时钟（Dot，Second，Minute……）
function Clock(){
	// 添加 css 样式
	var style = document.createElement("style");
	document.head.appendChild(style);
	// style.sheet.insertRule("body{background-color:red}",0);
	// style.sheet.insertRule("@keyframes rot{from{transform: rotate(0);}to{transform: rotate(360deg);}}",1);
	style.innerHTML = "html,body{width:100%;height:100%}@keyframes rot{from{transform: rotate(0);}to{transform: rotate(360deg);}}"
	
	// 创建时钟
	var dot = new Dot();
	var second = new Second();
	var minute = new Minute();
	var hour = new Hour();
	var diamonds = [];
	for (var i = 0; i < 60; i++) {
		var diamond = new Diamond(i);
		diamonds.push(diamond);
	}
	// 屏幕大小发生变化
	window.onresize = function(){
		Control.resizeWindow();
		dot.layout();
		second.layout();
		minute.layout();
		hour.layout();
		for (var i = 0; i < diamonds.length; i++) {
			diamonds[i].layout();
		}
	}
}
