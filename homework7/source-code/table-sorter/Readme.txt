ÅÅÐòÍøÕ¾£º
1  http://58921.com/alltime/2012
2  http://download.cyanogenmod.org/
3  http://china.nba.com/standings/
4  http://sports.qq.com/nba/?ptag=baidu.ald.sc.nba


ÅÅÐò´úÂë

$("table th").each(function(i) {
	$("th:eq("+i+")").click(function() {$(this).isclicked(i);});
});

$.fn.isclicked = function (arg) {
	var col = $(this).index();
	if ($("th:eq("+arg+")").hasClass("first")) {
		$("th:eq("+arg+")").attr("class","second");
		$(this).setTr(col,false);
	}
	else {
		$(this).parents("table").find("th").removeClass();
		$("th:eq("+arg+")").addClass("first");
		$(this).setTr(col,true);
	}
}

$.fn.getTr = function (arg) {
	var sortTr = [];
	$(this).parents("table").find("tbody tr").each(function(i) {
		sortTr.push($(this).parents("table").find("tbody tr:eq("+i+")"));
	});
	return sortTr;
}
$.fn.mySort = function (arg1, arg2) {
	var a = $(this).getTr(arg1);
	a.sort(function(x,y) {
		if (arg2) return x.children("td:eq("+arg1+")").html()>y.children("td:eq("+arg1+")").html();
		else return x.children("td:eq("+arg1+")").html()<y.children("td:eq("+arg1+")").html();
	});
	return a;
}
$.fn.getTrData = function (arg1, arg2) {
	var sortTr = $(this).mySort(arg1, arg2), trData = [], i;
	$.each(sortTr,function(i) {
		trData[i]=sortTr[i].html();
	});
	return trData;
}
$.fn.setTr = function (arg1, arg2) {
	var data = $(this).getTrData(arg1,arg2), i;
	$(this).parents("table").find("tbody tr").each(function(i) {
		$(this).parents("table").find("tbody tr:eq("+i+")").html(data[i]);
	});
}
