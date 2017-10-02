$("body").click(function action(event) {
    var X =event.pageX
    var Y =event.pageY
    if(X > 145 && X <227 && Y>378 && Y<534){
        playGame('angry',25,5)
    }
    // 饿 肚子
    if(X > 119 && X <245 && Y>468 && Y<554){
        playGame('stomach',33,0)
    }
    // 击倒 鼻子
    if(X > 159 && X <208 && Y>202 && Y<226){
        playGame('knockout',81,20)
    }
    // 吃 嘴 和 喝 嘴角
     if(X > 138 && X <225 && Y>262 && Y<274){
         
        if(X <185){
            playGame('drink',81,35)
        }
        else
            playGame('eat',39,14)
    }
    // 鼻梁 乒乓 
    if(X > 163 && X <196 && Y>156 && Y<198){
        playGame('cymbal',13,0)
    }
    // 尾巴  放
    if(X > 237 && X <271 && Y>471 && Y<575){
        playGame('fart',27,3)
    }
    // 左耳朵 划屏幕
    if(X > 73 && X <103 && Y>110 && Y<188){
         playGame('scratch',56,21)
    }
    // 右耳朵 扔面包
    if(X > 231 && X <274 && Y>120 && Y<184){
        playGame('pie',24,14)
    }
    // 左脚
    if(X > 180 && X <220 && Y>503 && Y<576){
        playGame('foot_left',29,0)
    }
    // 右脚
    if(X > 133 && X <164 && Y>511 && Y<578){
        playGame('foot_right',29,0)
    }
});
    	
var isStarting = false
function playGame(name,totalCount,startAtIndex) {
    if (isStarting == true) return
    isStarting = true
    var num =0
    var img =document.getElementById('img')
    var player  =document.getElementById('playAudio')
    animated()
    
    function animated() {
        if(num < totalCount){     
		    var  imgPath =name +'/' +name +'_'+ (num < 10 ? '0'+num : num )+'.jpg'
		    img.src =imgPath
		   
		    setTimeout(animated,100)
		    
		    if(num == startAtIndex){
		        var soundsPath ='sounds/'+name+'.m4a'   
		        player.src =soundsPath
		        player.play()
		    }
		    if (num == 16 && name =='drink'){
		        player.src = 'sounds/pour.m4a'
		        player.play()
		    }
		    if (num == 1 && name =='knockout'){
		        player.src = 'sounds/p_noo.m4a'
		        player.play()
		    }
            num++
        }
        else{
            isStarting = false
        }
    }
}
	


