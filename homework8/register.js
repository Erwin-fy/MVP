$(function () {
	$("form").submit(function() {
		return isTrue();
	});
});
function isTrue() {
	var flag = true;
	if (!usernameIsTrue()) flag = false;
	if (!useridIsTrue()) flag = false;
	if (!userphoneIsTrue()) flag = false;
	if (!usermailIsTrue()) flag = false;
	return flag;
}
function usernameIsTrue() {
	var arg = $("#userName").val();
	if (arg.length < 6) {
		$("#userName").val("长度不小于6");
		return false;
	}
	if (/^\w*$/.test(arg)) {
		if (!/^[a-zA-Z]\w*$/.test(arg)) {
			$("#userName").val("以字母开头");
			return false;
		}
	}
	else if (!/^\w*$/.test(arg)) {
		$("#userName").val("只包含字母数字以及_");
		return false;
	}
	return true;
}
function useridIsTrue() {
	var arg = $("#userId").val();
	if (arg.length < 8) {
		$("#userId").val("长度为8");
		return false;
	}
	if (!/^[0-9]*$/.test(arg)) {
		$("#userId").val("只包含数字");
		return false;
	}
	return true;
}
function userphoneIsTrue() {
	var arg = $("#userPhone").val();
	if (arg.length < 11) {
		$("#userPhone").val("电话长度为11");
		return false;
	}
	if(!/^[0-9]*$/.test(arg)) {
		$("#userPhone").val("只包含数字");
		return false;
	}
	return true;
}
function usermailIsTrue() {
	var arg = $("#userMail").val();
	if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(arg)) {
		$("#userMail").val("邮箱格式不对");
		return false;
	}
	return true;
}