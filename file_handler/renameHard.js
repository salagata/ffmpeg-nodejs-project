const fs = require("fs");
const path = require("path");

function renameHard(file) {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            }
            fs.rename("./workspace/-1" + path.extname(file), file, (errr) => {
                if (errr) {
                    reject(err);
                }
                resolve();
            });
        });
    });
}
exports.renameHard = renameHard;
