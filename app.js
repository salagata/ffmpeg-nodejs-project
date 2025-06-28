const path = require('path');
// File Handler
const { workspace } = require("./file_handler/workspace");
const { tokenizer } = require("./misc/tokenizer");
const { renameHard } = require("./file_handler/renameHard");
// Commands
const { io } = require("./commands/io");
const { volume } = require("./commands/volume");
const { reverse } = require("./commands/reverse");
const { snip } = require("./commands/snip");
const { concat } = require("./commands/concat");
// Code Generators (if there are)
// MediaScript Code
const mediascriptCode = `load D:/mediascript/ffmpeg-nodejs-project/klasky_source.mp4 #
load D:/mediascript/ffmpeg-nodejs-project/klasky_source.mp4 #2
concat # #2
concat # #2
concat # #2
render # test.mp4`

// Main Code
async function runCode(tokens) {
    const media = {};
    const workspaceFiles = {};
    const mediaIndex = [];
    const variables = {};
    await workspace.initWorkspace()
    for (const token of tokens) {
        const command = token[0];
        switch (command) {
            case "load":
                media[token[2]] = token[1];
                mediaIndex.push(token[2]);
                workspaceFiles[token[2]] = "./workspace/"+mediaIndex.indexOf(token[2])+path.extname(token[1])
                await io.load(token[1],mediaIndex.indexOf(token[2]));
                break
            case "volume":
                await volume(workspaceFiles[token[1]],token[2])
                await renameHard(workspaceFiles[token[1]])
                break
            case "reverse":
                await reverse(workspaceFiles[token[1]])
                await renameHard(workspaceFiles[token[1]])
                break
            case "snip":
                await snip(workspaceFiles[token[1]],token[2],token?.[3])
                await renameHard(workspaceFiles[token[1]])
                break
            case "concat":
                await concat(workspaceFiles[token[1]],workspaceFiles[token[2]])
                await renameHard(workspaceFiles[token[1]])
                break
            case "render":
                const oldPath = media[token[1]];
                await io.render(workspaceFiles[token[1]],token?.[2] ?? path.basename(oldPath))
                await workspace.clearWorkspace()
                return {media, variables};
        }
    }
}
runCode(tokenizer(mediascriptCode));
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