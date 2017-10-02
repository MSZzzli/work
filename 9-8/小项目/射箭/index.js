//总共有5次射箭机会
 var count = 5;
//空数组存每次射中的的环数
var t = [];
var speed = parseInt($("select").val())
var total = 0;
$("select").click(function() {
	speed = parseInt($("select").val())
})
$("button").click(function() {

	count--;

	$("#jian img").css({
		'left': '0'
	})

	$("#ba img").css({
		'top': '0px'
	})
	$(this).text('你还有' + count + '次机会')
	if(count < 0) {
		count = 5
		t = []
		$("span").text('')
		$(this).text('重新再来一局')
	} else {
		start()
	}
})

function start() {

	baMove(speed);
		// 绑定事件为了之后移除事件
	$("main").bind('mousemove', function(e) {

		$("#jian img").css({
				'top': e.pageY - 160 + 'px'
			})
			//*判断箭的位置保证在框内*/
		var top = $("#jian img").offset().top
		if(top < 0) top = 0
		if(top > 535) top = 535

		$("#jian img").css({
			'top': top - 80 + 'px'

		})

	})

	$("main").mousedown(function() {
		//移除箭可以随鼠标的事件
		$("main").unbind()
		jianMove(speed)
	})

}
//靶运动
function baMove(s) {
	var h = $("main").height() - $("#ba img").height()
	$("#ba img").animate({
		'top': h + 'px'
	}, s).animate({
		'top': '0'
	}, s, function() {

		baMove(speed)

	})
}
//箭运动
function jianMove(speed) {
	//当箭射中右边靶时距离左边的距离
	var left = $("main").width() - $("#jian img").width()
	$("#jian img").animate({
		'left': left + 'px'
	}, speed, function() {
		$("#ba img").animate().stop()
		var jTop = Math.floor($("#jian img").offset().top)
		var bTop = Math.floor($("#ba img").offset().top)
			//箭落在靶中相对 靶心的距离
		if((jTop + 10) > bTop) {var score = Math.abs(jTop - bTop - 45)} else {total = 0}

		//   判断得的环数
		if(score <= 4) {total = 10}
		else if(score > 4 && score <= 8) {total = 9}
        if(score > 8 && score <= 12) {total = 8}
        else if(score > 12 && score <= 20) {total = 7}
        if(score > 20 && score <= 25) {total = 6}
        else if(score > 25 && score <= 30) {total = 5}
        if(score > 30 && score <= 32) {total = 4}
        else if(score > 32 && score <= 37) {total = 3}
        if(score > 37 && score <= 45) {total = 2}
        else if(score > 45 && score <= 48) {total = 1}
		if(score > 48) {total = 0}
		alert('您本次的得 ' + (total) + '环')
			//把每次得到的环数放进数组，最后结束时算总的环数
		t.push(total)
			//5次射箭结束，计算数组里面的成绩的和
		var sum = 0;
		if(count == 0) {

			for(var i = 0; i < t.length; i++) {
				sum += t[i]
			}
			$("span").text('您的总成绩是:  ' + sum + ' 环！')
			alert('游戏结束，您的总成绩是:  ' + sum + ' 环！')
		}

	})
}
