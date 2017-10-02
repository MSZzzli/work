var main = document.querySelector('main');
var objArr = new Array();
var p = document.createElement('p');
main.appendChild(p);
p.innerHTML = '电影选座';
var mm;
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 16; j++) {
        var span = document.createElement('span');
        main.appendChild(span);
        span.innerHTML = '第' + (i + 1) + '排' + (j + 1) + '号';
        span.className = 'a' + (i + 1) + (j + 1);
        mm = j + i * 16 + 1;
        span.setAttribute('name', mm);
        var obj = { selected: 'no', num: mm, locked: 'unlocked' };
        objArr.push(obj);

        span.onclick = function (e) {
            var name = e.target.getAttribute('name');
            for (var k = 0; k < objArr.length; k++) {
                if (name == objArr[k].num) {
                    if (objArr[k].locked == 'unlocked') {
                        if (objArr[k].selected == 'no') {
                            objArr[k].selected = 'yes';
                            e.target.style.backgroundColor = 'green';
                            e.target.style.color = 'white'
                        }
                        else {
                            objArr[k].selected = 'no';
                            e.target.style.backgroundColor = 'red';
                            e.target.style.background = '';
                        }
                    }
                    else {
                        alert('有人！');
                    }
                }
            }
        }


    }
}

var button = document.createElement('button');
var spans = document.querySelectorAll('span');
main.appendChild(button);
button.innerHTML = '确定';
var arr = [];
button.onclick = function () {
    var num = -1, sure = '';
    for (var i = 0; i < objArr.length; i++) {
        if (objArr[i].selected == 'yes' && objArr[i].locked == 'unlocked') {
            num = objArr[i].num;
            sure += ' ' + num;
        }
    }
    arr = sure.split(' ');
    if (num == -1) {
        // alert('你还没有选座！');
    }
    else if (window.confirm('确定预定所选的座位？')) {
        alert('你选的座位号是; ' + sure + '号座');
        for (var i = 0; i < objArr.length; i++) {
            if (objArr[i].selected == 'yes') {
                objArr[i].locked = 'locked';
            }
        }
    }
}
