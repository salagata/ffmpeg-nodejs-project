function toCharCode(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);

    return Array.from(bytes).map(byte => {
        const b = byte.toString(16);
        return "0".repeat(4 - b.length) + b;
    });
}
