const ffmpeg = require("fluent-ffmpeg")
ffmpeg().input("D:/mediascript/ffmpeg-nodejs-project/klasky_source.mp4")
    .input("D:/mediascript/ffmpeg-nodejs-project/klasky_source_2.mp4")
    .output("D:/mediascript/ffmpeg-nodejs-project/klasky_source_4.mp4")
    .complexFilter("hstack")
    .on('end', () => {
        console.log("done");
    })
    .on('error', (err) => {
        console.error('Error: ' + err.message);
    })
    .run()
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
