const path = require('path');
const { readdir,  mkdir, rm, copyFile } = require('fs/promises');
const basicFolder = path.join(__dirname, 'files');
const copiedFolder = path.join(__dirname, 'files-copy');

async function copyFolder() {
    await rm(copiedFolder, {recursive: true, force: true});
    await mkdir(copiedFolder, {recursive: true});

    try {
        let files = await readdir(basicFolder, {withFileTypes: true});
        for (let file of files) {
            await copyFile(
            path.join(basicFolder, file.name),
            path.join(copiedFolder, file.name))
        } 
    }
    catch (err) {
        console.error(err);
    }
}
copyFolder();