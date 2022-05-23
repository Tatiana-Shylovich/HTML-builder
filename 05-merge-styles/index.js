const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const stylesFolder = path.resolve(__dirname, 'styles');
const projectFolder = path.resolve(__dirname, 'project-dist', 'bundle.css');

async function createBundle() {   
    try {
        const bundle = fs.createWriteStream(projectFolder);
        let files = await readdir(stylesFolder, { withFileTypes: true });

        for (let file of files) {
            const filePath = path.resolve(stylesFolder, file.name);
            const rs = fs.createReadStream(filePath, 'utf-8');
            if (file.isFile() && path.extname(filePath) === '.css') rs.on('data', chunk => bundle.write(chunk + '\n'));    
        } 
    } 
    catch (err) {
        console.log(err);
    }
}
createBundle()

