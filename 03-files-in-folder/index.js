const { readdir } = require('fs/promises');
const { stat } = require('fs');
const path = require('path');

async function showFiles() {
  try {
    const files = await readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
    // или
    //  const files = await readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        let name = file.name.split('.')
        await stat(path.resolve(__dirname, 'secret-folder', file.name), async (e, stats) => {
           process.stdout.write(`${name[0]} - ${name[1]} - ${(stats.size/1024)}kb\n`)
           //или

           // console.log(`${name[0]} - ${name[1]} - ${(stats.size/1024)}kb`);
           //    console.log(`${name[0]} - ${path.extname(path.resolve(__dirname, 'secret-folder', file.name)).slice(1)} - ${(stats.size/1024)}kb`);

           // можно также path.parse
        });
      } 
    }    
  } catch (e) {
    console.error(e);
  }
};
showFiles();

