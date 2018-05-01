// 外部函数
function fun2(res) {
    console.log("External JS function: fun2(){...}");
    res.write("This is fun2(){...}<br/>");
}

//module.exports = fun2;  // 只支持一个函数

// 支持多个函数
module.exports = {
    fun2: function(res) {
        console.log("This is fun2 in external JS function...");
        res.write("Hi, I'm fun2 in external JS function.<br/>");
    },
    fun3: function(res) {
        console.log("This is fun3 in external JS function...");
        res.write("Hi, I'm fun3 in external JS function.<br/>");
    },
    fun4: function(res) {
        console.log("This is fun4 in external JS function...");
        res.write("Hi, I'm fun4 in external JS function.<br/>");
    }
}