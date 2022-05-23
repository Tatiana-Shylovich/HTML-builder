const fs = require('fs');
const { readdir, mkdir, rm, copyFile, readFile } = require('fs/promises');
const path = require('path');

const createdFolder = path.resolve(__dirname, 'project-dist');
const stylesFolder = path.resolve(__dirname, 'styles');
const stylesFile = path.resolve(__dirname, 'project-dist', 'style.css');
const assetsFolder = path.resolve(__dirname, 'assets');
const copiedAssets = path.resolve(__dirname, 'project-dist', 'assets');

async function buildPage() {
    await rm(createdFolder, {recursive: true, force: true});
    await mkdir(createdFolder, {recursive: true});
    await copyAssets(assetsFolder, copiedAssets);
    await createBundle();
    await createHtml();   
}
// скопированы assets
async function copyAssets(a, c) {
    await mkdir(c, {recursive: true});
    try {
        const files = await readdir(a, {withFileTypes: true});
        for (let file of files) {
            if (file.isFile()) {
                await copyFile(path.resolve(a, file.name), path.resolve(c, file.name));
            } else if (!file.isFile()) {
                await mkdir(path.resolve(c, file.name), {recursive: true});
                await copyAssets(path.resolve(a, file.name), path.resolve(c, file.name));
            }
        }
    }
    catch(err) {
        console.log(err);
    }  
}
// скопированы стили 
async function createBundle() {   
    try {
        const bundle = fs.createWriteStream(stylesFile);
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
// создание разметки
async function createHtml() {
    try {
        const createdHtml = path.resolve(createdFolder, 'index.html');
        const componentsFolder = path.resolve(__dirname, 'components');
        const rs = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
        const ws = fs.createWriteStream(createdHtml, 'utf-8');

        rs.on('data', async (chunk) => {
            async function replaceHtml() {
                let files = await readdir(componentsFolder, { withFileTypes: true });
                let data = '';
                data += chunk.toString();

                for (let file of files) {
                    let componentFile = path.resolve(componentsFolder, file.name);
                    let name = file.name.split('.');
                    const component = await readFile(componentFile,'utf-8');
                    data = data.replace(`{{${name[0]}}}`, `${component}`);  
                }   
                return data;
            }
            let newHtmlContent = await replaceHtml();
            ws.write(newHtmlContent);
        });
    }
    catch (err) {
    console.log(err);
    }
}
buildPage()