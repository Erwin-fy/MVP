$(function() {
	var flag = false;
    $("#restart_button").click(function() {
    	flag = true;
    	$(this).disorder();
    });
	$("#div0 div").each(function(i) {
		$("#div0 div:eq("+i+")").click(function() {
			if (flag) $(this).ifMove(i);
		});
	});
});

$.fn.ifMove = function (arg) {
	var X=[1, 4, -4, -1], i, j;
	for (i = 0; i < 4; ++i) {
		j = arg+X[i];
		if (j%4 || j>=0 || j < 16) $(this).moveTo(j);
	}
}
$.fn.moveTo = function(arg) {
	if ($("#div0 div:eq("+arg+")").hasClass("div16")) {
		var s = $(this).attr("class");
		$("#div0 div:eq("+arg+")").attr("class", s);
		$(this).attr("class", "div16");
	}
	$(this).gameover();
}

$.fn.disorder = function () {
	var arr=[], s;
    for(var i=0;i<16;i++) arr[i]=i;
    arr.sort(function(){ return 0.5 - Math.random() });
	$("#div0 div").removeClass();
	$("#div0 div").addClass("part");
	for (i = 0; i < 15; ++i) {
		$("#div0 div:eq("+arr[i]+")").addClass("div"+(i+1)+"");
	}
	$("#div0 div:eq("+arr[15]+")").attr("class", "div16");
}

$.fn.gameover = function () {
	for (var i = 0; i < 15; ++i) {
		if ($("#div0 div:eq("+i+")").attr("class") != "div"+(i+1)+" part")
			break;
	}
	if(i == 15) {
		$("#win").addClass("youWin");
		alert("You Win!!!!");
	}
}
