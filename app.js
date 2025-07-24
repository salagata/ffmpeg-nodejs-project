const path = require('path');
// File Handler
const { workspace } = require("./file_handler/workspace");
const { tokenizer } = require("./misc/tokenizer");
const { renameHard } = require("./file_handler/renameHard");
// Warnings
// Commands
const { io } = require("./commands/io");
const { volume } = require("./commands/volume");
const { reverse } = require("./commands/reverse");
const { snip } = require("./commands/snip");
const { concat, concatmultiple } = require("./commands/concat");
const { join } = require("./commands/join");
const { repeat, repeatDuration } = require("./commands/repeat");
// Code Generators (if there are)
// MediaScript Code
const mediascriptCode = `load D:/mediascript/ffmpeg-nodejs-project/klasky_csupo.mp4 #
volume # 1
render # test.mp4`


// Main Code
async function runCode(tokens,srcCode) {
    const timeoutWarning = setTimeout(() => {
        console.warn(`MediaScript is taking longer than 30 seconds
    This won't work in NotSoBot`)
    },30000)
    try {
        const media = {};
        const workspaceFiles = {};
        const mediaIndex = [];
        const variables = {};
        await workspace.initWorkspace();
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            const command = token[0];
            switch (command) {
                case "load":
                    media[token[2]] = token[1];
                    if(!mediaIndex.includes(token[2])) {
                        mediaIndex.push(token[2]);
                        workspaceFiles[token[2]] = "./workspace/"+mediaIndex.indexOf(token[2])+path.extname(token[1])
                        await io.load(token[1],mediaIndex.indexOf(token[2]));
                    } else {
                        workspaceFiles[token[2]] = "./workspace/"+mediaIndex.indexOf(token[2])+path.extname(token[1])
                        await io.load(token[1],mediaIndex.indexOf(token[2]));
                    }
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
                case "concatmultiple":
                    await concatmultiple(...token.slice(1).map(t => workspaceFiles[t]))
                    await renameHard(workspaceFiles[token[1]])
                    break
                case "join":
                    await join(workspaceFiles[token[1]],workspaceFiles[token[2]],token[3])
                    await renameHard(workspaceFiles[token[1]])
                    break
                case "render":
                    const oldPath = media[token[1]];
                    await io.render(workspaceFiles[token[1]],token?.[2] ?? path.basename(oldPath))
                    await workspace.clearWorkspace()
                    return {media, variables};
                case "clone":
                    // clone # #2
                    media[token[2]] = workspaceFiles[token[1]];
                    mediaIndex.push(token[2]);
                    workspaceFiles[token[2]] = "./workspace/"+mediaIndex.indexOf(token[2])+path.extname(workspaceFiles[token[1]])
                    await io.load(workspaceFiles[token[1]],mediaIndex.indexOf(token[2]));
                    break
                case "repeat":
                    await repeat(workspaceFiles[token[1]],token[2])
                    await renameHard(workspaceFiles[token[1]])
                    break
                case "repeatduration":
                    await repeatDuration(workspaceFiles[token[1]],token[2])
                    await renameHard(workspaceFiles[token[1]])
                    break
                default:
                    throw new SyntaxError(`${srcCode.split("\n").filter(line => line.trim() !== '')[i]}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unknown command at line ${i}`)
            }
        }
    } catch (error) {
        await workspace.clearWorkspace();
        console.error("Error:" + error)
    } finally {
        clearTimeout(timeoutWarning)
    }
}
runCode(tokenizer(mediascriptCode),mediascriptCode);
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