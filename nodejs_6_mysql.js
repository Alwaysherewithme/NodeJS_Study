// Node.js MySQL

var mysql = require('mysql');  // 调用MySQL模块
//var mysql = require('C:/Users/wzhou047/AppData/Roaming/npm/node_modules/mysql');

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

    // Select With a Filter
    //connection.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {

    // Wildcard("%") Characters
    //connection.query("SELECT * FROM customers WHERE address LIKE 'S%'", function (err, result) {


	// Sort the Result
	//connection.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {    // alphabetically descend/ascend
        if (err) throw err;

        // The Result Object
        console.log(result);    // [{ id: 11, name: 'Ben', address: 'Park Lane 38'}]
        console.log(result[2].address);

        // The Fields Object
        console.log(fields);
        console.log(fields[1].name);
    });

    // Escaping Query Values
    var adr = 'Mountain 21';
    var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
	});

	var adr = 'Mountain 21';
	var sql = 'SELECT * FROM customers WHERE address = ?';
	connection.query(sql, [adr], function (err, result) {
		if (err) throw err;
		console.log(result);
	});

	var name = 'Amy';
	var adr = 'Mountain 21';
	var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
	connection.query(sql, [name, adr], function (err, result) {
		if (err) throw err;
		console.log(result);
	});


	// Join Two or More Tables(INNER JOIN/LEFT JOIN/RIGHT JOIN)
	var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log(result);
  	});

	// Limit the Result
	//var sql = "SELECT * FROM customers LIMIT 5";
	var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";    // "OFFSET 2", means starting from the 3rd position!
	//var sql = "SELECT * FROM customers LIMIT 2, 5";    // The numbers are reversed: "LIMIT 2, 5" is the same as "LIMIT 5 OFFSET 2"
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log(result);
  	});
	

	// Update Table
	var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  	connection.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log(result.affectedRows + " record(s) updated");
  	});


	// Delete Records
	var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";    // Don't omit the WHERE clause!
	connection.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("Number of records deleted: " + result.affectedRows);
	});

	// Delete a Table
	//var sql = "DROP TABLE customers";
	var sql2 = "DROP TABLE IF EXISTS customers";
    connection.query(sql2, function (err, result) {
    	if (err) throw err;
    	console.log(result);    // the warningCount property is set to 1 if the table does not exist when using "sql2"
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
