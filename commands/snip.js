const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const { hhmmss2seconds } = require("../misc/hhmmss2seconds");

function snip(pathName,start,end) {
    const ss = hhmmss2seconds(start)
    return new Promise((resolve, reject) => {
        ffmpeg(pathName).output("./workspace/-1" + path.extname(pathName))
            .setStartTime(ss)
            .setDuration(hhmmss2seconds(end)-ss)
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .run();
    });
}
exports.snip = snip;