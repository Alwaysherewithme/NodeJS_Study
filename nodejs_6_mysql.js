// Node.js MySQL

var mysql = require('C:/Users/wzhou047/AppData/Roaming/npm/node_modules/mysql');  // 调用MySQL模块

// 创建一个connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'wmz'
});


// 创建一个connect
connection.connect(function(err) {
    if(err) {
        console.log('[query] - :'+ err);
        return;
    }
    //if(err) throw err;
    console.log('[connection connects] succeed!');
});



connection.connect(function(err) {
    if(err) throw err;
    console.log('Connected!');
    let createDBSQL = "CREATE DATABASE wmz";
    connection.query(createDBSQL, function(err, res) {
        if(err) throw err;
        console.log("Database created!")
        console.log('Result: ' + res);    // Result: [object Object]
    });
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    //let sql = "DROP TABLE customers;CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";    // Wrong!
    let sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    //let sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
});



// 关闭connection
connection.end(function(err) {
    if(err) {
        console.log(err.toString());
        return;
    }
    console.log('[connection ends] succeed!');
});
