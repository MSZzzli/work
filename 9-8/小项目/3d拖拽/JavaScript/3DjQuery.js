

var str = [],
	degY = 0,
	sX = 0 ,
	i = 0,
	tid,
	distX=0;

for (; i < 20; i++) {
		str +=[
		'<div class="floor">',
		'<div class="side side-1" style="background-position: 0 '+-20*i+'px"></div>',
		'<div class="side side-2" style="background-position: 0 '+-20*i+'px"></div>',
		'<div class="side side-3" style="background-position: 0 '+-20*i+'px"></div>',
		'</div>'
		].join('')
	}
$('#box').append(str);

//处理div下落（用的是递归）
function divDown(){
  	clearTimeout(tid);
	i--;
   	$("#box .floor").eq(i).animate({
		top:400,
		opacity: 1
	},500);
   	if(i>0){
   		tid = setTimeout(divDown,100);
   	}
}
tid = setTimeout(divDown,100);

//.floor绑定一个鼠标按下事件

$('#box .floor').mousedown(function(e){
	//获取当前点击的index值
	var $index = $(this).index();
	
	sX = e.clientX;
	//。floor绑定一个鼠标在body移动的事件
	$("body").mousemove(function(e){
		//得到是当前鼠标在body移动的距离
		distX = e.clientX - sX
		//把sX设置为初始值
		sX = e.clientX;
		
		//转换为度数
		degY += distX;
		//遍历当前点击的div上面的div改变其旋转值
		$('#box .floor').each(function(i,ele){
			$('#box .floor').eq($index-i).css({
				
				"transition" :'transform '+ 100 * i +'ms',
				"transform" : 'rotateY(' + degY*0.2 + 'deg) translateZ(70px)'
			});
			
		});
		//遍历当前点击的div下面的div改变其旋转值
		$('#box .floor').each(function(i){
			$('#box .floor').eq($index+i).css({
				"transition" :'transform '+ 100 * i +'ms',
				"transform" : 'rotateY(' + degY*0.2 + 'deg) translateZ(70px)'
			});
		});
		
	});
	//当鼠标在body抬起关闭鼠标移动事件
	$('body').mouseup(function(){
		$(this).off("mousemove");
	});
	//当鼠标离开body关闭鼠标移动事件
	$('body').mouseleave(function(){
		$(this).off("mousemove");
	});
});
