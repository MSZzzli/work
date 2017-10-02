var audio = document.querySelector('audio')
var span = document.querySelector('span')
var p = document.querySelector('p')
var h1 = document.querySelector('h1')
var img = document.querySelector('img')
var div = document.querySelector('div')
var current = 0

function start() {
    var s = list[current]
    h1.innerHTML = s.name + ' - ' + s.singer
    img.src = s.cover
    audio.src = s.src
    play()
}

function play() {
    audio.play()
}

function pause() {
    audio.pause()
}

function prev() {
    if (current > 0) {
        current--
    }
    else {
        current = list.length - 1
    }
    start()
}

function next() {
    if (current < list.length - 1) {
        current++
    }
    else {
        current = 0
    }
    start()
}

function volumeUp() {
    if (audio.volume < 1) {
        audio.volume += 0.1
    }
}

function volumeDown() {
    if (audio.volume > 0.1) {
        audio.volume -= 0.1
    }
}

audio.onvolumechange = function () {
    span.innerHTML = audio.volume.toFixed(1)
}

audio.onplaying = function () {
    p.innerHTML = '正在播放'
}

audio.onpause = function () {
    p.innerHTML = '已暂停'
}

audio.ontimeupdate = function () {
    div.innerHTML = format(audio.currentTime) + '/'
        + format(audio.duration)
}

function format(second) {
    var t = parseInt(second || 0)
    var t1 = parseInt(t / 60)
    var t2 = t % 60

    if (t1 < 10) t1 = '0' + t1
    if (t2 < 10) t2 = '0' + t2

    return t1 + ':' + t2
}
