var imgs = document.getElementsByTagName('img');
var section = document.querySelector('section');
var divs = document.getElementsByTagName('div');
 pImg = imgs[0];
for (var i = 1; i < imgs.length; i++) {
	imgs[i].onclick = function () {
		pImg.src = this.src;
	}
}
section.onmouseenter = function () {
	section.style.animation = 'rotate 40s linear infinite';
	divs[0].style.transform = 'rotateY(0deg) translateZ(-320px)';
	divs[1].style.transform = 'rotateY(60deg) translateZ(320px)';
	divs[2].style.transform = 'rotateY(60deg) translateZ(-320px)';
	divs[3].style.transform = 'rotateY(120deg) translateZ(320px)';
	divs[4].style.transform = 'rotateY(120deg) translateZ(-320px)';
	divs[5].style.transform = 'rotateY(0deg) translateZ(320px)';
}
section.onmouseleave = function () {
	section.style.animation = '';
	divs[0].style.transform = 'rotateY(0deg) translateZ(-220px)';
	divs[1].style.transform = 'rotateY(60deg) translateZ(220px)';
	divs[2].style.transform = 'rotateY(60deg) translateZ(-220px)';
	divs[3].style.transform = 'rotateY(120deg) translateZ(220px)';
	divs[4].style.transform = 'rotateY(120deg) translateZ(-220px)';
	divs[5].style.transform = 'rotateY(0deg) translateZ(220px)';
}

