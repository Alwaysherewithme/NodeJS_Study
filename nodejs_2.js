var http = require("http");
var otherfun = require("./modules/module_1.js");
http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if(request.url!="/favicon.ico"){
        console.log("Visiting……");
        fun1(response);  // 调用本地函数
        //otherfun(response);  // 调用只有一个函数的外部函数，这里使用上文定义的变量otherfun
        // 用字符串调用对应的函数
        funname = "fun4";
        otherfun[funname](response);
        otherfun.fun2(response);
        otherfun['fun3'](response);
        response.end("(^v^)");
    }
    
}).listen(8888);

console.log("*****Server running at http://127.0.0.1:8888/*****");

// 本地函数
function fun1(res) {
    console.log("Local JS function: fun1(){...}");
    res.write("This is fun1(){...}<br/>");
}