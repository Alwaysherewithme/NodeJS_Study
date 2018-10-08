'use strict';

// The Built-in File System
var fs = require('fs');


//fs.readFile('tested_file.txt', 'utf-8', function (err, data) {
fs.readFile('../pwclogo.png', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes.');
        console.log('Buffer -> String:' + data.toString('utf-8'));
        console.log('String -> Buffer:' + Buffer.from(data.toString('utf-8')), 'utf-8');
    }
});



// Create a new, empty file
fs.open('empty.txt', 'w', function(err, file) {
    if(err){
        throw err;
    }
    console.log('New file named \'temp.txt\' is created!');
});



// Create a new file with content
//fs.appendFile('newfile_1.txt', 'Hello content by fs.appendFile()!', function(err) {
fs.appendFile('newfile_1.txt', '\n + new content added by fs.appendFile()!', function(err) {
    if(err) throw err;
    //console.log("New file named 'newfile_1.txt' is created!");
    console.log('"newfile_1.txt" is updated!')
});



// Read files
var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);



// Write files
//fs.writeFile('newfile_2.txt', 'Hello content by fs.writeFile()!', function(err) {
fs.writeFile('newfile_2.txt', 'Previous content is replaced by fs.writeFile()!', function(err) {
    if(err) throw err;
    //console.log('New file named \'newfile_2.txt\' is created!');
    console.log('Content in "newfile_2.txt" is replaced!')
});



// Delete files
fs.unlink('temp.txt', function(err) {
    if(err) throw err;
    console.log('File named \'temp.txt\' is deleted!');
});



// Rename files
fs.rename('newfile_1.txt', 'newfile_1_rename.txt', function(err) {
    if(err) throw err;
    console.log('"newfile_1.txt" is renamed!');
})



// File Server
var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
      //return res.end("404 Not Found");
      res.end("404 Not Found...");
    }  
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(data);
    //return res.end();
    res.end();
  });
}).listen(8080);



// 1. Create an upload form
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
}).listen(8080);



//2. Parse the uploaded file
var http = require('http');
var formidable = require('C:/Users/wzhou047/AppData/Roaming/npm/node_modules/formidable');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);



// 3. Save the file
var http = require('http');
var formidable = require('C:/Users/wzhou047/AppData/Roaming/npm/node_modules/formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/wzhou047/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);