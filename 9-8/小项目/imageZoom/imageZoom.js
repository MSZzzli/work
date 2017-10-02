


$(document).ready(function () {
//:::::::::::::::::::::::::::::图片缩放代码块::::::::::::::::::::::::::::::::::::::::://  
	var zoomLevel = 0;	
	var currentWidth = 0;
	var currentHeight = 0;	
	var originalWidth = 0;
	var originalHeight = 0;
	//$('').ready => onload 事件会在页面或图像加载完成后立即发生。
	$('body').ready(function(){	
		//document.myImage => name="myImage"  name属性可设置或返回图像的名称
		currentWidth = document.myImage.width;
	    currentHeight = document.myImage.height;
	    originalWidth = currentWidth;
	    originalHeight = currentHeight;
	    update();	
	});	
	$('p input:eq(0)').click(function(){		
		document.myImage.width = currentWidth * 1.2;
	    document.myImage.height = currentHeight * 1.2;
	    zoomLevel = zoomLevel + 1;
	    update();
	});
	$('p input:eq(1)').click(function(){
		document.myImage.width = currentWidth / 1.2;
	    document.myImage.height = currentHeight / 1.2;
	    zoomLevel = zoomLevel - 1;
	    update();
	});
	$('p input:eq(2)').click(function(){
		document.myImage.width = originalWidth;
	    document.myImage.height = originalHeight;
	    zoomLevel = 0;
	    update();
	});
	function update() {		   
		    currentWidth = document.myImage.width;
		    currentHeight = document.myImage.height;
		    zoomsize.innerText = zoomLevel;
		    imgsize.innerText = currentWidth + "X" + currentHeight;
	};		
//::::::::::::::::::::::::::::::::::图片移动代码块::::::::::::::::::::::::::::::::::::::::::://	
	    var $slider = $('.slider ul');
	    var $slider_child_length = $('.slider ul li').length;
	    var $slider_width = $('.slider ul li').width();
	   
	    var slider_count = 0;
	//一开始默认的情况下，如果不够五张图片的话，上一张是点不动的
	    if ($slider_child_length < 5) {
	        $('#btn-right').css({ cursor: 'auto' });
	        $('#btn-right').removeClass("dasabled");
	    };
	//当开始点击下一张的时候，点击的次数记录，不够五张和超过了数量，不再进行累加。
	    $('#btn-right').click(function () {
        //不够五张图的情况或者是点击的次数超过了被隐藏的图片数量了，就不再进行累加了	        
	        if ($slider_child_length < 1 || slider_count >= $slider_child_length - 1) {
	            return false;
	        }	
	        slider_count++;
	        $slider.animate({ left: '-=' + $slider_width + 'px' }, 'fast');	        
	        console.log(slider_count);	        	        
	        $('#thumbnail li a img').eq(slider_count).css("opacity",1);
	     //小图切换大图
	        $("#thumbnail li a img").mouseenter(function () {	        	
		    	$('#thumbnail li a img').css("opacity",0.1);
		    	$(this).css('opacity',1);
		        $(this).mouseleave(function(){
		        	$(this).css('opacity',0.1);		        	
		        });
		        $(".zoompic img").show().attr({"src": $(this).attr("src")});
		        $("#thumbnail li.current").removeClass("current");
		        $(this).parents("li").addClass("current");
		        return false;	        
	        });	 	   
	        $(".zoompic img").show().attr({"src": $('#thumbnail li a img').eq(slider_count).attr("src")});
	    });
	//上一张的情况下，如果当前的点击次数为0，也就是没有点击下一张的初始情况下，点击次数为0，也不进行累减。
	    $('#btn-left').click(function () {	
	        if (slider_count <= 0) {
	            return false;
	        }	
	        slider_count--;
	        $slider.animate({ left: '+=' + $slider_width + 'px' }, 'fast');	        
	        $('#thumbnail li a img').css("opacity",0.1);
	        $('#thumbnail li a img').eq(slider_count).css("opacity",1);
	        console.log(slider_count);
	        $(".zoompic img").show().attr({"src": $('#thumbnail li a img').eq(slider_count).attr("src")});
	    });	 
});