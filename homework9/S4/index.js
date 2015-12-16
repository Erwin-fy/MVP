var order = [];
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
  $("#order").attr("class", "firstOrder");
}

$.fn.ifIconClick = function() {
  if ($(this).hasClass("down")) return false;
  return true;
}

$.fn.isIconClicked = function (arg) {
  if ($(this).ifIconClick()) {
    $(this).showOrder();
    $("li:eq("+order[arg]+")").isButtonClicked(arg, "http://127.0.0.1:3000");
    $(this).addClass("down");
  }
}

$.fn.randomOrder = function() {
  var arr = [];
  var i;
  for (var i = 0; i < 5; ++i) arr[i]=i;
  arr.sort(function() { return 0.5-Math.random() });
  return arr;
}

$.fn.showOrder = function() {
  order = $(this).randomOrder();
  var s = "";
  $("li").each(function(i) {
    s += $("li:eq("+order[i]+")").html()[0];
  });
  $("#order").html(s);
  $("#order").attr("class", "secondOrder");
}

$.fn.isButtonClicked = function(arg, url) {
  $(this).ableButton();
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
    if (i != order[arg]) {
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
    $("li:eq("+order[arg]+")").isButtonClicked(arg, "http://127.0.0.1:3000");
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
    $("li:eq("+order[arg1]+")").disableSelf();
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
