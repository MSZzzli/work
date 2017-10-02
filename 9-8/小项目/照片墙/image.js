window.onload = function(){
   mTitle = ["山水美景","海洋蓝色","深秋落叶","冰天雪地","日出","城市夜景","高山流水","午后阳光","翠树蓝天","草木繁盛","灯火辉煌","好山好水",
   "秋意浓厚","碧水青山","青青荷塘","春意盎然","秋风萧瑟","娇艳欲滴","宇宙奥妙","浩瀚星空",
   "点点绿色","涡流","周笔畅","春意正浓","李宇春","周杰伦","范冰冰","金秀贤","安以轩","TFboys"];
   mArray = ["山水美景，秀丽的山川大地，仙境般迷人壮阔，令人神往","海洋蓝色，蓝色的洋河，宽广无垠，给人以豁达明朗",
   "深秋落叶，尽显秋的萧瑟，凄凉","冰天雪地，雪的白色，包裹着山水，透露无尽的寒意，又是人人神往的极地白。",
   "日出，喷薄欲出的一轮红日，朝气盎然","城市夜景，城市的夜，喧闹，繁华，辉煌，耀眼，暗藏一分神秘",
   "高山流水","午后阳光","翠树蓝天","草木繁盛","灯火辉煌","好山好水","秋意浓厚","碧水青山","青青荷塘","春意盎然",
   "秋风萧瑟","娇艳欲滴","宇宙奥妙","浩瀚星空","点点绿色","涡流","周笔畅","春意正浓","李宇春","周杰伦","范冰冰","金秀贤","安以轩","TFboys"];

    //通过随机数对无序列表li的width和距离div的高度进行设置
    	var i = 0;
        $("#box li").each(function(index){
            $(this).width(Math.random() * 120).css("top",Math.random() * 90 + "px");
            var mTop = ($(window).height() + $(this).width())/3;

            console.log(mTop);
           	var myWidth = $(this).width();
            $(this).hover(function(){
                $(this).children("img").width(120).addClass("imgBoxShadow");
            },function(){
                $(this).children("img").width(myWidth).removeClass("imgBoxShadow");
            });
            
            $(this).click(function(){
                $("#yourWorld").css({"display":"block","height":$(document).height()}).prepend($("#spn1"));
            	$(".contentBox").css({"display":"block","top":mTop});
            	$("#image").width("13%").attr("src",$(this).children("img").attr("src"));
            	$(".hp h2").html(mTitle[index]);
            	$(".hp p").html(mArray[index]);
            	
            });
            
            $("#image").click(function(){
                $("#yourWorld").css("opacity","1");
                $("#bigImg").width("60%").css("margin","10%").attr("src",$(this).attr("src"));
				$(".contentBox").css("display","none");	
            });
            
            $("#spn1").click(function(){
                $("#yourWorld").css({"display":"none","opacity":"0.6"});
                $(".contentBox").css("display","none");		
				$("#bigImg").attr("src","").width("");
            });		  			
        });     


    //轮播
   

}