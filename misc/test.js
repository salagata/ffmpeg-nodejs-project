const tokens = [["snip","#","0","#fc?\"--"]];
const variables = {
    "#fc":"30"
}
const evalParams = {
    "snip":[2,3]
}
const volume = 2
for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const command = token[0];
    const evalToken = token.map((t,ii) => {
        let r;
        if(ii == 0 || !evalParams[command].includes(ii)) {
            return t
        } else {
            try {
                let tt = t;
                for (const variable in variables) {
                    if (Object.prototype.hasOwnProperty.call(variables, variable)) {
                        tt = tt.replaceAll(variable,variables[variable]);
                    }
                }
                if(/[a-zA-Z_]+/.test(tt)) {
                    throw new ReferenceError(`Tried to reference unset variable ${/[a-zA-Z_]+/.exec(tt)} in expression ${tt}`);
                }
                r = String(eval(tt));
                return r
            } catch(ee) {
                switch (ee.constructor.name) {
                    case "ReferenceError":
                        throw new ReferenceError(ee.message)
                
                    default:
                        throw new Error(`Unable to parse expression: ${t}`)
                }
            }
        }
    });
    console.log(evalToken)
}
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
