
$("button.POST").click(function(){
	$.post("/login",{username:"admin",pwd:"123456"},function(data,status,jqXHR){
		console.log(jqXHR.responseText);
		// JSON.parse() == $.parseJSON()
		console.log(JSON.parse(jqXHR.responseText));
		console.log($.parseJSON(jqXHR.responseText));
		alert(data.msg);
	});
});
