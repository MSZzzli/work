$(function() {
	var arry = ['牛骏峰','范冰冰','王凯','anglebaby','杨洋','李易峰','宋茜','宋钟基','刘亦菲']
	var num = 0
	//执行次数
	var count = 0
	$('input').click(function() {
        if (count >=5) {
            alert('您的资格已用尽，明天再来吧！');
        } else {
            
    		var time = new Date()
    		var y = time.getFullYear()
    		var M = time.getMonth() + 1;
    		var d = time.getDate();
    		var h = time.getHours();
    		var m = time.getMinutes();
    		var s = time.getSeconds()
    	
    		M = M < 10 ? '0' + M : M;
    		d = d < 10 ? '0' + d : d;
    		h = h < 10 ? '0' + h : h;
    		m = m < 10 ? '0' + m : m;
    		s = s < 10 ? '0' + s : s;
    			
    		var step = parseInt(Math.random() * 18 + 9);
            console.log(step);
    		var message   		
    		//旋转过程“点我来约会”按钮无法点击
    		$('input').attr("disabled", true);
    		//  setInterval隔段100时间调用函数
    		var time = setInterval(function() {
    			$('li').eq(num).attr('class', '').siblings().addClass('active');
    			message = arry[num]	
    			num++;
    			step--;
    			if(step == 0) {
    				clearInterval(time);
    				count++;
    				//“点我来约会”按钮无法点击恢复点击
    				$('input').removeAttr("disabled", true);
                	var strHtml = ''
    				strHtml += '<span style="color:red;float:left;margin-left:40px">xxx用户获得与' + message  + '约会' + '</span>'
    				strHtml += '&#x3000;&#x3000;&#x3000;'
    				strHtml += '<span style="color:red;float:right;margin-right:40px">' + y + '-' + M +'-' + d +'    '  
    				strHtml += h +':'+ m+':' + s + '</span>' +'<br />'
    				$('.record').append(strHtml)
    				
                	var message='恭喜你获得与 ' + '  ' + message  + '  ' + ' 约会一天'
    				var custonAlert = new Alert(message)
    				custonAlert.show()   
    			}
    			if(num == $('li').length) {
    				num = 0;
    			}             
    		}, 100);
        }
	});
   
	
	//弹出框
	function Alert(message){
		//展示的提示信息
		this.message = message
	}
	Alert.prototype.showMask = function () {
		document.documentElement.style.overflow = 'hidden'
		var mask = document.createElement('div')
		mask.className = 'mask-div'
		document.body.appendChild(mask)
	}
	Alert.prototype.showBox = function () {
		var box = document.createElement('div')
		box.className = 'box-div'
		document.body.appendChild(box)
		var msg = document.createElement('div')
		msg.className = 'msg-div'
		msg.innerText = this.message
		box.appendChild(msg)
		
		var btnBar = document.createElement('div')
		btnBar.className = 'btnBar-div'
		box.appendChild(btnBar)
		
		var btn = document.createElement('div')
		btn.className = 'btn-div btn1'
		btn.innerText = '确定'
		btnBar.appendChild(btn)
		var _this = this
		btn.onclick = function () {
			//去掉挡板和模态框
			_this.close()
		}
	}
	Alert.prototype.close = function () {
		//去掉挡板和模态框
		var maskDiv = document.getElementsByClassName('mask-div')[0]
		var boxDiv = document.getElementsByClassName('box-div')[0]
		document.body.removeChild(maskDiv)
		document.body.removeChild(boxDiv)
		document.documentElement.style.overflow = 'auto'
	}
	//展示这个自定义警告框
	Alert.prototype.show = function () {
		this.showMask()
		this.showBox()
	}
});