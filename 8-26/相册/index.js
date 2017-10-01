function arrange() {
    var w = $(window).width();
    var h = $(window).height();
    var centerX = w / 2;
    var centerY = h / 2;

    $('#xc div').each(function () {
        var left = Math.random() * centerX + centerX / 2 - 50;
        var top = Math.random() * centerY + centerY / 2 - 60;
        var rotate = Math.random() * 80 - 40;

        $(this).css({
            'top': top,
            'left': left,
            'position': 'absolute',
            'transform': 'rotate(' + rotate + 'deg)'
        });
    });
}

arrange();

$(window).resize(arrange);

$(function () {
    $('#xc div a').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        closeBtn: false,
        autoPlay: true,
        helpers: {
            buttons: {},
            title: { type: 'inside' },
            thumbs: { alwaysCenter: true }
        },
        beforeLoad: function () {
            this.title = $(this.element).text();
        }
    });
})
