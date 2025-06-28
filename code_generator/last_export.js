function lastExport(mediaName) {
    return `reverse ${mediaName}
snip ${mediaName} 0 0.44
reverse ${mediaName}`
}

function lastExportCustom(mediaName,snip) {
    return `reverse ${mediaName}
snip ${mediaName} 0 ${snip}
reverse ${mediaName}`
}

module.exports = {lastExport,lastExportCustom}