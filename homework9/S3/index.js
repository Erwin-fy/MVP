$(function () {
	$("#at-plus-container").mouseover(function() {
      $("#at-plus-container").removeClass("down");
  });

  $("#at-plus-container").mouseleave(function() {
      $(this).initial();
      $("#at-plus-container").addClass("down");
  });

  $(".icon").click(function() {
    $(this).isIconClicked();
  });

});

$.fn.initial =  function() {
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

$.fn.isIconClicked = function () {
  if ($(this).ifIconClick()) {
    $("li").each(function(i) {
      $("li:eq("+i+")").isButtonClicked("http://127.0.0.1:3000");
    });
    $(this).addClass("down");
  }
}


$.fn.isButtonClicked = function(url) {
   // $(this).disableButton();
    $(this).wait();
    $(this).sendRequest(url);
}

$.fn.isInfoClicked = function() {
  if ($(this).isInfoClicked) {
    var sum = 0;
    $("span").each(function(i) {
      sum += parseInt($("span:eq("+i+")").html());
    });
    $(this).html(sum);
  }
}

$.fn.ifInfoClick = function() {
  $("li").each(function(i) {
    if ($("li:eq("+i+")").hasClass("firstButtonClass")) return false;
  });
  return true;
}

$.fn.wait = function() {
  $(this).find("span").attr("class","secondSpanClass");
  $(this).find("span").html("...");
}

$.fn.disableSelf = function() {
  $(this).removeClass("firstButtonClass");
  $(this).addClass("secondButtonClass");
}

$.fn.ifNext = function() {
  if ($("#at-plus-container").hasClass("down")) {
    return false;
  }
  return true;
}

$.fn.getRandom = function(arg) {
  $(this).find("span").html(arg);
  $(this).disableSelf();
  $(".info").isInfoClicked();

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
      xmlhttp.open("POST",url,true);
      xmlhttp.send(null);
  }*/
}
