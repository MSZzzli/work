(function() {
    //请求资源
    $.ajax({
        type: "get",
        url: "https://api.cphayim.me/repository/temp/banner.php",
        async: true,
        success: function(data) {
            /* 
             * 请求返回的数据结构
             * type: JSON
             * {
             *		banner:[{
             * 			big: 'url',
             * 			small: 'url',
             * 		}]
             * }
             */
            var arrBanner = JSON.parse(data).banner;
            var htmlStr = '';
            for (var i = 0; i < arrBanner.length; i++) {
                 $('.m-slider-group').append('<li><img src="' + arrBanner[i].big + '" /></li>');
                if (!i) {
                    $('.m-slider-controller .thu-box').append('<li class="thu active"><img src="' + arrBanner[i].small + '" /></li>');
                } else {
                    $('.m-slider-controller .thu-box').append('<li class="thu"><img src="' + arrBanner[i].small + '" /></li>');
                }
            }
            //初始化轮播
            initSlider();
        },
        error: function(err) {
            console.log('错误状态码' + err);
        }
    });

    /**
     * 轮播模块初始化
     */
    function initSlider() {
        //在尾部插入第一张
        $('.m-slider-group').append($('.m-slider-group li').first().clone(true));
        //获取步长
        var step = $('.m-slider-group li').width();
        var index = 0;
        var timer = null;

        //当前总长度(包括插入的)
        var total = $('.m-slider-group li').length;

        autoPlay();

        //事件绑定
        $('.m-slider-controller').on('click', '.thu-box img', function(e) {
            //缩略图
            index = $(e.target.parentNode).index(); //获取缩略图父节点li的索引
            startRoll(index);
        }).on('click', '.prev', function(e) {
            prev();
        }).on('click', '.next', function(e) {
            next();
        }).on('mouseenter', 'li', function(e) {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function(e) {
            autoPlay();
        });

        /**
         * 上一个
         * 根据当前索引做出调整后调用starRoll
         */
        function prev() {
            index--;
            if (index < 0) {
                //左侧超出，重置坐标到末尾插入的那张
                $('.m-slider-group').css('left', -(total - 1) * step);
                index = total - 2; //准备前往最后一张图(非插入的那张)
            }
            startRoll(index);
        }
        /**
         * 下一个
         * 根据当前索引做出调整后调用starRoll
         */
        function next() {
            index++;
            if (index > total - 1) {
                //右侧超出，重置坐标到0
                $('.m-slider-group').css('left', 0);
                index = 1; //准备前往第二张图
            }
            //              console.log(index)
            startRoll(index);
        }

        /**
         * 开始滚动
         * 根据索引值滚动，并设置控制器的active状态
         * @param {Object} i 前往的索引值
         */
        function startRoll(i) {

            $(".m-slider-group").stop().animate({
                left: -i * step
            }, 500);
            //控制器添加active
            if (i == total - 1) {
                //是末尾插入的那张则将active设置到第一张
                $('.m-slider-controller .thu-box .thu').eq(0).addClass('active').siblings().removeClass('active');
            } else {
                $('.m-slider-controller .thu-box .thu').eq(i).addClass('active').siblings().removeClass('active');
            }
        }

        /**
         * 设置定时器自动轮播
         */
        function autoPlay() {
            timer = setInterval(next, 3000);
        }
    }
})();