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


connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    
    // Insert One Record
    var sql = "INSERT INTO wmz.customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        // Get Inserted ID: for tables with an auto increment id field, only one row can be inserted!
        console.log('1 record inserted, ID: ' + result.insertId);
    });
    
    // Insert Multiple Records
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple ST 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345']
    ];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        /* The Result Object:
        {
          fieldCount: 0,
          affectedRows: 14,
          insertId: 0,
          serverStatus: 2,
          warningCount: 0,
          message: '\'Records:14  Duplicated: 0  Warnings: 0',
          protocol41: true,
          changedRows: 0
        }
        */
    });

    // Selecting From a Table
   //connection.query("SELECT * FROM customers", function (err, result, fields) {
    connection.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;

        // The Result Object
        console.log(result);
        console.log(result[2].address);

        // The Fields Object
        console.log(fields);
        console.log(fields[1].name);
    });

});


// 关闭connection（执行node命令时，去掉此处的end()方法）
connection.end(function(err) {
    if(err) {
        console.log(err.toString());
        return;
    }
    console.log('[connection ends] succeed!');
});
