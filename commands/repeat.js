const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function repeat(pathName,times) {
    return new Promise((resolve, reject) => {
        ffmpeg(pathName).inputOptions(["-stream_loop",Number(times)-1])
            .output("./workspace/-1" + path.extname(pathName))
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .run();
    });
}

function repeatDuration(pathName,duration) {
    return new Promise((resolve, reject) => {
        ffmpeg(pathName).inputOptions(["-stream_loop -1"])
            .duration(duration)
            .output("./workspace/-1" + path.extname(pathName))
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .run();
    });
}
module.exports = {
    repeat,
    repeatDuration
}