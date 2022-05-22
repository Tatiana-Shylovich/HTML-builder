const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const createdFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.stdout.write('Enter your text. Enter "exit" to finish.\n');

rl.on('line', (line) => { line.trim() === 'exit' ? finish() : createdFile.write(line.trim() + '\n') });
rl.on('close', finish);

process.on('SIGINT', finish);

//  или
// rl.on('line', (line) => { line.trim() === 'exit' ? finish() : createdFile.write(line.trim() + '\n') });
// process.on('exit', finish);

function finish() {
  process.stdout.write('Have a nice day!\n');
  process.exit();
}