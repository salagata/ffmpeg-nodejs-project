// Tokenizer
function tokenizer(msCode) {
    const lines = msCode.split('\n').filter(line => line.trim() !== '');
    const tokens = lines.map(l => l.trim().split(" "));
    return tokens;
}
exports.tokenizer = tokenizer;
