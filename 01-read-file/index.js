const fs = require('fs');
const path = require('path');
const myRS = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8');
let data = '';

myRS.on('data', chunk => data += chunk.toString());
myRS.on('end', () => console.log(data));
myRS.on('error', error => console.log('Error', error.message));
