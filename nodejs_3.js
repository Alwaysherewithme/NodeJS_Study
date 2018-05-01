var http = require("http");
var UserEmployee = require("./modules/module_2_user");
var Teacher = require("./modules/module_2_teacher");

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    if(request.url!="/favicon.ico"){
        console.log("Visiting……");
        
        user = new UserEmployee.user();
        user.id = 1;
        user.name = "Alvis";
        user.age = 16;
        user.enter();
        
        employee = new UserEmployee['employee'](2, "Eric", 22);
        employee.work();

        teacher = new Teacher(3, "Mary", 32);
        teacher.work();  // 继承父类的方法
        teacher.teach(response);  // 子类自身的方法

        response.end("(^v^)");

    }
    
}).listen(8888);

console.log("*****Server running at http://127.0.0.1:8888/*****");
