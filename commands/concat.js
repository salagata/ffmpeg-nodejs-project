const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

function concat(pathName1,pathName2) {
    return new Promise((resolve, reject) => {
        ffmpeg().input(pathName1)
            .input(pathName2)
            .complexFilter([{
                filter: 'concat',
                'options': {
                    n: 2,
                    v: 1,
                    a: 1
                }
            }], 'a')
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .mergeToFile("./workspace/-1" + path.extname(pathName1));
    });
}

function concatmultiple(...pathNames) {
    return new Promise((resolve, reject) => {
        let ff = ffmpeg();
        for (const pathName of pathNames) {
            ff = ff.input(pathName)
        }
        ff.complexFilter([{
            filter: 'concat',
            'options': {
                n: pathNames.length,
                v: 1,
                a: 1
            }
        }], 'a')
            .on('end', () => {
                resolve();
            })
            .on('error', (err) => {
                reject('Error: ' + err.message);
            })
            .mergeToFile("./workspace/-1" + path.extname(pathNames[0]));
    });
}

module.exports = {
    concat,
    concatmultiple
}