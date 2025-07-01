const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function join(pathName1,pathName2,vertical) {
    return new Promise((resolve, reject) => {
        ffmpeg().input(pathName1)
            .input(pathName2)
            .complexFilter(vertical == "vertical" ? "vstack" : "hstack")
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .output("./workspace/-1" + path.extname(pathName1))
            .run();
    });
}


module.exports = {
    join
}