var data = []
$('span').click(function () {
    var text = $(this).html()
    console.log(text)
    data.push(text)
})

$('button').click(function () {
    if (!data.length == 0) {
        var a = {}
        a.data = data
        $.post('/api/movie', a, function (res) {
            location.reload()
        })
    }
    else {
        alert('您还没有选座位~')
    }
})

$.get('/api/count', function (res) {
    for (var i = 0; i < res.length; i++) {
        if (res[i].length == 9) {
            var attr = 'a' + res[i].substr(1, 1) + res[i].substr(3, 1)
            $('.' + attr).css({
                'backgroundColor': 'gray',
                'color': 'red'
            }).text('已售').click(function () {
                $(this).css('backgroundColor', 'gray')
                alert('座位已售出！')
            })
        }
        else {
            var attr1 = 'a' + res[i].substr(1, 1) + res[i].substr(3, 2)
            $('.' + attr1).css({
                'backgroundColor': 'gray',
                'color': 'red'
            }).text('已售').click(function () {
                $(this).css('backgroundColor', 'gray')
                alert('座位已售出！')
            })
        }
    }
})

