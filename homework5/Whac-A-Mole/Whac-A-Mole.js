window.onload = function () {
	var flag = false;  //用于判断start还是stop
	var i,j;

	//动态添加60个mole；
	for (i = 0; i < 10; ++i) {
		for (j = 0; j < 6; ++j) {
			var buttonMole = document.createElement("button");
			buttonMole.id = i*6+j;
			buttonMole.style.cssText = "width:25px; height:25px; border-radius:50%; border-width: 1px; margin-left:5px; margin-top:5px; background-color:#FFFFFF; box-shadow:intset 0 0 0 0";
			if (i == 0) buttonMole.style.marginTop = "10px";
			document.getElementById("divMoles").appendChild(buttonMole);
		}
	}

	document.getElementById("settingButton").onclick = function() {
		if (!flag || document.getElementById("divTime").innerHTML == "0") {
			flag = true;
			startGame();
		}
		else {
			flag = false;
			stopGame();
		}
	}

	//循环设置60个onclick事件
	for (i=0; i<60; ++i) {
		document.getElementById(i).onclick = function() {
			if (flag) {
				setScore(this.id);
			}
		}
	}
}


function startGame () {
	var s = document.getElementById("divTime").innerHTML;
	if (s == "0") {          //如果时间=0 从新开始，否则继续游戏
		document.getElementById("divTime").innerHTML = "30";
		document.getElementById("divScore").innerHTML = "0";
	}
	document.getElementById("gameProcess").innerHTML = "Playing";
	timeId = setInterval(setMoles, 1000);  //每秒随机产生一位随机mole
}

function stopGame () {
	document.getElementById("gameProcess").innerHTML = "Pausing";
	var s = document.getElementById("indexButton").innerHTML;
	//s=0 即未出现随机mole， 否则出现并恢复其css
	if(s != "") document.getElementById(s).style.boxShadow = "inset 0 0 0 0";
	clearInterval(timeId);   //停止执行setInterval;
}

function setMoles() {
	var time = parseInt(document.getElementById("divTime").innerHTML);
	//如果时间=0，则停止执行setInterval并gameover
	if (time == 0) {
		clearInterval(timeId);
		gameOver();
		alert(document.getElementById("divScore").innerHTML);
	}
	else {
		//恢复上一个随机mole的css 如果是第一个则不必执行
		var s = document.getElementById("indexButton").innerHTML;
		if(s != "") document.getElementById(s).style.boxShadow = "inset 0 0 0 0";
		var index = Math.floor(Math.random()*60);   //产生0-60的随机数
		document.getElementById("indexButton").innerHTML = index;  //indexButton 获取这个随机数，即mole的id
		document.getElementById(index).style.boxShadow = "inset 0 0 0 8px #8600FF";  //设置其css
		--time;
		document.getElementById("divTime").innerHTML = time;
	}
}

function setScore(arg) {
	var buttonIndex = document.getElementById("indexButton").innerHTML; //随机mole的id
	var score = parseInt(document.getElementById("divScore").innerHTML);
	//判断点击的mole的id是否和随机的id一样
	if (arg == buttonIndex) {  
		++score;
	}
	else {
		--score;
	}
	//恢复随机mole的css
	document.getElementById(buttonIndex).style.boxShadow = "inset 0 0 0 0";
	document.getElementById("divScore").innerHTML = score;
}

function gameOver () {
	document.getElementById("gameProcess").innerHTML = "Game Over";
}