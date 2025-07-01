// Tokenizer
function tokenizer(msCode) {
    const lines = msCode.split('\n').filter(line => line.trim() !== '');
    const tokens = lines.map(line => {
        const t = [];
        let currentToken = '';
        let inQuotes = false;
        let escapeNext = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (escapeNext) {
                // Registrar el caracter escapado (incluyendo \ y ")
                currentToken += char;
                escapeNext = false;
            } else if (char === '\\') {
                // Activar escape para el siguiente caracter
                escapeNext = true;
            } else if (char === '"') {
                // Alternar modo comillas
                inQuotes = !inQuotes;
                // No agregar la comilla al token
            } else if (char === ' ' && !inQuotes) {
                // Separador de tokens fuera de comillas
                if (currentToken.length > 0) {
                    t.push(currentToken);
                    currentToken = '';
                }
            } else {
                currentToken += char;
            }
        }
        // Agregar el último token si existe
        if (currentToken.length > 0) {
            t.push(currentToken);
        }
        return t;
    });
    return tokens;
}

// Ejemplos de prueba
console.log(tokenizer('com # p1 p2'));
console.log(tokenizer('com # p1 p2 "p 3"'));
console.log(tokenizer('com # "par\\"ame" ter S'));
console.log(tokenizer('com # "par\\\\ame" ter S'));
console.log(tokenizer(`com # "par\\\\ame" "ter S" S
    com2 output "bad apple.mp4"`));
exports.tokenizer = tokenizer;
