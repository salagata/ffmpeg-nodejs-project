const ffmpeg = require("fluent-ffmpeg")
ffmpeg.ffprobe("../klasky_csupo.mp4", (err,data) => {
    if(err) throw err;
    console.log(data)
});

// const {evaluate} = require("./tokenizer");
// const tokens = [["snip","#","0","a+aw"]];
// const variables = {
//     "a":"30",
//     "aw":"50"
// }
// const evalParams = {
//     "snip":[2,3]
// }
// const volume = 2
// for (let i = 0; i < tokens.length; i++) {
//     const token = tokens[i];
//     const command = token[0];
//     const evalToken = evaluate(token,variables,[2,3])
//     console.log(evalToken)
// }
// const ffmpeg = require("fluent-ffmpeg")
// ffmpeg().input("D:/mediascript/ffmpeg-nodejs-project/klasky_source.mp4")
//     .input("D:/mediascript/ffmpeg-nodejs-project/klasky_source_2.mp4")
//     .output("D:/mediascript/ffmpeg-nodejs-project/klasky_source_4.mp4")
//     .complexFilter("hstack")
//     .on('end', () => {
//         console.log("done");
//     })
//     .on('error', (err) => {
//         console.error('Error: ' + err.message);
//     })
//     .run()
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
