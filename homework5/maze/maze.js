window.onload = function  () {
	var flag1 = false;  //检测是否碰到墙
	var flag2 = false;  //检测是否从"S"开始
	var flag3 = false;	//检测是否作弊

	document.getElementsByClassName("area")[0].onmouseover = function() {
		flag1 = true;
		flag2 = false;
		flag3 = false;
		for (var j = 0; j < 6; ++j) document.getElementsByClassName("walls")[j].style.backgroundColor = "#E6E6FA";
		setAns("");
	}
	//如果鼠标在是"S"处，重置页面


	//利用flag3判断是否作弊
	document.getElementById("path").onmouseover = function() {
		flag3 = true;
	}

	//判断是否win
	document.getElementsByClassName("area")[1].onmouseover = function() {
		if (flag1 && !flag2) {
			flag2 = true;  //防止再碰墙
			if (flag3) {
				setAns("You Win");
				flag3 = false;
			}
			else {
				setAns("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
			}
		}	
	}

	//循环对每个墙设置事件
	for (var i = 0; i < 6; ++i)  {
		document.getElementsByClassName("walls")[i].onmouseover = function () {
			if (!flag2 && flag1) {
				setAns("You Lose");
				this.style.backgroundColor = "#FF0000";
				flag2 = true;   //只能碰一次墙
			}
		}
	} 

}

function setAns (value) {
	document.getElementById("answer").innerHTML = value;
}
/*function touch (value) {
	document.getElementById("answer").innerHTML = "You Lose";
	document.getElementsByClassName("walls")[value].style.backgroundColor = "#FF0000";
}

function restart () {
	location.reload();
	flag1 = true;
	document.getElementById("answer").innerHTML = "";
}
*/
function overwin (value) {
	if (!value) {
		document.getElementById("answer").innerHTML = "You Win";
	}
}