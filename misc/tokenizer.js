const { indicator } = require("./indicator")
// Tokenizer
function tokenizer(msCode) {
    const lines = msCode.split('\n').filter(line => line.trim() !== '');
    const tokens = lines.map((line,index) => {
        const t = [];
        let currentToken = '';
        let inQuotes = false;
        let escapeNext = false;
        let errorIndex = 0;

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
                // Solo en caso de error
                errorIndex = i
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
        if(inQuotes) { 
            throw new SyntaxError(`
${indicator(errorIndex,"v")}
${line}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Non Closed Quotation mark at line ${index+1}, character ${errorIndex+1}`)
        }
        return t;
    });
    return tokens;
}
function evaluate(token,variables,evalParams) {
    return token.map((t,ii) => {
        let r;
        if(ii == 0 || !evalParams.includes(ii)) {
            return t
        } else {
            try {
                let tt = t;
                function escapeRegExp(string) {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }
                for (const variable of Object.keys(variables).sort((a, b) => b.length - a.length)) {
                    if (Object.prototype.hasOwnProperty.call(variables, variable)) {
                        const escapedVar = escapeRegExp(variable);
                        tt = tt.replaceAll(new RegExp(`\\b${escapedVar}\\b`, "g"), variables[variable]);
                    }
                }
                if(/[a-zA-Z_]+/.test(tt)) {
                    throw new ReferenceError(`Tried to reference unset variable ${/[a-zA-Z_]+/.exec(tt)} in expression ${tt}`);
                }
                r = String(eval(tt));
                return r
            } catch(ee) {
                switch (ee.constructor.name) {
                    case "ReferenceError":
                        throw new ReferenceError(ee.message)
                
                    default:
                        throw new Error(`Unable to parse expression: ${t}`)
                }
            }
        }
    });
}
// // Ejemplos de prueba
// console.log(tokenizer('com # p1 p2'));
// console.log(tokenizer('com # p1 p2 "p 3"'));
// console.log(tokenizer('com # "par\\"ame" ter S'));
// console.log(tokenizer('com # "par\\\\ame" ter S'));
// console.log(tokenizer(`com # "par\\\\ame" "ter S" S
//     com2 output "bad apple" .mp4`));

// // Error a proposito
// try {
//     console.log(tokenizer('slice "bad apple" g major\\'));
// } catch (e) {
//     console.error(e)
// }

exports.tokenizer = tokenizer;
exports.evaluate = evaluate;