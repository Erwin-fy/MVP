window.onload = function() {
	document.getElementById("zero").onclick = function () {
	myInput(document.getElementById("zero").value);
	}
	document.getElementById("one").onclick = function () {
	myInput(document.getElementById("one").value);
	}
	document.getElementById("two").onclick = function () {
	myInput(document.getElementById("two").value);
	}
	document.getElementById("three").onclick = function () {
	myInput(document.getElementById("three").value);
	}
	document.getElementById("four").onclick = function () {
	myInput(document.getElementById("four").value);
	}
	document.getElementById("five").onclick = function () {
	myInput(document.getElementById("five").value);
	}
	document.getElementById("six").onclick = function () {
	myInput(document.getElementById("six").value);
	}
	document.getElementById("seven").onclick = function () {
	myInput(document.getElementById("seven").value);
	}
	document.getElementById("eight").onclick = function () {
	myInput(document.getElementById("eight").value);
	}
	document.getElementById("nine").onclick = function () {
	myInput(document.getElementById("nine").value);
	}
	document.getElementById("plus").onclick = function () {
	myInput(document.getElementById("plus").value);
	}
	document.getElementById("differ").onclick = function () {
	myInput(document.getElementById("differ").value);
	}
	document.getElementById("scale").onclick = function () {
	myInput(document.getElementById("scale").value);
	}
	document.getElementById("divide").onclick = function () {
	myInput(document.getElementById("divide").value);
	}
	document.getElementById("point").onclick = function () {
	myInput(document.getElementById("point").value);
	}
	document.getElementById("leftbracket").onclick = function () {
	myInput(document.getElementById("leftbracket").value);
	}
	document.getElementById("rightbracket").onclick = function () {
	myInput(document.getElementById("rightbracket").value);
	}
	document.getElementById("back").onclick = function () {
	myBack();
	}
	document.getElementById("clear").onclick = function () {
	myClear();
	}
	document.getElementById("ans").onclick = function () {
	myAns();
	}
}

function myInput(value) {
	document.getElementById("entry").value += value;
}
function myBack() {
	var string1 = document.getElementById("entry").value;
	var string2 = string1.substring(0,string1.length-1);
	document.getElementById("entry").value = string2;
}
function myClear() {
	document.getElementById("entry").value = "";
}
function myAns() {
	var s = document.getElementById("entry").value;
	try {
		document.getElementById("entry").value = eval(s);
		var ss = eval(s);
		if (ss == "Infinity") {
			document.getElementById("entry").value = s;
			alert("分母不能为0");
		}
	}
	catch(exception) {
		alert(exception);
	}
}