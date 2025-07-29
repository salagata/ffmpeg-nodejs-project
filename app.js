const path = require('path');
// File Handler
const { workspace } = require("./file_handler/workspace");
const { tokenizer, evaluate } = require("./misc/tokenizer");
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
set vidlen 0.44
snip # 1.7 1.7+vidlen
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
            let evalToken = token;
            switch (command) {
                // Input-Output
                case "load":
                    media[evalToken[2]] = evalToken[1];
                    if(!mediaIndex.includes(evalToken[2])) {
                        mediaIndex.push(evalToken[2]);
                    }
                    workspaceFiles[evalToken[2]] = path.join("./workspace/",mediaIndex.indexOf(evalToken[2])+path.extname(evalToken[1]))
                    await io.load(evalToken[1],mediaIndex.indexOf(evalToken[2]));
                    break
                case "render":
                    const oldPath = media[evalToken[1]];
                    await io.render(workspaceFiles[evalToken[1]],evalToken?.[2] ?? path.basename(oldPath));
                    break;
                // Volume
                case "volume":
                    evalToken = evaluate(token,variables,[2])
                    await volume(workspaceFiles[evalToken[1]],evalToken[2])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                // Reverse
                case "reverse":
                    await reverse(workspaceFiles[evalToken[1]])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break;
                // Snip
                case "snip":
                    evalToken = evaluate(token,variables,[2,3])
                    await snip(workspaceFiles[evalToken[1]],evalToken[2],evalToken?.[3])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break;
                // Concat
                case "concat":
                    await concat(workspaceFiles[evalToken[1]],workspaceFiles[evalToken[2]])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                case "concatmultiple":
                    await concatmultiple(...evalToken.slice(1).map(t => workspaceFiles[t]))
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                // Join
                case "join":
                    await join(workspaceFiles[evalToken[1]],workspaceFiles[evalToken[2]],evalToken[3])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                // Clone
                case "clone":
                    // clone # #2
                    media[evalToken[2]] = workspaceFiles[evalToken[1]];
                    mediaIndex.push(evalToken[2]);
                    workspaceFiles[evalToken[2]] = "./workspace/"+mediaIndex.indexOf(evalToken[2])+path.extname(workspaceFiles[evalToken[1]])
                    await io.load(workspaceFiles[evalToken[1]],mediaIndex.indexOf(evalToken[2]));
                    break
                // Repeats
                case "repeat":
                    evalToken = evaluate(token,variables,[2])
                    await repeat(workspaceFiles[evalToken[1]],evalToken[2])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                case "repeatduration":
                    evalToken = evaluate(token,variables,[2])
                    await repeatDuration(workspaceFiles[evalToken[1]],evalToken[2])
                    await renameHard(workspaceFiles[evalToken[1]])
                    break
                case "set":
                    evalToken = evaluate(token,variables,[2])
                    variables[evalToken[1]] = evalToken[2]
                    break
                // SyntaxError
                default:
                    throw new SyntaxError(`${srcCode.split("\n").filter(line => line.trim() !== '')[i]}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unknown command at line ${i}`)
            }
        }
        await workspace.clearWorkspace()
        return {media,workspaceFiles,mediaIndex,variables}
    } catch (error) {
        await workspace.clearWorkspace();
        console.error("Error:" + error)
    } finally {
        clearTimeout(timeoutWarning)
    }
}
runCode(tokenizer(mediascriptCode),mediascriptCode).then(x => {
    console.log(x)
});
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