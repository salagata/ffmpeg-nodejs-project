const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function reverse(pathName) {
    return new Promise((resolve, reject) => {
        ffmpeg(pathName).output("./workspace/-1" + path.extname(pathName))
            .videoFilter("reverse")
            .audioFilter("areverse")
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .run();
    });
}
exports.reverse = reverse;
