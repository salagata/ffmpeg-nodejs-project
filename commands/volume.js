const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Real Commands
function volume(pathName, volume) {
    return new Promise((resolve, reject) => {
        ffmpeg(pathName).output("./workspace/-1" + path.extname(pathName))
            .audioFilter(`volume=${volume}`) // Comando Real
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .run();
    });
}
exports.volume = volume;
