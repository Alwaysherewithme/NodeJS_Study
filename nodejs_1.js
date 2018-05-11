//The Built-in HTTP Module

var http = require("http");
http.createServer(function (request, response) {
    // 发送HTTP头部，HTTP状态值：200: OK，内容类型：text/plain
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if(request.url!="/favicon.ico"){  // 清除第二次访问
      console.log("访问中……","utf-8");
      // 发送响应数据
      response.write("Hello World!<br/>");
      response.end("I'm NodeJS.(^v^)");  // 不写则没有http协议尾，但写了会产生两次访问，需要清除
    }
    
}).listen(8888);
// 终端打印如下信息
console.log("*****Server running at http://127.0.0.1:8888/*****");



// The Built-in URL Module
var url = require('url');

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); // 'localhost:8080'
console.log(q.pathname); // '/default.htm'
console.log(q.search); // '?year=2017&month=february'

var qdata = q.query; // object: { year: 2017, month: 'february' }
console.log(qdata.month); // 'february'