const fs = require("fs")
const ffmpeg = require('fluent-ffmpeg');  
const path = require('path');

function toCharCode(str) {
    const encoder = new TextEncoder(); // Crear un encoder UTF-8
    const bytes = encoder.encode(str); // Codifica la cadena en bytes UTF-8

    return Array.from(bytes).map(byte => {
        const b = byte.toString(16);
        return "0".repeat(4-b.length) + b
    });
    
}
const mediascriptCode = `load D:/mediascript/ffmpeg-nodejs-project/klasky_csupo.mp4 #
volume # 2
volume # 0
render # test.mp4`
function tokenizer(msCode) {
    const lines = msCode.split('\n').filter(line => line.trim() !== '');
    const tokens = lines.map(l => l.trim().split(" "))
    return tokens
}
function load(pathFile,mediaName) {
    return new Promise((resolve, reject) => {
        fs.copyFile(pathFile,"./workspace/"+mediaName+path.extname(pathFile), (err) => {
            if(err) {
                reject(err)
                return
            }
            resolve()
        });
    })
}
function render(pathName,fileName) {
    return new Promise((resolve, reject) => {
        fs.copyFile(pathName,"./output/"+fileName, (err) => {
            if(err) {
                reject(err)
                return
            }
            resolve()
        });
    })
}
function renameHard(file) {
    return new Promise((resolve,reject) => {
        fs.unlink(file,(err) => {
            if (err) {
                reject(err)
            }
            fs.rename("./workspace/-1"+path.extname(file),file,(errr) => {
                if(errr) {
                    reject(err)
                } 
                resolve()
            })
        })
    })
}
function volume(pathName,volume) {
    return new Promise((resolve,reject) => {
        ffmpeg(pathName).output("./workspace/-1"+path.extname(pathName))
            .audioFilter(`volume=${volume}`) // Comando Real
            .on('end', () => {  
                resolve();
            })  
            .on('error', (err) => {  
                reject('Error: ' + err.message);  
            })  
            .run(); 
    })
}
function initworkspace() {
    return new Promise((resolve,reject) => {
        fs.mkdir("./workspace",(err) => {
            if(err) {
                reject(err)
                return
            }
            resolve()
        })

    })
}
function clearworkspace() {
    return new Promise((resolve,reject) => {
        fs.rm("./workspace",{recursive:true,force:true},(err) => {
            if(err) {
                reject(err)
                return
            }
            resolve()
        })

    })

}
async function runCode(tokens) {
    const media = {};
    const workspace = {};
    const mediaIndex = [];
    const variables = {};
    await initworkspace()
    for (const token of tokens) {
        const command = token[0];
        switch (command) {
            case "load":
                media[token[2]] = token[1];
                mediaIndex.push(token[2]);
                workspace[token[2]] = "./workspace/"+mediaIndex.indexOf(token[2])+path.extname(token[1])
                await load(token[1],mediaIndex.indexOf(token[2]));
                break
            case "volume":
                await volume(workspace[token[1]],token[2])
                await renameHard(workspace[token[1]])
                break
            case "render":
                const oldPath = media[token[1]];
                await render(workspace[token[1]],token?.[2] ?? path.basename(oldPath))
                await clearworkspace()
                return {media, variables};
        }
    }
}
console.log(runCode(tokenizer(mediascriptCode)));
/*
// Path to the input file  
const inputFilePath = "D:/mediascript/ffmpeg-nodejs-project/klasky_csupo.mp4";  
// Path to the output file  
const outputFilePath = "D:/mediascript/ffmpeg-nodejs-project/reversed.mp4";  
// Convert the video  
ffmpeg(inputFilePath).output(outputFilePath)
    .videoFilter("reverse")
    .audioFilter("areverse") 
    .on('end', () => {  
        console.log("End")

    })  
    .on('error', (err) => {  
        console.error('Error: ' + err.message);  
    })  
    .run();  
*/