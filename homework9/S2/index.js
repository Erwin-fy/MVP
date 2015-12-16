$(function () {
  $("#at-plus-container").mouseover(function() {
      $("#at-plus-container").removeClass("down");
  });

	$("#at-plus-container").mouseleave(function() {
			$(this).initial();
      $("#at-plus-container").addClass("down");
	});

  $(".icon").click(function() {
    $(this).isIconClicked(0);
  });

});

$.fn.initial = function () {
  $("span").attr("class","firstSpanClass");
  $("span").html("");
  $(".info").html("");
  $("li").removeClass("secondButtonClass");
  $("li").addClass("firstButtonClass");
  $(".icon").removeClass("down");
}

$.fn.ifIconClick = function() {
  if ($(this).hasClass("down")) return false;
  return true;
}

$.fn.isIconClicked = function (arg) {
  if ($(this).ifIconClick()) {
    $("li:eq("+arg+")").isButtonClicked(arg, "http://127.0.0.1:3000");
    $(this).addClass("down");
  }
}

$.fn.isButtonClicked = function(arg, url) {
  $(this).ableButton(arg);
  $(this).disableButton(arg);
  $(this).wait();
  $(this).sendRequest(arg, url);
}

$.fn.isInfoClicked = function() {
    var sum = 0;
    $("span").each(function(i) {
      sum += parseInt($("span:eq("+i+")").html());
    });
    $(this).html(sum);
}

$.fn.wait = function() {
  $(this).find("span").attr("class","secondSpanClass");
  $(this).find("span").html("...");
}

$.fn.ableButton = function() {
  $(this).addClass("firstButtonClass");
  $(this).removeClass("secondButtonClass");
}

$.fn.disableButton = function(arg) {
   $("li").each(function(i) {
    if (i != arg) {
      $("li:eq("+i+")").removeClass("firstButtonClass");
      $("li:eq("+i+")").addClass("secondButtonClass");
    }
  });
}

$.fn.disableSelf = function() {
  $(this).removeClass("firstButtonClass");
  $(this).addClass("secondButtonClass");
}

$.fn.nextButton = function(arg) {
  if (arg < 4) {
    arg += 1;
    $("li:eq("+arg+")").isButtonClicked(arg, "http://127.0.0.1:3000");
  }
  else {
    $(".info").isInfoClicked();
  }
}
$.fn.ifNext = function() {
  if ($("#at-plus-container").hasClass("down")) {
    return false;
  }
  return true;
}
$.fn.getRandom = function(arg1, arg2) {
  $(this).find("span").html(arg2);
  if ($(this).ifNext()) {
    $("li:eq("+arg1+")").disableSelf();
    $(this).nextButton(arg1);
  }
  else {
    return;            
  }
}

$.fn.sendRequest = function(arg, url) {
  var that = $(this);
  $.post(url, function(data) {
    that.getRandom(arg, data);
  });
  /*var xmlhttp = null;
  xmlhttp = new XMLHttpRequest();
  if (xmlhttp!=null) {
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4) {
        if (xmlhttp.status==200) {
          that.getRandom(arg, xmlhttp.responseText);
        }   
        else {
          alert("Problem retrieving XML data:" + xmlhttp.statusText);
        }
      } 
    }
     // xmlhttp.onreadystatechange = that.state_Change(xmlhttp);
      xmlhttp.open("POST",url,true);
      xmlhttp.send(null);
  }*/
}
