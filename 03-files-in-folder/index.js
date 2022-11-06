const { readdir } = require('fs/promises');
const { stat } = require('fs');
const path = require('path');
const folder = path.resolve(__dirname, 'secret-folder');

async function showFiles() {
  try {
    let files = await readdir(folder, {withFileTypes: true});
    for (let file of files) {
      if (file.isFile()) {
        let fileInFolder = path.join(folder, file.name);
        stat(path.resolve(folder, file.name), async (e, stats) => {
          console.log(`${path.parse(fileInFolder).name} - ${path.extname(path.resolve(__dirname, 'secret-folder', file.name)).slice(1)} - ${(stats.size/1024)}kb`);
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
};
showFiles();