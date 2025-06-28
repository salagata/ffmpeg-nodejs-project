const ffmpeg = require("fluent-ffmpeg")
ffmpeg("D:/mediascript/ffmpeg-nodejs-project/klasky_source.mp4")
    .input("D:/mediascript/ffmpeg-nodejs-project/klasky_source_2.mp4")
    .on('end', () => {
        console.log("done")
    })
    .on('error', (err) => {
        console.error('Error: ' + err.message);
    })
    .mergeToFile("D:/mediascript/ffmpeg-nodejs-project/output/test.mp4");

// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error('Error al leer la carpeta:', err);
//     return;
//   }

//   files.forEach((file) => {
//     const filePath = `./deck/${file}`
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error(`Error al eliminar el archivo ${file}:`, err);
//       }
//     });
//   });
// });
