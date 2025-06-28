function hhmmss2seconds(format) {
    const items = format.split(":").reverse();
    return items.reduce((acc, x, i) => acc + Number(x) * 60 ** i, 0);
}
exports.hhmmss2seconds = hhmmss2seconds