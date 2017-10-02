window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

// onselectstart几乎可以用于所有对象，其触发时间为目标对象被开始选中时(即选中动作刚开始，尚未实质性被选中)。不被input和textarea标签支持
document.onselectstart = function() {
  return false;
};

var c = document.getElementById('c');
// getContext() 方法返回一个用于在画布上绘图的环境。参数指定了要在画布上绘制的类型。当前唯一的合法值是 "2d"，它指定了二维绘图.
var ctx = c.getContext('2d');
c.width = cw = window.innerWidth;
c.height = ch = window.innerHeight;
// Math.random()返回0~1之间的随机数 而返回指定范围随机数[m,n]的公式  Math.random()*(n-m+1)+m									
var rand = function(rMi, rMa){
	return ((Math.random()*(rMa-rMi+1))+rMi);
}
// lineCap 属性设置或返回线条末端线帽的样式。
// butt	默认 平直的边缘。round 圆形线帽。 square 正方形线帽。
ctx.lineCap = 'round';


var orbs = [];
var orbCount = 30;
var radius;

var trailCB = document.getElementById('trail');
var trail = trailCB.checked;
var clearer = document.getElementById('clear');
// 获取鼠标点击的位置
function orbGo(e){
	// pageX() 属性是鼠标指针的位置
	var mx = e.pageX - c.offsetLeft;
	var my = e.pageY - c.offsetTop;		
	createOrb(mx,my);
}

/* 获取两点间距离
 dx = 跟踪座标x - 原点座标x;
 dy = 跟踪座标y - 原点座标y;
 线距 = Math.sqrt(dx * dx + dy * dy);
 */

function createOrb(mx,my){
    var dx = (cw/2) - mx;
	var dy = (ch/2) - my;
	// Math.sqrt(x) -- 返回数字的平方根
	var dist = Math.sqrt(dx * dx + dy * dy);
	//  Math.atan2()函数返回点(x,y)和原点(0,0)之间直线的倾斜角
	var angle = Math.atan2(dy, dx);
	orbs.push({
		x: mx,
		y: my,
		lastX: mx,
		lastY: my,
		hue: 0,
		colorAngle: 0,
		// angel=Math.atan(slope) 
        // angel为一个角度的弧度值,slope为直线的斜率,是一个数字,这个数字可以是负的无穷大到正无穷大之间的任何一个值.
		// PI圆周率π属性语法
		angle: angle + Math.PI/2,
		
		size: rand(1,3)/2,
		centerX: cw/2,
		centerY: ch/2,		
		radius: dist,
		speed: (rand(5,10)/1000)*(dist/750)+.015,
		alpha: 1 - Math.abs(dist)/cw,
		draw: function() {	
			// 在大多数操作中细分为填充和描边两个操作  fillstyle 和 strokeStyle  这两个的属性值可以是字符串 渐边对象
			// 和模式对象   如果字符串制定表示颜色 可以使用css中颜色值的任何格式(颜色名 十六进制码 rab、rgba、hsl、hsla)
			ctx.strokeStyle = 'hsla('+this.colorAngle+',100%,50%,1)';	
			ctx.lineWidth = this.size;
			// 要绘制路径必须调用    beginPath() 开始绘制新的路径
			ctx.beginPath(); 
			//moveTo(x,y):  将绘图游标移动到(x,y),不画线
			ctx.moveTo(this.lastX, this.lastY);
			// lineTo(x,y): 从上一点开始绘制一条直线 到(x,y)为止
			ctx.lineTo(this.x, this.y);
			// stroke() 方法绘制当前路径的边框。
			ctx.stroke();
		},	
		update: function(){
			var mx = this.x;
			var my = this.y;	
			this.lastX = this.x;
			this.lastY = this.y;
			var x1 = cw/2;
			var y1 = ch/2;
			var x2 = mx;
			var y2 = my;		
			var rise = y1-y2;
			var run = x1-x2;
			var slope = (rise/run);
			// angel=Math.atan(slope) 
			// angel为一个角度的弧度值,slope为直线的斜率,是一个数字,这个数字可以是负的无穷大到正无穷大之间的任何一个值.
			var radian = Math.atan(slope);
			// math.floor()  返回小于或等于x 与之最接近的数  如果是正数就舎掉小数  如果是负数就入进小数
			// 角度 = 弧度 * 180 / Math.PI
            // 弧度 = 角度 * Math.PI / 180
			var angleH = Math.floor(radian*(180/Math.PI));		
			// 逻辑与 &&   两个值为真才为真
			if(x2 < x1 && y2 < y1){angleH += 180;}		
			if(x2 < x1 && y2 > y1){angleH += 180;}		
			if(x2 > x1 && y2 > y1){angleH += 360;}		
			if(y2 < y1 && slope =='-Infinity'){angleH = 90;}		
			if(y2 > y1 && slope =='Infinity'){angleH = 270;}		
			if(x2 < x1 && slope =='0'){angleH = 180;}
			if(isNaN(angleH)){angleH = 0;}
			/*
			创建圆
		onEnterFrame = function(){
		
		对象.x座标 = 中心原点 + Math.cos(弧度) * 变化量
		
		对象.y座标 = 中心原点 + Math.sin(弧度) * 变化量
		
		弧度 += 递增量;
	         } */
			
			this.colorAngle = angleH;
			this.x = this.centerX + Math.sin(this.angle*-1) * this.radius;
			this.y = this.centerY + Math.cos(this.angle*-1) * this.radius;
			this.angle += this.speed;
		
		}
	});
}


function turnOnMove(){
	c.addEventListener('mousemove', orbGo, false);	
}

function turnOffMove(){
	c.removeEventListener('mousemove', orbGo, false);	
}

function toggleTrails(){
	trail = trailCB.checked;
}

function clear(){
 orbs = []; 
}

c.addEventListener('mousedown', orbGo, false);
c.addEventListener('mousedown', turnOnMove, false);
c.addEventListener('mouseup', turnOffMove, false);
trailCB.addEventListener('change', toggleTrails, false);
clearer.addEventListener('click', clear, false);

// 初始的长度
var count = 80;
while(count--){
		createOrb(cw/2, ch/2+(count*2));
}

var loop = function(){
  window.requestAnimFrame(loop);
//  http://blog.csdn.net/pearyangyang/article/details/45561115  
// 这个博客讲的有setTimeout,setInterval,requestAnimFrame三者的区别
	if(trail){
		ctx.fillStyle = 'rgba(0,0,0,.1)';
		// fillRect()方法在画布上绘制图形填充指定颜色   填充的颜色由fillstyle属性指定
		ctx.fillRect(0,0,cw,ch);
	} else {
		// clearRect() 清除画布上的矩形区域
		ctx.clearRect(0,0,cw,ch);
	}
	var i = orbs.length;
	while(i--){	
		var orb = orbs[i];	
		var updateCount = 3;
		while(updateCount--){
		orb.update();		
		orb.draw(ctx);
		}
		
	}
}
            
loop();
