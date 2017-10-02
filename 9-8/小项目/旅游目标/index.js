$('.content').hover(function(){
		$(this).find('.txt').stop().animate({
            height:'360px'
        },350)
        $(this).parent('.containerPic').css({
            'background': 'url(images/' + ($(this).attr('data-number')) + '.jpg) no-repeat','transition': 'all 0.8s ease 0.2s'
        })
		$(this).find('.txt h3').stop().animate({
            paddingTop:'130px'
        },500)
		//显示
		$(this).find('.txt p').stop().show()
	},function(){
		$(this).find('.txt').stop().animate({
            height: '100px'
        },300)
		$(this).find('.txt h3').stop().animate({
            paddingTop: '0'
        },500);
        //隐藏
		$(this).find('.txt p').stop().hide()
	})