const fs = require("fs");


// Workspaces
function initWorkspace() {
    return new Promise((resolve, reject) => {
        fs.mkdir("./workspace", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });

    });
}
function clearWorkspace() {
    return new Promise((resolve, reject) => {
        fs.rm("./workspace", { recursive: true, force: true }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });

    });

}
exports.workspace = {initWorkspace: initWorkspace,clearWorkspace: clearWorkspace};
