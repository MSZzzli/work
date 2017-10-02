
window.onload = function(){
	var oBox = document.getElementById('box'),	
		distX,
		degY = 0,
		str = 'null',
		index;
		
	for (var i = 0 ; i < 20; i++) {
		str +=[
		'<div class="floor">',
		'<div class="side side-1" style="background-position: 0 '+-20*i+'px"></div>',
		'<div class="side side-2" style="background-position: 0 '+-20*i+'px"></div>',
		'<div class="side side-3" style="background-position: 0 '+-20*i+'px"></div>',
		'</div>'
		].join('')
	}
	

		
	oBox.innerHTML = str;
		
	var oFloors = oBox.getElementsByClassName('floor');
	
	oBox.onmousedown = function(e){
		//开始的x
		var sX = e.clientX;
		
		//取整
		index = parseInt((e.clientY - oBox.offsetTop)/20);
//		alert(index);
		document.onmousemove = function(e){
			distX = e.clientX - sX;
			console.log(e.clientX)
			sX = e.clientX;
			
			//转换为度数
			degY += distX * 0.2;
			for (var i = 0 ; i <= index ; i ++) {
				oFloors[index-i].style.transition = 'transform '+ 100 * i +'ms';
				oFloors[index-i].style.transform = 'rotateY(' + degY + 'deg) translateZ(50px)';
			}
			for (var i = index +1; i <= oFloors.length ; i ++) {
				oFloors[i].style.transition = 'transform '+ 100 * (i - index +1) +'ms';
				oFloors[i].style.transform = 'rotateY(' + degY + 'deg) translateZ(50px)';
			}
			
			//console.log(oFloor);
			oFloors[index].style.transform = 'rotateY(' + degY + 'deg) translateZ(50px) translateZ(50px)';
		}
		
		document.onmouseup = function(){
			document.onmousemove = null;
		}
		document.onmouseleave = function(){
			document.onmousemove = null;
		}
	}
	
}
