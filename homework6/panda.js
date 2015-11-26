window.onload = function () {
	
	var flag = false;
	init();

    document.getElementById("restart_button").onclick = function() {
    	flag = true;
    	disorder();
    }

    for (var i = 0; i < 16; ++i) {
			(function(arg) {
				document.getElementsByClassName("part")[i].onclick = function() {
					if (flag) {
						move(arg);
					}
				}
			})(i);
	}
}
function init() {
	var p = [];
    for (var i = 0; i < 16; ++i) {
    	p[0] = 0-parseInt(i/4)*88;
    	p[1] = 0-(i%4)*88;
    	document.getElementsByClassName("part")[i].style.backgroundPosition = ""+p[1]+"px "+p[0]+"px";
    }
}
function move (arg) {
	var j = arg+1;
	var s;
	if (j%4) {
		if (document.getElementsByClassName("part")[j].style.border == "0px") {
			s = document.getElementsByClassName("part")[j].style.cssText;
			document.getElementsByClassName("part")[j].style.cssText = document.getElementsByClassName("part")[arg].style.cssText;
			document.getElementsByClassName("part")[arg].style.cssText = s;
		}
	}
	j = arg+4;
	if (j < 16) {
		if (document.getElementsByClassName("part")[j].style.border == "0px") {
			s = document.getElementsByClassName("part")[j].style.cssText;
			document.getElementsByClassName("part")[j].style.cssText = document.getElementsByClassName("part")[arg].style.cssText;
			document.getElementsByClassName("part")[arg].style.cssText = s;
		}
	}
	j = arg-4;
	if (j >= 0) {
		if (document.getElementsByClassName("part")[j].style.border == "0px") {
			s = document.getElementsByClassName("part")[j].style.cssText;
			document.getElementsByClassName("part")[j].style.cssText = document.getElementsByClassName("part")[arg].style.cssText;
			document.getElementsByClassName("part")[arg].style.cssText = s;
		}
	}
	j = arg-1;
	if (arg%4) {
		if (document.getElementsByClassName("part")[j].style.border == "0px") {
			s = document.getElementsByClassName("part")[j].style.cssText;
			document.getElementsByClassName("part")[j].style.cssText = document.getElementsByClassName("part")[arg].style.cssText;
			document.getElementsByClassName("part")[arg].style.cssText = s;
		}
	}
	gameover();
}
function disorder () {
	var arr=[];
    for(var i=0;i<16;i++){
            arr[i]=i;
        }
    arr.sort(function(){ return 0.5 - Math.random() })
    var p = [];
    for (var i = 0; i < 16; ++i) {
    	p[0] = 0-parseInt(i/4)*88;
    	p[1] = 0-(i%4)*88;
    	document.getElementsByClassName("part")[arr[i]].style.backgroundPosition = ""+p[1]+"px "+p[0]+"px";    	
    	if (i == 15) {
    		document.getElementsByClassName("part")[arr[i]].style.border = "0";
    		document.getElementsByClassName("part")[arr[i]].style.width = "90px";
    		document.getElementsByClassName("part")[arr[i]].style.height = "90px";
    	}
    	else {
    		document.getElementsByClassName("part")[arr[i]].style.border = "2px solid yellow";
    		document.getElementsByClassName("part")[arr[i]].style.width = "86px";
    		document.getElementsByClassName("part")[arr[i]].style.height = "86px";
    	}
    }
}
function gameover() {
	var p = [];    	
	for (var i = 0; i < 15; ++i) {
		p[0] = 0-parseInt(i/4)*88;
    	p[1] = 0-(i%4)*88;
		if (document.getElementsByClassName("part")[i].style.backgroundPosition != ""+p[1]+"px "+p[0]+"px") {
			break;
		}
	}
	if (i == 15) {
		alert("You Win");
		var imageWin = document.createElement("img");
		imageWin.src="image/win.jpg";
		document.getElementById("win").appendChild(imageWin);
	}
}