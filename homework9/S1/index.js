$(function () {
	$("#at-plus-container").mouseover(function() {
      $("#at-plus-container").removeClass("down");
  });
  $("#at-plus-container").mouseleave(function() {
      $(this).initial();
      $("#at-plus-container").addClass("down");
  });

	$("li").each(function(i) {
      $("li:eq("+i+")").click(function() {
        if ($(this).ifButtonClick()) {
          $(this).isButtonClicked("http://127.0.0.1:3000");
        }
      });
	});

  $(".info").click(function() {
    if ($(this).ifInfoClick()) {
      $(this).isInfoClicked();
    }
  });

});

$.fn.initial = function () {
  $("span").attr("class","firstSpanClass");
  $("span").html("");
  $(".info").html("");
  $("li").removeClass("final");
  $("li").removeClass("secondButtonClass");
  $("li").addClass("firstButtonClass");
}

$.fn.ifButtonClick = function() {
  if ($(this).hasClass("secondButtonClass")||$(this).hasClass("final")) return false;
  return true;
}

$.fn.ifInfoClick = function() {
  $("li").each(function(i) {
    if ($("li:eq("+i+")").hasClass("firstButtonClass")) return false;
  });
  return true;
}

$.fn.ifNext = function() {
  if ($("#at-plus-container").hasClass("down")) {
    return false;
  }
  return true;
}

$.fn.isButtonClicked = function(url) {
  $(this).disableButton();
  $(this).wait();
  $(this).sendRequest(url);
}

$.fn.isInfoClicked = function() {
  var sum = 0;
  $("span").each(function(i) {
    sum += parseInt($("span:eq("+i+")").html());
    //console.log($("span:eq("+i+")").html());
  });
  $(this).html(sum);
}

$.fn.wait = function() {
  $(this).find("span").attr("class","secondSpanClass");
  $(this).find("span").html("...");
}

$.fn.ableButton = function() {
  $("li").each(function(i) {
    if (!$("li:eq("+i+")").hasClass("final")) {
       $("li:eq("+i+")").addClass("firstButtonClass");
    }
  });
  $("li").removeClass("secondButtonClass"); 
}

$.fn.disableButton = function() {
  $("li").removeClass("firstButtonClass");
  $("li").addClass("secondButtonClass");
  $(this).removeClass("secondButtonClass");
  $(this).addClass("firstButtonClass");
}

$.fn.disableSelf = function() {
  $(this).removeClass("firstButtonClass");
  $(this).addClass("final");
}

$.fn.getRandom = function(arg) {
  $(this).find("span").html(arg);
  if ($(this).ifNext()) {
    $(this).ableButton(); 
    $(this).disableSelf();
  }
  else {
    return;
  }
}

$.fn.sendRequest = function(url) {
  var that = $(this);
  $.post(url, function(data) {
    that.getRandom(data);
  });
/*var xmlhttp = null;
  xmlhttp = new XMLHttpRequest();
  if (xmlhttp!=null) {
    xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
        if (xmlhttp.status==200) {
          that.getRandom(xmlhttp.responseText);
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
