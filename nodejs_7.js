'use strict';

var fs = require('fs');

var rs = fs.createReadStream('output2.txt');
var ws = fs.createWriteStream('output1.txt');

rs.pipe(ws);