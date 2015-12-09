var dataBase=[];
var http = require("http"); 
var fs = require('fs'); 
var url = require('url'); 
var querystring = require('querystring');
exports.start = function() { 
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var obj = querystring.parse(url.parse(request.url).query);
    var flag = searchObj(obj, request, response);
    if (!flag) MyRegister(pathname,request, response);
  }).listen(8000); 
  console.log("server start..."); 
} 

function searchObj(obj, request, response) {
  var flag = false;
  if(url.parse(request.url).query!=null&&dataBase.length) {
      for (var i = 0; i != dataBase.length; ++i) {
        if (obj.username==dataBase[i].username) {
          flag = true;
          break;
        }
      }
      if(flag) {
            response.writeHead(200, { "Content-Type": "text/html" }); 
            response.write("<!DOCTYPE 'html'>");
            response.write("<html>");
            response.write("<head>");
            response.write("<meta charset='UTF-8'>");
            response.write("<title>用户详情</title>");
            response.write("</head>");
            response.write("<body>");
            response.write("<h1>用户详情</h1>");
            response.write("<h2>用户名: ");
            response.write(dataBase[i].username);
            response.write("</h2>");
            response.write("<h2>学号: ");
            response.write(dataBase[i].userid);
            response.write("</h2>");
            response.write("<h2>电话: ");
            response.write(dataBase[i].userphone);
            response.write("</h2>");
            response.write("<h2>邮箱: ");
            response.write(dataBase[i].usermail);
            response.write("</body>");
            response.write("</html>");
            response.end();
        }
        else {
          fs.readFile('./register.html', 'utf-8',function (err, data) {//读取内容 
              if (err) throw err; 
              response.writeHead(200, { "Content-Type": "text/html" }); 
              response.write(data);
              response.write("<script type='text/javascript'> alert('用户名不存在')</script>"); 
              response.end(); 
            });
        }
    }
    return flag;
}

function MyRegister(pathname, request, response) {
  if (url.parse(request.url).query==null) {
      if(pathname != "/detail") {
       var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名 
      switch(ext){ 
        case ".css": 
        case ".js": 
          fs.readFile("."+request.url, 'utf-8',function (err, data) {//读取内容 
            if (err) throw err; 
            response.writeHead(200, { "Content-Type": { ".css":"text/css", ".js":"application/javascript", }[ext]}); 
            response.write(data); 
            response.end(); 
          }); 
        break; 
        case ".jpg": 
         fs.readFile("."+request.url,function (err, data) {//读取内容 
          if (err) throw err; 
          response.writeHead(200, { "Content-Type":  "image/jpeg" }); 
          response.write(data); 
          response.end(); 
          }); 
        break;
        default: 
          fs.readFile('./register.html', 'utf-8',function (err, data) {//读取内容 
            if (err) throw err; 
            response.writeHead(200, { "Content-Type": "text/html" }); 
            response.write(data); 
            response.end(); 
          }); 
        }
    }
      if (pathname == "/detail") {
        request.setEncoding('utf-8');
        var info = ""; 
        request.on("data", function(data) {
          info += data;
        });
        request.on("end", function() {
          info = querystring.parse(info);
          var flag=true;
          for (var i = 0; i < dataBase.length; ++i) {
            if (info.username == dataBase[i].username) {
              flag = false;
              break;
            }
          }
          if (flag) {
              dataBase.push(info);
              response.writeHead(200, { "Content-Type": "text/html" }); 
              response.write("<!DOCTYPE 'html'>");
              response.write("<html>");
              response.write("<head>");
              response.write("<meta charset='UTF-8'>");
              response.write("<title>用户详情</title>");
              response.write("</head>");
              response.write("<body>");
              response.write("<h1>用户详情</h1>");
              response.write("<h2>用户名: ");
              response.write(info.username);
              response.write("</h2>");
              response.write("<h2>学号: ");
              response.write(info.userid);
              response.write("</h2>");
              response.write("<h2>电话: ");
              response.write(info.userphone);
              response.write("</h2>");
              response.write("<h2>邮箱: ");
              response.write(info.usermail);
              response.write("</body>");
              response.write("</html>");
              response.end();
            }
          else {
            fs.readFile('./register.html', 'utf-8',function (err, data) {//读取内容 
              if (err) throw err; 
              response.writeHead(200, { "Content-Type": "text/html" }); 
              response.write(data);
              response.write("<script type='text/javascript'> alert('用户名已注册')</script>"); 
              response.end(); 
            }); 
          }
      });
    }
  }
}
console.log("Server is listening");