window.onload = function () {
	var liNum = document.getElementById('idNum').getElementsByTagName('li');
	var liImg = document.getElementById('idSlider').getElementsByTagName('li');
	var lastindex = 0;
	for (var i = 0; i < liNum.length; i++) {
		liNum[i].index = i;
		liNum[i].onmouseover = function () {
			liImg[lastindex].className = "";
			liImg[lastindex].style.display = 'none';
			liImg[this.index].style.display = 'block';
			lastindex = this.index;
		}
	}
	var body=document.getElementById("idTransformView");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var jiao=document.getElementById("jiao");
	var n = 0;
	var timer = setInterval("aa()",2000);
	body.onmouseover=function(){
		jiao.style.display="block";
		clearInterval(timer);
	};
	body.onmouseout=function(){
		jiao.style.display="none";
		timer = setInterval("aa()",2000);
	};
	left.onclick=function(){
		if(n>0){
			n--;
		}else if(n==0){
			n=liImg.length-1;
		}
		var liNum = document.getElementById('idNum').getElementsByTagName('li');
		liNum[n].onmouseover();
	};
	right.onclick=function(){
		n=n>=(liImg.length-1)?0:++n;
		var liNum = document.getElementById('idNum').getElementsByTagName('li');
		liNum[n].onmouseover();
	}
};	
var n = 0;
function aa(){
	var liNum = document.getElementById('idNum').getElementsByTagName('li');
	var liImg = document.getElementById('idSlider').getElementsByTagName('li');
	n=n>=(liImg.length-1) ? 0 : ++n;
	liNum[n].onmouseover();
};