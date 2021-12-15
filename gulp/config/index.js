let fs = require('fs'),
    path = './gulp/tasks',
    arrayPathFiles = fs.readdirSync(path).map(fileName => `${path}/${fileName}`);
                                              
module.exports = arrayPathFiles