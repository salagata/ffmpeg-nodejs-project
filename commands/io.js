const fs = require("fs");
const path = require("path");
// Primordial Input-Output commands
function load(pathFile, mediaName) {
    return new Promise((resolve, reject) => {
        fs.copyFile(pathFile, path.join("./workspace/",mediaName + path.extname(pathFile)) , (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function render(pathName, fileName) {
    return new Promise((resolve, reject) => {
        fs.copyFile(pathName, path.join("./output/",fileName), (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

exports.io = {load,render};