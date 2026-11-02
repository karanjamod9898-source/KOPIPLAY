const fs = require('fs');
// In a template literal:
// If we want the output string to literally contain: ${game.slug}
// We write \${game.slug}
// But wait, does Node try to evaluate it if inside backticks?
// In JS: `\${game.slug}` -> the \ escapes the $, so JS treats it as literal '${game.slug}'!
const out = `hello \${game.slug} world`;
console.log('Result:', out);
