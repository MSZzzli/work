// 滚动效果只适用于火狐浏览器，没有对其他浏览器做兼容处理
var ox = 0;
var left = 0;
var bgleft = 0;
$('#bt').mousedown(function(e) {
	ox = e.pageX - left;
	$('#box').mousemove(function(e) {
			left = e.pageX - ox;
			if(left < 0) {
				left = 0;
			}
			if(left > 400) {
				left = 400;
			}
			$('#bt').css('left', left);
			$('#bgcolor').width(left);
			$('#text').html('当前进度是:' + parseInt(left / 4) + '%');
	});
});
$(document).mouseup(function() {
	$('#box').unbind();
});
$('#bg').click(function(e) {
		bgleft = $('#bg').offset().left;
		left = e.pageX - bgleft;
		if(left < 0) {
			left = 0;
		}
		if(left > 400) {
			left = 400;
		}
		$('#bt').css('left', left);
		$('#bgcolor').stop().animate({
			width: left
		}, 400);
		$('#text').html('当前进度是:' + parseInt(left / 4) + '%');
});
//onmousewheel:ie和谷歌
$(document).on('DOMMouseScroll', function(e) {
	//向上滑动小于零为true，向下滑动大于零false；
	var b = true;
	b = e.detail < 0 ? true : false;
	if (b) {
		left += 5
	} else {
		left -= 5
	}
	if (left < 0) {
		left = 0;
	}
	if (left > 400) {
		left = 400;
	}
	$('#bt').css('left', left);
	$('#bgcolor').width(left);
	$('#text').html('当前进度是:' + parseInt(left / 4) + '%');
    e.preventDefault();//当页面较长出现滚动条时，阻止页面滚动条的默认事件。
});
