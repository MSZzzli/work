
$.fn.photoShoot = function (options) {
	return this.each(function () {
		//$.extend将一个或多个对象的内容合并到目标对象
		var settings = $.extend({
			//viewFinder:取景器
			viewFinder: { width: 300, height: 200, img: '' },
			image: '',
			//blurLevel:模糊等级
			blurLevel: 4,
			opacity: 0.92,
			onClick: function () { }
		}, options);
		var scriptPath = '';
		$('script').each(function () {
			var src = $(this).attr('src');
			//if(!src) return true;
			if (src.match(/jquery.photoShoot/i)) {
				scriptPath = src.replace(/[^\/]+$/, '');
				return false;
			}
		})

		if (!settings.viewFinder.img) {
			settings.viewFinder.img = scriptPath + 'viewfinder.png';
		}

		var main = $(this);
		main.css('background', 'url(' + settings.image + ') no-repeat').addClass('container');

		settings.stage = { width: main.width(), height: main.height() };

		for (var i = 0; i < 10; i++) {
			$('<div class="blur">').css({
				opacity: 0.15,
				left: Math.round(-settings.blurLevel + (settings.blurLevel * 2) * Math.random()),
				top: Math.round(-settings.blurLevel + (settings.blurLevel * 2) * Math.random()),
				background: 'url(' + settings.image + ') no-repeat',
				width: settings.stage.width + 'px',
				height: settings.stage.height + 'px'
			}).appendTo(main);
		}
		var overlay = $('<div class="overlay">').css({ opacity: 1 - settings.opacity }).appendTo(main);

		//			if(navigator.userAgent.indexOf('Chrome')!=-1)
		//			{
		//				main.addClass('googleChrome');
		//			}
		//			else if(navigator.userAgent.indexOf('MSIE')!=-1)
		//			{
		//				main.css('cursor','url('+scriptPath+'/blank.cur), default');
		//			}

		var vf = $('<div class="viewFinder">').css({
			background: 'url(' + settings.image + ') no-repeat',
			width: settings.viewFinder.width + 'px',
			height: settings.viewFinder.height + 'px'
		}).html('<img src="' + settings.viewFinder.img + '" width="' + settings.viewFinder.width + '" height="' + settings.viewFinder.height + '" />').appendTo(main);

		var offSet = main.offset();

		var n_left, n_top;

		main.mousemove(function (e) {
			n_left = (e.pageX - offSet.left) - settings.viewFinder.width / 2;
			n_top = (e.pageY - offSet.top) - settings.viewFinder.height / 2;
			if (n_left < 0 || n_top < 0) return false;
			if (n_left + settings.viewFinder.width >= settings.stage.width || n_top + settings.viewFinder.height >= settings.stage.height) return false;

			vf.css({
				left: n_left,
				top: n_top,
				backgroundPosition: '-' + n_left + 'px -' + n_top + 'px'
			});
		}).click(function () {
			settings.onClick({
				left: parseInt(vf.css('left')),
				top: parseInt(vf.css('top')),
				width: settings.viewFinder.width,
				height: settings.viewFinder.height
			});
		});
	})
}



$(document).ready(function () {
	var main = $('#main');
	main.width(Math.min(1024, $(document).width()));
	var pics = new Array(
		{ url: 'images/01.jpg', size: { x: 1024, y: 677 } },
		{ url: 'images/02.jpg', size: { x: 1024, y: 768 } },
		{ url: 'images/03.jpg', size: { x: 1024, y: 768 } },
		{ url: 'images/04.jpg', size: { x: 1158, y: 756 } }
	);
	var bg = pics[parseInt(Math.random() * 4)];
	console.log(bg);
	var opts = {
		image: bg.url,
		onClick: shoot,
		opacity: 0.8,
		blurLevel: 4
	}
	main.photoShoot(opts);
	$('<div class="album">').html('<div class="slide" />').appendTo(main);
	function shoot(position) {
		main.find('.overlay').css('background-color', 'white');
		setTimeout(function () { main.find('.overlay').css('background-color', '') }, 100);
		var newShot = $('<div class="shot">').width(150).height(100);
		newShot.append($('<img src="' + bg.url + '" width="' + (bg.size.x / 2) + '" height="' + (bg.size.y / 2) + '" />').css('margin', -position.top * 0.5 + 'px 0 0 -' + position.left * 0.5 + 'px'));
		$('.shot').eq(3).remove();
		newShot.css('margin-right', -160).prependTo('.album .slide').animate({ marginRight: 0 }, 'slow');
	}
});
