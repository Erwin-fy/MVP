$(function () {
  $("#at-plus-container").mouseover(function() {
      $("#at-plus-container").removeClass("down");
  });

  $("#at-plus-container").mouseleave(function() {
      $(this).initial();
      $("#at-plus-container").addClass("down");
  });

  $(".icon").click(function() {
    $(this).isIconClicked($(this).randomOrder(), 0, 0);
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
  $("#message").attr("class", "firstMessage");
}

$.fn.ifIconClick = function() {
  if ($(this).hasClass("down")) return false;
  return true;
}

$.fn.isIconClicked = function (order, arg, curSum) {
  if ($(this).ifIconClick()) {
    $(this).showOrder(order);
    $("#message").attr("class", "secondMessage");
    console.log(order);
    $("li:eq("+order[arg]+")").isButtonClicked(order, arg, "http://127.0.0.1:3000", curSum);
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

$.fn.showOrder = function(order) {
  var s = "";
  $("li").each(function(i) {
    s += $("li:eq("+order[i]+")").html()[0];
  });
  $("#order").html(s);
  $("#order").attr("class", "secondOrder");
}

$.fn.isButtonClicked = function(order, arg, url, curSum) {
  $(this).ableButton();
  $(this).disableButton(order, arg);
  $(this).wait();
  switch(order[arg]) {
    case 0:
        $(this).aHandler(order, arg, url, curSum);
        break;
    case 1:
        $(this).bHandler(order, arg, url, curSum);
        break;
    case 2:
        $(this).cHandler(order, arg, url, curSum);
        break;
    case 3:
        $(this).dHandler(order, arg, url, curSum);
        break;
    case 4:
        $(this).eHandler(order, arg, url, curSum);
        break;
  }
}

$.fn.isInfoClicked = function(curSum) {
    $(this).html(curSum);
    $(this).fHandler(curSum);
}

$.fn.wait = function() {
  $(this).find("span").attr("class","secondSpanClass");
  $(this).find("span").html("...");
}

$.fn.ableButton = function() {
  $(this).addClass("firstButtonClass");
  $(this).removeClass("secondButtonClass");
}

$.fn.disableButton = function(order, arg) {
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

$.fn.nextButton = function(order, arg, curSum) {
  if (arg < 4) {
    arg += 1;
    $("li:eq("+order[arg]+")").isButtonClicked(order, arg, "http://127.0.0.1:3000", curSum);
  }
  else {
    $(".info").isInfoClicked(curSum);
  }
}
$.fn.ifNext = function() {
  if ($("#at-plus-container").hasClass("down")) {
    return false;
  }
  return true;
}
$.fn.getRandom = function(order, arg1, arg2, curSum) {
  $(this).find("span").html(arg2);
  if ($(this).ifNext()) {
    $("li:eq("+order[arg1]+")").disableSelf();
    $(this).nextButton(order, arg1, curSum);
  }
  else {
    return;            
  }
}

$.fn.aHandler = function(order, arg, url, curSum) {
  var ranVar = Math.floor(Math.random()*10);
  console.log(ranVar);
  if (ranVar >= 2) {
    $("#message").html("A：这是个天大的秘密");
    $(this).sendRequest(order, arg, url, curSum);
  }
  else {
    $("#message").html("A：这不是个天大的秘密");
    $("#order").html("有异常");
    $(".info").html(curSum);
  }
}

$.fn.bHandler = function(order, arg, url, curSum) {
  var ranVar = Math.floor(Math.random()*10);
  console.log(ranVar);
  if (ranVar >= 2) {
    $("#message").html("B：我不知道");
    $(this).sendRequest(order, arg, url, curSum);
  }
  else {
    $("#message").html("B：我知道");
    $("#order").html("有异常");
    $(".info").html(curSum);
  }
}

$.fn.cHandler = function(order, arg, url, curSum) {
  var ranVar = Math.floor(Math.random()*10);
  console.log(ranVar);
  if (ranVar >= 2) {
    $("#message").html("C：你不知道");
    $(this).sendRequest(order, arg, url, curSum);
  }
  else {
    $("#message").html("C：你知道");
    $("#order").html("有异常");
    $(".info").html(curSum);
  }
}

$.fn.dHandler = function(order, arg, url, curSum) {
  var ranVar = Math.floor(Math.random()*10);
  console.log(ranVar);
  if (ranVar >= 2) {
    $("#message").html("D：他不知道");
    $(this).sendRequest(order, arg, url, curSum);
  }
  else {
    $("#message").html("D：他知道");
    $("#order").html("有异常");
    $(".info").html(curSum);
  }
}

$.fn.eHandler = function(order, arg, url, curSum) {
  var ranVar = Math.floor(Math.random()*10);
  console.log(ranVar);
  if (ranVar >= 2) {
    $("#message").html("E：才怪");
    $(this).sendRequest(order, arg, url, curSum);
  }
  else {
    $("#message").html("E：不怪");
    $("#order").html("有异常");
    $(".info").html(curSum);
  }
}

$.fn.fHandler = function(curSum) {
  $("#message").html("大气泡：楼主异步调用战斗力感人，目测不超过"+curSum);
}

$.fn.sendRequest = function(order, arg, url, curSum) {
  var that = $(this);
  $.post(url, function(data) {
    curSum += parseInt(data);
    that.getRandom(order, arg, data, curSum);
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