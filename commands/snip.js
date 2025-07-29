const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function snip(pathName,start,end) {
    return new Promise((resolve, reject) => {
        if(end == undefined) {
            ffmpeg(pathName).output("./workspace/-1" + path.extname(pathName))
                .setStartTime(start)
                .on('end', () => {
                    resolve();
                })
                .on('error', (err) => {
                    reject('Error: ' + err.message);
                })
                .run();
        } else {
            ffmpeg(pathName).output("./workspace/-1" + path.extname(pathName))
                .setStartTime(start)
                .inputOption("-to","2.17")
                .on('end', () => {
                    resolve();
                })
                .on('error', (err) => {
                    reject('Error: ' + err.message);
                })
                .run();
        }
    });
}
exports.snip = snip;