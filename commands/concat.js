const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function concat(pathName1,pathName2) {
    return new Promise((resolve, reject) => {
        ffmpeg(pathName1).input(pathName2)
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .mergeToFile("./workspace/-1" + path.extname(pathName1));
    });
}
exports.concat = concat;
